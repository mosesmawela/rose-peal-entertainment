import { renderHook } from '@testing-library/react';
import { useToast, ToastProvider } from './ToastContext';
import { expect, test, describe } from 'vitest';

describe('useToast', () => {
  test('throws an error when used outside of ToastProvider', () => {
    expect(() => renderHook(() => useToast())).toThrowError('useToast must be used within a ToastProvider');
  });

  test('does not throw when used within ToastProvider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ToastProvider>{children}</ToastProvider>
    );

    const { result } = renderHook(() => useToast(), { wrapper });

    expect(result.current.toast).toBeTypeOf('function');
  });
});
