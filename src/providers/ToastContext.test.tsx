import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useToast, ToastProvider } from './ToastContext';
import { describe, it, expect, vi } from 'vitest';

describe('useToast', () => {
    it('throws an error when used outside of ToastProvider', () => {
        // Suppress expected console.error from React Error Boundary
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

        expect(() => renderHook(() => useToast())).toThrow(
            'useToast must be used within a ToastProvider'
        );

        consoleError.mockRestore();
    });

    it('returns the toast function when used within ToastProvider', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <ToastProvider>{children}</ToastProvider>
        );

        const { result } = renderHook(() => useToast(), { wrapper });

        expect(typeof result.current.toast).toBe('function');
    });

    it('can add and auto-remove a toast', () => {
        vi.useFakeTimers();

        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <ToastProvider>{children}</ToastProvider>
        );

        const { result } = renderHook(() => useToast(), { wrapper });

        act(() => {
            result.current.toast('Test Message', 'success');
        });

        // Test the auto-dismiss timer (4000ms)
        act(() => {
            vi.advanceTimersByTime(4000);
        });

        vi.useRealTimers();
    });
});
