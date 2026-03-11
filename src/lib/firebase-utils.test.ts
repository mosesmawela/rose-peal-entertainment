import { test, mock } from 'node:test';
import assert from 'node:assert';
import type { Analytics } from 'firebase/analytics';
import { logCustomEvent, logger } from './firebase-utils';

test('logCustomEvent utility', async (t) => {
    await t.test('calls logEvent with correct arguments when analytics is provided', () => {
        const mockLogEvent = mock.method(logger, 'logEvent', () => {});

        const mockAnalytics = {} as Analytics;
        const eventName = 'test_event';
        const eventParams = { foo: 'bar' };

        logCustomEvent(mockAnalytics, eventName, eventParams);

        assert.strictEqual(mockLogEvent.mock.calls.length, 1);
        assert.deepStrictEqual(mockLogEvent.mock.calls[0].arguments, [mockAnalytics, eventName, eventParams]);

        mockLogEvent.mock.restore();
    });

    await t.test('does not call logEvent when analytics is null', () => {
        const mockLogEvent = mock.method(logger, 'logEvent', () => {});

        logCustomEvent(null, 'test_event', { foo: 'bar' });

        assert.strictEqual(mockLogEvent.mock.calls.length, 0);

        mockLogEvent.mock.restore();
    });
});
