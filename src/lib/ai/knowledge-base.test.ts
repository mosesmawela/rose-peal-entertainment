import test from 'node:test';
import assert from 'node:assert';
import { findFAQ, FAQS } from './knowledge-base.ts';

test('findFAQ function', async (t) => {
    await t.test('finds FAQ by matching a word in the question', () => {
        const query = 'book';
        const result = findFAQ(query);
        assert.ok(result, 'FAQ should be found');
        assert.strictEqual(result.question, 'How do I book an artist?');
    });

    await t.test('finds FAQ by matching a phrase in the answer', () => {
        const query = 'submit a sync request';
        const result = findFAQ(query);
        assert.ok(result, 'FAQ should be found');
        assert.strictEqual(result.question, 'How do I license music for my project?');
    });

    await t.test('is case-insensitive', () => {
        const query = 'ROSEPEARL ENTERTAINMENT';
        const result = findFAQ(query);
        assert.ok(result, 'FAQ should be found despite case differences');
        assert.strictEqual(result.question, 'What is RosePearl Entertainment?');
    });

    await t.test('returns undefined when there is no match', () => {
        const query = 'how to fly to the moon';
        const result = findFAQ(query);
        assert.strictEqual(result, undefined, 'Result should be undefined for non-existent queries');
    });

    await t.test('handles empty string by returning the first FAQ', () => {
        // Since every string includes an empty string, find() returns the first element
        const query = '';
        const result = findFAQ(query);
        assert.ok(result, 'FAQ should be found');
        assert.strictEqual(result, FAQS[0]);
    });
});
