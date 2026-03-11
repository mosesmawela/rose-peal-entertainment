import { test, mock } from 'node:test';
import assert from 'node:assert';
import esmock from 'esmock';
import type * as firebaseAnalytics from 'firebase/analytics';

test('logCustomEvent', async (t) => {
    const mockLogEvent = mock.fn();

    // We import the function dynamically using esmock to replace dependencies
    const { logCustomEvent } = await esmock('./firebase-utils.ts', {
        'firebase/analytics': {
            logEvent: mockLogEvent,
        }
    });

    await t.test('calls logEvent with correct parameters when analytics is provided', () => {
        const analytics = {} as unknown as firebaseAnalytics.Analytics;
        const eventParams = { key: 'value' };

        logCustomEvent(analytics, 'test_event', eventParams);

        assert.strictEqual(mockLogEvent.mock.calls.length, 1);
        assert.deepStrictEqual(mockLogEvent.mock.calls[0].arguments, [analytics, 'test_event', eventParams]);
        mockLogEvent.mock.resetCalls();
    });

    await t.test('calls logEvent without eventParams when not provided', () => {
        const analytics = {} as unknown as firebaseAnalytics.Analytics;

        logCustomEvent(analytics, 'test_event');

        assert.strictEqual(mockLogEvent.mock.calls.length, 1);
        assert.deepStrictEqual(mockLogEvent.mock.calls[0].arguments, [analytics, 'test_event', undefined]);
        mockLogEvent.mock.resetCalls();
    });

    await t.test('does not call logEvent when analytics is null', () => {
        logCustomEvent(null, 'test_event', { key: 'value' });

        assert.strictEqual(mockLogEvent.mock.calls.length, 0);
    });
});
