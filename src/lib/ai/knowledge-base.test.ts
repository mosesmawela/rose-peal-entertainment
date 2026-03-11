import { describe, test } from 'node:test';
import * as assert from 'node:assert';
import { findFAQ } from './knowledge-base.ts';

describe('findFAQ', () => {
    test('finds FAQ by exact question match', () => {
        const result = findFAQ('How do I book an artist?');
        assert.ok(result !== undefined);
        assert.strictEqual(result?.question, 'How do I book an artist?');
    });

    test('finds FAQ by case-insensitive partial question match', () => {
        const result = findFAQ('BOOK AN ARTIST');
        assert.ok(result !== undefined);
        assert.strictEqual(result?.question, 'How do I book an artist?');
    });

    test('finds FAQ by case-insensitive partial answer match', () => {
        const result = findFAQ('worldwide with tracking');
        assert.ok(result !== undefined);
        assert.strictEqual(result?.question, 'How does merch ordering work?');
    });

    test('returns undefined for non-matching query', () => {
        const result = findFAQ('nonexistent random string 12345');
        assert.strictEqual(result, undefined);
    });

    test('returns first FAQ for empty string query due to empty string inclusion', () => {
        const result = findFAQ('');
        assert.ok(result !== undefined);
        assert.strictEqual(result?.question, 'How do I book an artist?');
    });
});
