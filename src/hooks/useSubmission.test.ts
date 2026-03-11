import 'global-jsdom/register';
import { test, describe, beforeEach, afterEach, mock } from 'node:test';
import assert from 'node:assert';
import { renderHook, act } from '@testing-library/react';
import { useSubmission } from './useSubmission';

// Mock Howler's HTML5 Audio methods so it doesn't complain in JSDOM
// or throw errors when trying to load/play audio during tests.
if (typeof window !== 'undefined') {
    window.HTMLMediaElement.prototype.load = () => {};
    window.HTMLMediaElement.prototype.play = async () => {};
    window.HTMLMediaElement.prototype.pause = () => {};
}

describe('useSubmission hook', () => {
    let originalFetch: typeof global.fetch;
    let originalConsoleLog: typeof console.log;
    let originalConsoleError: typeof console.error;

    beforeEach(() => {
        // Save originals
        originalFetch = global.fetch;
        originalConsoleLog = console.log;
        originalConsoleError = console.error;

        // Silence console.log and console.error by default in tests
        console.log = mock.fn();
        console.error = mock.fn();
    });

    afterEach(() => {
        // Restore originals
        global.fetch = originalFetch;
        console.log = originalConsoleLog;
        console.error = originalConsoleError;
        mock.restoreAll();
    });

    test('initializes with correct default state', () => {
        const { result } = renderHook(() => useSubmission());

        assert.strictEqual(result.current.isLoading, false);
        assert.strictEqual(result.current.isSuccess, false);
        assert.strictEqual(result.current.error, null);
        assert.strictEqual(typeof result.current.submit, 'function');
        assert.strictEqual(typeof result.current.reset, 'function');
    });

    test('submit sets isLoading to true, then isSuccess to true on success', async () => {
        const fetchMock = mock.fn(async () => {
            return { ok: true } as Response;
        });
        global.fetch = fetchMock;

        const { result } = renderHook(() => useSubmission());

        const submitPromise = act(async () => {
            await result.current.submit({ name: 'Test User' });
        });

        // The state should be updating to success since we awaited the act correctly.
        // Let's actually check the final state after the act.
        await submitPromise;

        assert.strictEqual(result.current.isLoading, false);
        assert.strictEqual(result.current.isSuccess, true);
        assert.strictEqual(result.current.error, null);

        assert.strictEqual(fetchMock.mock.calls.length, 1);
        const [url, options] = fetchMock.mock.calls[0].arguments;
        assert.strictEqual(url, 'http://localhost:5678/webhook/rose-pearl-submission');
        assert.strictEqual(options?.method, 'POST');
        assert.strictEqual(options?.body, JSON.stringify({ name: 'Test User' }));
    });

    test('submit sets error state when fetch response is not ok', async () => {
        const fetchMock = mock.fn(async () => {
            return { ok: false } as Response;
        });
        global.fetch = fetchMock;

        const { result } = renderHook(() => useSubmission());

        await act(async () => {
            await result.current.submit({ name: 'Test User' });
        });

        assert.strictEqual(result.current.isLoading, false);
        assert.strictEqual(result.current.isSuccess, false);
        assert.strictEqual(result.current.error, 'Network error. Please try again.');

        // Assert that the error was logged
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        assert.strictEqual((console.error as any).mock.calls.length, 1);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        assert.strictEqual((console.error as any).mock.calls[0].arguments[0].message, 'Failed to submit');
    });

    test('submit sets error state when fetch throws an exception', async () => {
        const fetchMock = mock.fn(async () => {
            throw new Error('Network failure');
        });
        global.fetch = fetchMock;

        const { result } = renderHook(() => useSubmission());

        await act(async () => {
            await result.current.submit({ name: 'Test User' });
        });

        assert.strictEqual(result.current.isLoading, false);
        assert.strictEqual(result.current.isSuccess, false);
        assert.strictEqual(result.current.error, 'Network error. Please try again.');

        // Assert that the error was logged
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        assert.strictEqual((console.error as any).mock.calls.length, 1);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        assert.strictEqual((console.error as any).mock.calls[0].arguments[0].message, 'Network failure');
    });

    test('reset clears the state back to defaults', async () => {
        // First set it to a success state
        const fetchMock = mock.fn(async () => {
            return { ok: true } as Response;
        });
        global.fetch = fetchMock;

        const { result } = renderHook(() => useSubmission());

        await act(async () => {
            await result.current.submit({ name: 'Test User' });
        });

        // Verify it changed
        assert.strictEqual(result.current.isSuccess, true);

        // Now reset
        act(() => {
            result.current.reset();
        });

        assert.strictEqual(result.current.isLoading, false);
        assert.strictEqual(result.current.isSuccess, false);
        assert.strictEqual(result.current.error, null);
    });
});
