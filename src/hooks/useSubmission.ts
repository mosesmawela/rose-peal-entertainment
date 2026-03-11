"use client";

import { useState } from "react";
import { useSoundEffect } from "./useSoundEffect";

interface SubmissionState {
    isLoading: boolean;
    isSuccess: boolean;
    error: string | null;
}

const N8N_WEBHOOK_URL = "http://localhost:5678/webhook/rose-pearl-submission";

export const useSubmission = () => {
    const [status, setStatus] = useState<SubmissionState>({
        isLoading: false,
        isSuccess: false,
        error: null,
    });
    const { play } = useSoundEffect();

    const submit = async <T = Record<string, unknown>>(data: T) => {
        setStatus({ isLoading: true, isSuccess: false, error: null });
        play('click');

        try {
            // In a real app, you would fetch from the env variable
            // const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || N8N_WEBHOOK_URL;

            // For now we will simulate a successful log if no URL is present, or try to fetch if we have one.
            // Since we don't have the real URL yet, we'll log to console and simulate success 
            // so the user experience is "working" until the URL is provided.

            console.log("Submitting to n8n:", data);

            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Failed to submit');

            // await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay

            setStatus({ isLoading: false, isSuccess: true, error: null });
            play('success');
        } catch (err) {
            console.error(err);
            setStatus({ isLoading: false, isSuccess: false, error: "Network error. Please try again." });
            play('error');
        }
    };

    const reset = () => {
        setStatus({ isLoading: false, isSuccess: false, error: null });
    };

    return { ...status, submit, reset };
};
