import test from 'node:test';
import assert from 'node:assert';
import { getQuickActions } from './knowledge-base.ts';

test('getQuickActions', async (t) => {
    await t.test('returns quick actions for exact path match', () => {
        const actions = getQuickActions('/merch');
        assert.strictEqual(actions.length, 1);
        assert.strictEqual(actions[0].action, '/merch');
        assert.strictEqual(actions[0].label, 'Shop Merch');
    });

    await t.test('returns quick actions for intent match', () => {
        const actions = getQuickActions('buy');
        assert.strictEqual(actions.length, 1);
        assert.strictEqual(actions[0].action, '/merch');
        assert.strictEqual(actions[0].label, 'Shop Merch');
    });

    await t.test('returns empty array for unknown context', () => {
        const actions = getQuickActions('unknown-context-xyz');
        assert.deepStrictEqual(actions, []);
    });

    await t.test('returns empty array for empty string context', () => {
        const actions = getQuickActions('');
        assert.deepStrictEqual(actions, []);
    });
});
