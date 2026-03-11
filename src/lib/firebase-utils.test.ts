import { mock, describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';

const mockLogEvent = mock.fn();

mock.module('firebase/analytics', {
    namedExports: {
        logEvent: mockLogEvent,
        getAnalytics: mock.fn()
    }
});

// We need a unique import dynamically to prevent ESM cache from reusing the un-mocked module.
describe('firebase-utils', () => {
    let logPageView: typeof import('./firebase-utils.ts').logPageView;
    let logCustomEvent: typeof import('./firebase-utils.ts').logCustomEvent;

    beforeEach(async () => {
        mockLogEvent.mock.resetCalls();
        const t = Date.now() + Math.random();
        const mod = await import('./firebase-utils.ts?t=' + t);
        logPageView = mod.logPageView;
        logCustomEvent = mod.logCustomEvent;
    });

    afterEach(() => {
        mockLogEvent.mock.resetCalls();
    });

    it('logPageView logs event when analytics is provided', () => {
        const mockAnalytics = {} as unknown as import('firebase/analytics').Analytics;
        logPageView(mockAnalytics, 'home');

        assert.strictEqual(mockLogEvent.mock.callCount(), 1);
        assert.deepStrictEqual(mockLogEvent.mock.calls[0].arguments, [
            mockAnalytics,
            'page_view',
            { page_title: 'home' }
        ]);
    });

    it('logPageView does nothing when analytics is null', () => {
        logPageView(null, 'home');

        assert.strictEqual(mockLogEvent.mock.callCount(), 0);
    });

    it('logCustomEvent logs event when analytics is provided', () => {
        const mockAnalytics = {} as unknown as import('firebase/analytics').Analytics;
        const mockParams = { key: 'value' };
        logCustomEvent(mockAnalytics, 'custom_event', mockParams);

        assert.strictEqual(mockLogEvent.mock.callCount(), 1);
        assert.deepStrictEqual(mockLogEvent.mock.calls[0].arguments, [
            mockAnalytics,
            'custom_event',
            mockParams
        ]);
    });

    it('logCustomEvent logs event without params when none provided', () => {
        const mockAnalytics = {} as unknown as import('firebase/analytics').Analytics;
        logCustomEvent(mockAnalytics, 'custom_event');

        assert.strictEqual(mockLogEvent.mock.callCount(), 1);
        assert.deepStrictEqual(mockLogEvent.mock.calls[0].arguments, [
            mockAnalytics,
            'custom_event',
            undefined
        ]);
    });

    it('logCustomEvent does nothing when analytics is null', () => {
        logCustomEvent(null, 'custom_event');

        assert.strictEqual(mockLogEvent.mock.callCount(), 0);
    });
});
