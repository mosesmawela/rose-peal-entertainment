import { renderHook, act, render, screen, waitFor } from '@testing-library/react';
import React, { ReactNode } from 'react';
import { useToast, ToastProvider } from './ToastContext';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
    AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
    motion: {
        div: ({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) => (
            <div className={className} style={style}>{children}</div>
        ),
    },
}));

describe('useToast', () => {
    it('throws an error when used outside of ToastProvider', () => {
        const originalError = console.error;
        console.error = jest.fn();

        expect(() => {
            renderHook(() => useToast());
        }).toThrow('useToast must be used within a ToastProvider');

        console.error = originalError;
    });

    it('returns the toast function when used within ToastProvider', () => {
        const wrapper = ({ children }: { children: ReactNode }) => (
            <ToastProvider>{children}</ToastProvider>
        );

        const { result } = renderHook(() => useToast(), { wrapper });

        expect(typeof result.current.toast).toBe('function');
    });

    it('adds and auto-dismisses a toast', async () => {
        jest.useFakeTimers();

        const TestComponent = () => {
            const { toast } = useToast();
            return (
                <button onClick={() => toast('Test message')}>
                    Trigger Toast
                </button>
            );
        };

        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );

        // Initial state
        expect(screen.queryByText('Test message')).toBeNull();

        // Trigger toast
        act(() => {
            screen.getByText('Trigger Toast').click();
        });

        // Toast should be visible
        expect(screen.getByText('Test message')).toBeInTheDocument();

        // Advance timers to auto-dismiss
        act(() => {
            jest.advanceTimersByTime(4000);
        });

        // Toast should be gone
        await waitFor(() => {
            expect(screen.queryByText('Test message')).toBeNull();
        });

        jest.useRealTimers();
    });

    it('allows manual dismissal of toasts', async () => {
        const TestComponent = () => {
            const { toast } = useToast();
            return (
                <button onClick={() => toast('Test message')}>
                    Trigger Toast
                </button>
            );
        };

        const { container } = render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );

        // Trigger toast
        act(() => {
            screen.getByText('Trigger Toast').click();
        });

        expect(screen.getByText('Test message')).toBeInTheDocument();

        // Find the close button and click it
        const closeButton = container.querySelector('button.text-white\\/40') as HTMLButtonElement;

        act(() => {
            closeButton?.click();
        });

        await waitFor(() => {
            expect(screen.queryByText('Test message')).toBeNull();
        });
    });
});
