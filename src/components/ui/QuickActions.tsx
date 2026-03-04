"use client";

import { QuickAction } from '@/lib/ai/knowledge-base';
import { useRouter } from 'next/navigation';
import { useAudioStore } from '@/lib/store/useAudioStore';

interface QuickActionsProps {
    actions: QuickAction[];
}

export const QuickActions = ({ actions }: QuickActionsProps) => {
    const router = useRouter();
    const { play } = useAudioStore();

    if (!actions || actions.length === 0) return null;

    const handleAction = (action: QuickAction) => {
        switch (action.type) {
            case 'navigate':
                router.push(action.action);
                break;
            case 'play':
                play();
                break;
            case 'external':
                window.open(action.action, '_blank');
                break;
        }
    };

    return (
        <div className="flex flex-wrap gap-2 mt-3">
            {actions.map((action, index) => (
                <button
                    key={index}
                    onClick={() => handleAction(action)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-lg text-xs text-rose-300 hover:text-rose-200 transition-all duration-200 hover:scale-105"
                >
                    <span>{action.icon}</span>
                    <span>{action.label}</span>
                </button>
            ))}
        </div>
    );
};
