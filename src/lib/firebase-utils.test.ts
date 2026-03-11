import { test, mock } from 'node:test';
import assert from 'node:assert';

const mockLogEvent = mock.fn();

mock.module('firebase/analytics', {
    namedExports: {
        logEvent: mockLogEvent,
        Analytics: {}
    }
});

const { logCustomEvent, logPageView } = await import('./firebase-utils.ts');

test('logCustomEvent calls logEvent when analytics is provided', () => {
    mockLogEvent.mock.resetCalls();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const analyticsMock = { app: { options: {} } } as any;
    const eventName = 'test_event';
    const eventParams = { foo: 'bar' };

    logCustomEvent(analyticsMock, eventName, eventParams);

    assert.strictEqual(mockLogEvent.mock.calls.length, 1);
    const callArgs = mockLogEvent.mock.calls[0].arguments;
    assert.strictEqual(callArgs[0], analyticsMock);
    assert.strictEqual(callArgs[1], eventName);
    assert.deepStrictEqual(callArgs[2], eventParams);
});

test('logCustomEvent does not call logEvent when analytics is null', () => {
    mockLogEvent.mock.resetCalls();

    logCustomEvent(null, 'test_event', { foo: 'bar' });

    assert.strictEqual(mockLogEvent.mock.calls.length, 0);
});

test('logPageView calls logEvent when analytics is provided', () => {
    mockLogEvent.mock.resetCalls();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const analyticsMock = { app: { options: {} } } as any;
    const pageName = 'Home';

    logPageView(analyticsMock, pageName);

    assert.strictEqual(mockLogEvent.mock.calls.length, 1);
    const callArgs = mockLogEvent.mock.calls[0].arguments;
    assert.strictEqual(callArgs[0], analyticsMock);
    assert.strictEqual(callArgs[1], 'page_view');
    assert.deepStrictEqual(callArgs[2], { page_title: pageName });
});

test('logPageView does not call logEvent when analytics is null', () => {
    mockLogEvent.mock.resetCalls();

    logPageView(null, 'Home');

    assert.strictEqual(mockLogEvent.mock.calls.length, 0);
});
