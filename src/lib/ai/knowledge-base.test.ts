import { test, describe } from 'node:test';
import assert from 'node:assert';
import { getQuickActions } from './knowledge-base.ts';

describe('getQuickActions', () => {
    test('should return quick actions for a valid path', () => {
        const actions = getQuickActions('/artists');
        assert.strictEqual(actions.length, 2);
        assert.strictEqual(actions[0].label, 'View Artists');
        assert.strictEqual(actions[1].label, 'Book Artist');
    });

    test('should return quick actions for a valid user intent', () => {
        const actions = getQuickActions('discover');
        assert.strictEqual(actions.length, 2);
        assert.strictEqual(actions[0].label, 'Play Music');
        assert.strictEqual(actions[1].label, 'Open Player');
    });

    test('should return empty array for an unknown context', () => {
        const actions = getQuickActions('/unknown-path');
        assert.strictEqual(actions.length, 0);
    });
});
