// RosePearl Entertainment - AI Knowledge Base
// This file contains all the contextual knowledge that Rose (the AI assistant) uses

export interface QuickAction {
    icon: string;
    label: string;
    action: string; // URL or action type
    type: 'navigate' | 'play' | 'external';
}

export interface PageInfo {
    path: string;
    title: string;
    description: string;
    summary: string;
    userIntent: string[];
    quickActions?: QuickAction[];
}

export interface ArtistInfo {
    name: string;
    bio: string;
    genre: string[];
    mood: string;
    latestRelease?: string;
    bookingAvailable: boolean;
}

export interface FAQ {
    question: string;
    answer: string;
    relatedPages: string[];
}

// Site Navigation Map
export const SITE_PAGES: PageInfo[] = [
    {
        path: '/',
        title: 'Home',
        description: 'Main landing page showcasing latest releases and featured content',
        summary: 'The home page features a cinematic landing experience and highlights the latest release "Buya Ekhaya" by Mawelele ft. Naledi Aphiwe. It serves as the gateway to the Rose Pearl experience.',
        userIntent: ['discover', 'explore', 'listen'],
        quickActions: [
            { icon: '▶️', label: 'Play Music', action: 'play', type: 'play' },
            { icon: '🎧', label: 'Open Player', action: '/player', type: 'navigate' }
        ]
    },
    {
        path: '/releases',
        title: 'New Releases',
        description: 'Browse all music releases from RosePearl artists',
        summary: 'This page showcases all music releases from RosePearl Entertainment, including singles, EPs, and albums. Each release features Spotify embeds for instant playback, artist information, and release dates.',
        userIntent: ['listen', 'discover', 'explore'],
        quickActions: [
            { icon: '▶️', label: 'Play Latest', action: 'play', type: 'play' },
            { icon: '🎵', label: 'View Playlists', action: '/playlists', type: 'navigate' }
        ]
    },
    {
        path: '/artists',
        title: 'Artists',
        description: 'Explore RosePearl Entertainment roster',
        summary: 'Meet the talented artists signed to RosePearl Entertainment. Each profile includes their bio, genre, discography, and booking information.',
        userIntent: ['discover', 'book', 'explore'],
        quickActions: [
            { icon: '👤', label: 'View Artists', action: '/artists', type: 'navigate' },
            { icon: '📅', label: 'Book Artist', action: '/bookings', type: 'navigate' }
        ]
    },
    {
        path: '/events',
        title: 'Events',
        description: 'Upcoming shows, performances, and label events',
        summary: 'Stay updated on upcoming RosePearl events, including artist performances, label showcases, and exclusive listening parties.',
        userIntent: ['attend', 'discover', 'book'],
        quickActions: [
            { icon: '🎫', label: 'View Events', action: '/events', type: 'navigate' }
        ]
    },
    {
        path: '/bookings',
        title: 'Bookings',
        description: 'Book RosePearl artists for your event',
        summary: 'Book RosePearl artists for performances, events, and collaborations. Submit your booking request with event details, budget, and preferred artist.',
        userIntent: ['book', 'hire', 'collaborate'],
        quickActions: [
            { icon: '📅', label: 'Submit Booking', action: '/bookings', type: 'navigate' },
            { icon: '👤', label: 'View Artists', action: '/artists', type: 'navigate' }
        ]
    },
    {
        path: '/studio',
        title: 'The Lab (Studio)',
        description: 'Professional recording studio available for booking',
        summary: 'The Lab is RosePearl\'s state-of-the-art recording studio in Johannesburg. Book studio time for recording, mixing, mastering, and production sessions.',
        userIntent: ['record', 'book', 'create'],
        quickActions: [
            { icon: '🎙️', label: 'Book Studio', action: '/studio', type: 'navigate' },
            { icon: '📩', label: 'Contact', action: '/contact', type: 'navigate' }
        ]
    },
    {
        path: '/merch',
        title: 'Shop',
        description: 'Official RosePearl merchandise',
        summary: 'Shop exclusive RosePearl merchandise including apparel, vinyl records, and limited edition items.',
        userIntent: ['shop', 'buy', 'support'],
        quickActions: [
            { icon: '🛒', label: 'Shop Merch', action: '/merch', type: 'navigate' }
        ]
    },
    {
        path: '/partnerships',
        title: 'Partnerships & Brands',
        description: 'Collaborate with RosePearl Entertainment',
        summary: 'RosePearl works with brands through artist campaigns, cultural activations, and creative collaborations. Download our partnership deck or submit a collaboration proposal.',
        userIntent: ['partner', 'collaborate', 'sponsor'],
        quickActions: [
            { icon: '🤝', label: 'Partner With Us', action: '/partnerships', type: 'navigate' },
            { icon: '📄', label: 'Download Deck', action: '/partnerships#deck', type: 'navigate' }
        ]
    },
    {
        path: '/licensing',
        title: 'Licensing & Sync',
        description: 'License RosePearl music for media projects',
        summary: 'License music from RosePearl artists for film, TV, commercials, games, and other media projects. Submit your sync request with project details.',
        userIntent: ['license', 'sync', 'media'],
        quickActions: [
            { icon: '📝', label: 'Submit Request', action: '/licensing', type: 'navigate' }
        ]
    },
    {
        path: '/distribution',
        title: 'Distribution Services',
        description: 'Get your music distributed worldwide',
        summary: 'RosePearl offers distribution services to get your music on all major streaming platforms including Spotify, Apple Music, and more.',
        userIntent: ['distribute', 'release', 'publish'],
        quickActions: [
            { icon: '🌍', label: 'Learn More', action: '/distribution', type: 'navigate' }
        ]
    },
    {
        path: '/submissions',
        title: 'Artist Submissions',
        description: 'Submit your demo to RosePearl',
        summary: 'Submit your music for consideration to join the RosePearl roster. We\'re looking for talented artists in amapiano, R&B, afrobeats, and related genres.',
        userIntent: ['submit', 'join', 'sign'],
        quickActions: [
            { icon: '🎤', label: 'Submit Demo', action: '/submissions', type: 'navigate' }
        ]
    },
    {
        path: '/staff',
        title: 'Staff & Founders',
        description: 'Meet the RosePearl team',
        summary: 'Learn about the team behind RosePearl Entertainment, including founders, A&R, management, and creative staff.',
        userIntent: ['learn', 'connect', 'about'],
        quickActions: [
            { icon: '👥', label: 'View Team', action: '/staff', type: 'navigate' }
        ]
    },
    {
        path: '/press',
        title: 'Press Hub',
        description: 'Media resources and press releases',
        summary: 'Access press releases, artist bios, high-resolution photos, and media kits for journalists and media professionals.',
        userIntent: ['media', 'press', 'download'],
        quickActions: [
            { icon: '📰', label: 'View Press', action: '/press', type: 'navigate' }
        ]
    },
    {
        path: '/contact',
        title: 'Contact',
        description: 'Get in touch with RosePearl',
        summary: 'Contact RosePearl Entertainment for general inquiries, support, or questions. Our team typically responds within 24-48 hours.',
        userIntent: ['contact', 'support', 'help'],
        quickActions: [
            { icon: '📩', label: 'Contact Us', action: '/contact', type: 'navigate' }
        ]
    },
    {
        path: '/player',
        title: 'Music Player',
        description: 'Full-featured music player',
        summary: 'The music player features all RosePearl releases with playlist navigation, playback controls, and immersive visualizations.',
        userIntent: ['listen', 'play', 'enjoy'],
        quickActions: [
            { icon: '▶️', label: 'Play Music', action: 'play', type: 'play' }
        ]
    },
    {
        path: '/playlists',
        title: 'Label Playlists',
        description: 'Curated playlists from RosePearl',
        summary: 'Explore curated playlists featuring RosePearl artists and similar sounds, organized by mood, genre, and vibe.',
        userIntent: ['discover', 'listen', 'explore'],
        quickActions: [
            { icon: '🎵', label: 'Browse Playlists', action: '/playlists', type: 'navigate' }
        ]
    }
];

