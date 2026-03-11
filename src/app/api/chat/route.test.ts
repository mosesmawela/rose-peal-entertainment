import { describe, it, mock } from 'node:test';
import assert from 'node:assert';
import { NextRequest } from 'next/server';

process.env.GEMINI_API_KEY = 'test';

import { POST } from './route';

describe('POST Error Handling', () => {
    it('handles missing API key configuration', async () => {
        const oldKey = process.env.GEMINI_API_KEY;
        delete process.env.GEMINI_API_KEY;

        const req = new NextRequest('http://localhost', {
            method: 'POST',
            body: JSON.stringify({ message: 'hi' })
        });

        const res = await POST(req);
        assert.equal(res.status, 500);

        const json = await res.json();
        assert.ok(json.error.includes('AI service is not configured'));

        process.env.GEMINI_API_KEY = oldKey;
    });

    it('handles empty message parameter', async () => {
        const req = new NextRequest('http://localhost', {
            method: 'POST',
            body: JSON.stringify({})
        });

        const res = await POST(req);
        assert.equal(res.status, 400);

        const json = await res.json();
        assert.equal(json.error, 'Message is required');
    });

    it('handles non-string message parameter', async () => {
        const req = new NextRequest('http://localhost', {
            method: 'POST',
            body: JSON.stringify({ message: 123 })
        });

        const res = await POST(req);
        assert.equal(res.status, 400);

        const json = await res.json();
        assert.equal(json.error, 'Message is required');
    });

    it('handles API key error from Google service', async () => {
        // Intercept global fetch to simulate a thrown error by the generative AI service
        const origFetch = globalThis.fetch;
        globalThis.fetch = mock.fn(() => Promise.reject(new Error('Invalid API key')));

        const req = new NextRequest('http://localhost', {
            method: 'POST',
            body: JSON.stringify({ message: 'hi' })
        });

        const res = await POST(req);
        assert.equal(res.status, 500);

        const json = await res.json();
        assert.ok(json.error.includes('Invalid API key'));

        globalThis.fetch = origFetch;
    });

    it('handles other unknown errors gracefully', async () => {
        const origFetch = globalThis.fetch;
        globalThis.fetch = mock.fn(() => Promise.reject(new Error('Unknown internal service error')));

        const req = new NextRequest('http://localhost', {
            method: 'POST',
            body: JSON.stringify({ message: 'hi' })
        });

        const res = await POST(req);
        assert.equal(res.status, 500);

        const json = await res.json();
        assert.equal(json.error, 'Sorry, I encountered an error. Please try again.');

        globalThis.fetch = origFetch;
    });
});
