import { test, mock, afterEach } from 'node:test';
import assert from 'node:assert';

// Setup jsdom environment
import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'http://localhost'
});
global.window = dom.window as unknown as Window global.window = dom.window as any; typeof globalThis;
global.document = dom.window.document as unknown as Document;
// Mock requestAnimationFrame for React
global.requestAnimationFrame = (callback) => setTimeout(callback, 0) as unknown as number;
global.cancelAnimationFrame = (id) => clearTimeout(id as unknown as number);

import { renderHook, act } from '@testing-library/react';

// The test runner uses the bare module mock based on how we resolve it in the loader.
const playMock = mock.fn();

mock.module('../useSoundEffect.ts', {
    namedExports: {
        useSoundEffect: () => ({ play: playMock })
    }
});

afterEach(() => {
    mock.restoreAll();
    playMock.mock.resetCalls();
});

test('useSubmission handles fetch error correctly', async () => {
    // Mock global fetch to return a non-ok response
    mock.method(global, 'fetch', async () => {
        return {
            ok: false
        };
    });

    // Suppress console.error and console.log for the test
    mock.method(console, 'error', () => {});
    mock.method(console, 'log', () => {});

    // Dynamically import the module under test so the mocks take effect
    const { useSubmission } = await import('../useSubmission.ts');

    // Call the hook
    const { result } = renderHook(() => useSubmission());

    // Call submit and wait for it to finish
    await act(async () => {
        await result.current.submit({ testData: 123 });
    });

    assert.deepStrictEqual({
        isLoading: result.current.isLoading,
        isSuccess: result.current.isSuccess,
        error: result.current.error
    }, {
        isLoading: false,
        isSuccess: false,
        error: "Network error. Please try again."
    }, 'Status should be updated with error message');

    // Verify sounds were played
    // First call is 'click', second call is 'error'
    assert.strictEqual(playMock.mock.calls.length, 2, 'play should be called twice');
    assert.strictEqual(playMock.mock.calls[1].arguments[0], 'error', 'Error sound should be played');
});

test('useSubmission handles fetch success correctly', async () => {
    // Mock global fetch to return ok response
    mock.method(global, 'fetch', async () => {
        return {
            ok: true,
            json: async () => ({})
        };
    });

    mock.method(console, 'log', () => {});

    // Dynamically import the module under test so the mocks take effect
    const { useSubmission } = await import('../useSubmission.ts');

    // Call the hook
    const { result } = renderHook(() => useSubmission());

    // Call submit and wait for it to finish
    await act(async () => {
        await result.current.submit({ testData: 123 });
    });

    assert.deepStrictEqual({
        isLoading: result.current.isLoading,
        isSuccess: result.current.isSuccess,
        error: result.current.error
    }, {
        isLoading: false,
        isSuccess: true,
        error: null
    }, 'Status should be updated with success');

    assert.strictEqual(playMock.mock.calls.length, 2, 'play should be called twice');
    assert.strictEqual(playMock.mock.calls[1].arguments[0], 'success', 'Success sound should be played');
});

test('useSubmission handles fetch exception correctly', async () => {
    // Mock global fetch to throw exception
    mock.method(global, 'fetch', async () => {
        throw new Error('Network timeout');
    });

    mock.method(console, 'error', () => {});
    mock.method(console, 'log', () => {});

    // Dynamically import the module under test so the mocks take effect
    const { useSubmission } = await import('../useSubmission.ts');

    // Call the hook
    const { result } = renderHook(() => useSubmission());

    // Call submit and wait for it to finish
    await act(async () => {
        await result.current.submit({ testData: 123 });
    });

    assert.deepStrictEqual({
        isLoading: result.current.isLoading,
        isSuccess: result.current.isSuccess,
        error: result.current.error
    }, {
        isLoading: false,
        isSuccess: false,
        error: "Network error. Please try again."
    }, 'Status should be updated with error');

    assert.strictEqual(playMock.mock.calls.length, 2, 'play should be called twice');
    assert.strictEqual(playMock.mock.calls[1].arguments[0], 'error', 'Error sound should be played');
});

test('useSubmission reset works correctly', async () => {
    // Dynamically import the module under test so the mocks take effect
    const { useSubmission } = await import('../useSubmission.ts');

    // Call the hook
    const { result } = renderHook(() => useSubmission());

    // Call reset
    act(() => {
        result.current.reset();
    });

    assert.deepStrictEqual({
        isLoading: result.current.isLoading,
        isSuccess: result.current.isSuccess,
        error: result.current.error
    }, {
        isLoading: false,
        isSuccess: false,
        error: null
    }, 'Status should be reset correctly');
});
