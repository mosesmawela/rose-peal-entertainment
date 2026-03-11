import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import { logEvent } from 'firebase/analytics';
import { logPageView, logCustomEvent } from './firebase-utils.ts';
import type { Analytics } from 'firebase/analytics';

describe('firebase-utils', () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (logEvent as any).mock.resetCalls();
  });

  describe('logPageView', () => {
    it('calls logEvent with correct arguments when analytics is provided', () => {
      const mockAnalytics = {} as Analytics;
      const pageName = 'test_page';

      logPageView(mockAnalytics, pageName);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      assert.strictEqual((logEvent as any).mock.callCount(), 1);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const call = (logEvent as any).mock.calls[0];
      assert.strictEqual(call.arguments[0], mockAnalytics);
      assert.strictEqual(call.arguments[1], 'page_view');
      assert.deepStrictEqual(call.arguments[2], { page_title: pageName });
    });

    it('does not call logEvent when analytics is null', () => {
      logPageView(null, 'test_page');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      assert.strictEqual((logEvent as any).mock.callCount(), 0);
    });
  });

  describe('logCustomEvent', () => {
    it('calls logEvent with correct arguments when analytics is provided', () => {
      const mockAnalytics = {} as Analytics;
      const eventName = 'test_event';
      const eventParams = { param1: 'value1', param2: 2 };

      logCustomEvent(mockAnalytics, eventName, eventParams);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      assert.strictEqual((logEvent as any).mock.callCount(), 1);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const call = (logEvent as any).mock.calls[0];
      assert.strictEqual(call.arguments[0], mockAnalytics);
      assert.strictEqual(call.arguments[1], eventName);
      assert.deepStrictEqual(call.arguments[2], eventParams);
    });

    it('does not call logEvent when analytics is null', () => {
      logCustomEvent(null, 'test_event', { param1: 'value1' });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      assert.strictEqual((logEvent as any).mock.callCount(), 0);
    });

    it('calls logEvent correctly when eventParams are omitted', () => {
      const mockAnalytics = {} as Analytics;
      const eventName = 'test_event_no_params';

      logCustomEvent(mockAnalytics, eventName);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      assert.strictEqual((logEvent as any).mock.callCount(), 1);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const call = (logEvent as any).mock.calls[0];
      assert.strictEqual(call.arguments[0], mockAnalytics);
      assert.strictEqual(call.arguments[1], eventName);
      assert.strictEqual(call.arguments[2], undefined);
    });
  });
});
