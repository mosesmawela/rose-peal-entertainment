import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { ROSE_SYSTEM_PROMPT, VOICE_MODE_INSTRUCTION, ADMIN_MODE_INSTRUCTION } from '@/lib/ai/system-prompt';
import { SITE_PAGES, ARTISTS, FAQS, QuickAction, getPageInfo, getQuickActions, findFAQ, getArtistInfo } from '@/lib/ai/knowledge-base';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            message,
            conversationHistory = [],
            voiceMode = false,
            currentPage = '/',
            userType = 'fan',
            isAdmin = false
        } = body;

        if (!message || typeof message !== 'string') {
            return NextResponse.json(
                { error: 'Message is required' },
                { status: 400 }
            );
        }

        // Check for API key
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: 'AI service is not configured. Please add GEMINI_API_KEY to your environment variables.' },
                { status: 500 }
            );
        }

        // Build context from knowledge base
        const pageInfo = getPageInfo(currentPage);
        const quickActions = getQuickActions(currentPage);

        // Build contextual knowledge
        let contextualKnowledge = `
CURRENT CONTEXT:
- Current Page: ${currentPage}
- Page Title: ${pageInfo?.title || 'Unknown'}
- Page Description: ${pageInfo?.description || 'N/A'}
- User Type: ${userType}
- Voice Mode: ${voiceMode ? 'ON' : 'OFF'}
- Admin Access: ${isAdmin ? 'YES' : 'NO'}

SITE NAVIGATION:
${SITE_PAGES.map(page => `- ${page.title} (${page.path}): ${page.description}`).join('\n')}

ARTISTS:
${ARTISTS.map(artist => `- ${artist.name}: ${artist.bio} | Genres: ${artist.genre.join(', ')} | Latest: ${artist.latestRelease || 'N/A'} | Booking: ${artist.bookingAvailable ? 'Available' : 'Contact for availability'}`).join('\n')}

FAQS:
${FAQS.map(faq => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n\n')}

QUICK ACTIONS AVAILABLE:
${quickActions.map(action => `${action.icon} ${action.label}`).join(', ') || 'None for this page'}
`;

        // Add page summary if on a specific page
        if (pageInfo && currentPage !== '/') {
            contextualKnowledge += `\n\nCURRENT PAGE SUMMARY:\n${pageInfo.summary}`;
        }

        // Build system instruction
        let systemInstruction = ROSE_SYSTEM_PROMPT + '\n\n' + contextualKnowledge;

        if (voiceMode) {
            systemInstruction += '\n\n' + VOICE_MODE_INSTRUCTION;
        }

        if (isAdmin) {
            systemInstruction += '\n\n' + ADMIN_MODE_INSTRUCTION;
        }

        // Initialize the model
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.0-flash-exp',
            systemInstruction: systemInstruction,
        });

        // Build conversation history for context
        const chatHistory = conversationHistory.map((msg: any) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }],
        }));

        // Start chat with history
        const chat = model.startChat({
            history: chatHistory,
        });

        // Send message and get response
        const result = await chat.sendMessage(message);
        const response = result.response;
        const text = response.text();

        // Determine if quick actions should be suggested
        let suggestedActions: QuickAction[] = [];

        // Check if message is about artists, booking, listening, etc.
        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('artist') || lowerMessage.includes('who')) {
            suggestedActions = [
                { icon: '👤', label: 'View Artists', action: '/artists', type: 'navigate' },
                { icon: '📅', label: 'Book Artist', action: '/bookings', type: 'navigate' }
            ];
        } else if (lowerMessage.includes('listen') || lowerMessage.includes('play') || lowerMessage.includes('music')) {
            suggestedActions = [
                { icon: '▶️', label: 'Play Music', action: 'play', type: 'play' },
                { icon: '🎧', label: 'Open Player', action: '/player', type: 'navigate' }
            ];
        } else if (lowerMessage.includes('book') || lowerMessage.includes('hire')) {
            suggestedActions = [
                { icon: '📅', label: 'Book Artist', action: '/bookings', type: 'navigate' },
                { icon: '🎙️', label: 'Book Studio', action: '/studio', type: 'navigate' }
            ];
        } else if (lowerMessage.includes('partner') || lowerMessage.includes('brand') || lowerMessage.includes('collaborate')) {
            suggestedActions = [
                { icon: '🤝', label: 'Partner With Us', action: '/partnerships', type: 'navigate' },
                { icon: '📄', label: 'Download Deck', action: '/partnerships#deck', type: 'navigate' }
            ];
        } else if (lowerMessage.includes('shop') || lowerMessage.includes('merch') || lowerMessage.includes('buy')) {
            suggestedActions = [
                { icon: '🛒', label: 'Shop Merch', action: '/merch', type: 'navigate' }
            ];
        } else if (currentPage !== '/' && quickActions.length > 0) {
            // Use page-specific quick actions
            suggestedActions = quickActions.slice(0, 3);
        }

        return NextResponse.json({
            response: text,
            quickActions: suggestedActions.slice(0, 3), // Max 3 actions
        });

    } catch (error: unknown) {
        console.error('Chat API Error:', error);

        // Handle specific Gemini API errors
        if (error instanceof Error && error.message?.includes('API key')) {
            return NextResponse.json(
                { error: 'Invalid API key. Please check your GEMINI_API_KEY environment variable.' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: 'Sorry, I encountered an error. Please try again.' },
            { status: 500 }
        );
    }
}
