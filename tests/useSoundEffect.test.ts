import 'global-jsdom/register';
import { test, mock } from 'node:test';
import assert from 'node:assert';
import { renderHook } from '@testing-library/react';

const mockRate = mock.fn();
const mockVolume = mock.fn();
const mockPlay = mock.fn();
const mockUnload = mock.fn();
const mockHowlConstructor = mock.fn();

class MockHowl {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(options: any) {
            mockHowlConstructor(options);
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rate = (...args: any[]) => {
            mockRate(...args);
            return this;
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        volume = (...args: any[]) => {
            mockVolume(...args);
            return this;
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        play = (...args: any[]) => {
            mockPlay(...args);
            return this;
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        unload = (...args: any[]) => {
            mockUnload(...args);
            return this;
        };
}

mock.module('howler', {
    namedExports: {
        Howl: MockHowl
    }
});

test('useSoundEffect', async (t) => {
    const { useSoundEffect } = await import('../src/hooks/useSoundEffect.ts');

    await t.test('setup and teardown', () => {
        mockHowlConstructor.mock.resetCalls();
        mockUnload.mock.resetCalls();

        const { unmount } = renderHook(() => useSoundEffect());

        // Check Howl constructor options
        assert.strictEqual(mockHowlConstructor.mock.calls.length, 1);
        const options = mockHowlConstructor.mock.calls[0].arguments[0];
        assert.deepStrictEqual(options.src, ['https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3']);
        assert.strictEqual(options.volume, 0.5);
        assert.strictEqual(options.preload, true);

        // Verify cleanup
        unmount();
        assert.strictEqual(mockUnload.mock.calls.length, 1);
    });

    await t.test('play click', () => {
        mockRate.mock.resetCalls();
        mockVolume.mock.resetCalls();
        mockPlay.mock.resetCalls();

        const { result } = renderHook(() => useSoundEffect());
        result.current.play('click');

        assert.strictEqual(mockRate.mock.calls.length, 1);
        assert.strictEqual(mockRate.mock.calls[0].arguments[0], 1.0);

        assert.strictEqual(mockVolume.mock.calls.length, 1);
        assert.strictEqual(mockVolume.mock.calls[0].arguments[0], 0.2);

        assert.strictEqual(mockPlay.mock.calls.length, 1);
    });

    await t.test('play hover', () => {
        mockRate.mock.resetCalls();
        mockVolume.mock.resetCalls();
        mockPlay.mock.resetCalls();

        const { result } = renderHook(() => useSoundEffect());
        result.current.play('hover');

        assert.strictEqual(mockRate.mock.calls.length, 1);
        assert.strictEqual(mockRate.mock.calls[0].arguments[0], 1.5);

        assert.strictEqual(mockVolume.mock.calls.length, 1);
        assert.strictEqual(mockVolume.mock.calls[0].arguments[0], 0.05);

        assert.strictEqual(mockPlay.mock.calls.length, 1);
    });

    await t.test('play toggle', () => {
        mockRate.mock.resetCalls();
        mockVolume.mock.resetCalls();
        mockPlay.mock.resetCalls();

        const { result } = renderHook(() => useSoundEffect());
        result.current.play('toggle');

        assert.strictEqual(mockRate.mock.calls.length, 1);
        assert.strictEqual(mockRate.mock.calls[0].arguments[0], 0.8);

        assert.strictEqual(mockVolume.mock.calls.length, 1);
        assert.strictEqual(mockVolume.mock.calls[0].arguments[0], 0.2);

        assert.strictEqual(mockPlay.mock.calls.length, 1);
    });

    await t.test('play success', () => {
        mockRate.mock.resetCalls();
        mockVolume.mock.resetCalls();
        mockPlay.mock.resetCalls();

        const { result } = renderHook(() => useSoundEffect());
        result.current.play('success');

        assert.strictEqual(mockRate.mock.calls.length, 1);
        assert.strictEqual(mockRate.mock.calls[0].arguments[0], 1.2);

        assert.strictEqual(mockVolume.mock.calls.length, 1);
        assert.strictEqual(mockVolume.mock.calls[0].arguments[0], 0.4);

        assert.strictEqual(mockPlay.mock.calls.length, 1);
    });

    await t.test('play error', () => {
        mockRate.mock.resetCalls();
        mockVolume.mock.resetCalls();
        mockPlay.mock.resetCalls();

        const { result } = renderHook(() => useSoundEffect());
        result.current.play('error');

        assert.strictEqual(mockRate.mock.calls.length, 1);
        assert.strictEqual(mockRate.mock.calls[0].arguments[0], 0.5);

        assert.strictEqual(mockVolume.mock.calls.length, 1);
        assert.strictEqual(mockVolume.mock.calls[0].arguments[0], 0.2);

        assert.strictEqual(mockPlay.mock.calls.length, 1);
    });
});
