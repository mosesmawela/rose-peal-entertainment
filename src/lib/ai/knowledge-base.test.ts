import test from 'node:test';
import assert from 'node:assert/strict';
import { findFAQ } from './knowledge-base.ts';

test('findFAQ', async (t) => {
    await t.test('returns undefined when no FAQ matches the query', () => {
        const result = findFAQ('this is a random query that should not match anything');
        assert.equal(result, undefined);
    });

    await t.test('finds an FAQ by exact question match', () => {
        const query = 'How do I book an artist?';
        const result = findFAQ(query);
        assert.ok(result);
        assert.equal(result.question, query);
    });

    await t.test('finds an FAQ by partial question match (case-insensitive)', () => {
        const result = findFAQ('BOOK AN ARTIST');
        assert.ok(result);
        assert.equal(result.question, 'How do I book an artist?');
    });

    await t.test('finds an FAQ by partial answer match', () => {
        // Match from "Head to The Lab (Studio) page and fill out the booking form..."
        const result = findFAQ('The Lab (Studio) page');
        assert.ok(result);
        assert.equal(result.question, 'How do I book studio time?');
    });

    await t.test('finds an FAQ by case-insensitive answer match', () => {
        // Match from "RosePearl Entertainment is a record label..."
        const result = findFAQ('rosepearl entertainment is a record label');
        assert.ok(result);
        assert.equal(result.question, 'What is RosePearl Entertainment?');
    });
});