// Artist Database (will be enhanced with Supabase data)
export const ARTISTS: ArtistInfo[] = [
    {
        name: 'The Weeknd',
        bio: 'Genre-defying artist blending R&B, synth-wave, and dark pop aesthetics.',
        genre: ['R&B', 'Synth-Wave', 'Pop'],
        mood: 'Dark, atmospheric, introspective',
        latestRelease: 'Midnight Rose',
        bookingAvailable: true
    },
    {
        name: 'Mawelele',
        bio: 'Rising amapiano artist bringing fresh energy to the South African music scene.',
        genre: ['Amapiano', 'Afro House'],
        mood: 'Energetic, soulful, vibrant',
        latestRelease: 'Buya Ekhaya (feat. Naledi Aphiwe)',
        bookingAvailable: true
    },
    {
        name: 'Naledi Aphiwe',
        bio: 'Soulful vocalist known for powerful performances and emotional depth.',
        genre: ['Amapiano', 'R&B', 'Soul'],
        mood: 'Soulful, emotional, powerful',
        bookingAvailable: true
    }
];

// FAQ Database
export const FAQS: FAQ[] = [
    {
        question: 'How do I book an artist?',
        answer: 'Visit the Bookings page and submit a booking request with your event details, preferred artist, date, and budget. Our team will respond within 24-48 hours with availability and pricing.',
        relatedPages: ['/bookings', '/artists']
    },
    {
        question: 'How do I book studio time?',
        answer: 'Head to The Lab (Studio) page and fill out the booking form with your preferred dates, session type (recording, mixing, mastering), and any special requirements. We\'ll confirm availability and send you pricing details.',
        relatedPages: ['/studio', '/contact']
    },
    {
        question: 'How do partnerships work?',
        answer: 'RosePearl collaborates with brands through artist campaigns, event sponsorships, and cultural activations. Visit our Partnerships page to download our partnership deck or submit a collaboration proposal.',
        relatedPages: ['/partnerships']
    },
    {
        question: 'How do I submit my music?',
        answer: 'Go to the Artist Submissions page and upload your demo along with your bio and social links. We review all submissions and reach out to artists that align with our vision.',
        relatedPages: ['/submissions']
    },
    {
        question: 'How does merch ordering work?',
        answer: 'Browse our Shop page, add items to your cart, and checkout. We ship worldwide with tracking. Delivery typically takes 5-10 business days depending on your location.',
        relatedPages: ['/merch']
    },
    {
        question: 'How do I license music for my project?',
        answer: 'Visit the Licensing & Sync page and submit a sync request with your project details, usage type, and budget. Our licensing team will provide a quote and clearance timeline.',
        relatedPages: ['/licensing']
    },
    {
        question: 'How do I contact the label?',
        answer: 'Use the Contact page to send us a message, or email us directly. For specific inquiries (bookings, partnerships, submissions), use the dedicated forms on those pages for faster responses.',
        relatedPages: ['/contact']
    },
    {
        question: 'What is RosePearl Entertainment?',
        answer: 'RosePearl Entertainment is a record label, creative studio, and cultural hub based in Johannesburg. We discover, develop, and promote talented artists across amapiano, R&B, afrobeats, and related genres.',
        relatedPages: ['/', '/staff', '/artists']
    }
];

// Admin-Only Intelligence (only accessible to authenticated admins)
export const ADMIN_INTELLIGENCE = {
    capabilities: [
        'Artist performance summaries',
        'Release analytics',
        'Booking status overview',
        'Site health metrics',
        'Content suggestions',
        'Admin navigation shortcuts'
    ],
    shortcuts: [
        { command: 'dashboard', path: '/admin/dashboard' },
        { command: 'artists', path: '/admin/artists' },
        { command: 'releases', path: '/admin/releases' },
        { command: 'bookings', path: '/admin/bookings' }
    ]
};

// Helper function to get page info by path
export function getPageInfo(path: string): PageInfo | undefined {
    return SITE_PAGES.find(page => page.path === path);
}

// Helper function to get quick actions for a context
export function getQuickActions(context: string): QuickAction[] {
    const page = SITE_PAGES.find(p => p.path === context || p.userIntent.includes(context));
    return page?.quickActions || [];
}

// Helper function to find relevant FAQ
export function findFAQ(query: string): FAQ | undefined {
    const lowerQuery = query.toLowerCase();
    return FAQS.find(faq =>
        faq.question.toLowerCase().includes(lowerQuery) ||
        faq.answer.toLowerCase().includes(lowerQuery)
    );
}

// Helper function to get artist info
export function getArtistInfo(name: string): ArtistInfo | undefined {
    return ARTISTS.find(artist =>
        artist.name.toLowerCase().includes(name.toLowerCase())
    );
}
