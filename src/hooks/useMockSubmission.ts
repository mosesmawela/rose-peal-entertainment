"use client";

import { useState } from "react";
import { useSoundEffect } from "./useSoundEffect";

interface SubmissionState {
    isLoading: boolean;
    isSuccess: boolean;
    error: string | null;
}

export const useMockSubmission = () => {
    const [status, setStatus] = useState<SubmissionState>({
        isLoading: false,
        isSuccess: false,
        error: null,
    });
    const { play } = useSoundEffect();

    const submit = async (formData?: unknown) => {
        setStatus({ isLoading: true, isSuccess: false, error: null });
        play('click');

        // Simulate Network Delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Random Success (90% chance) for realism in testing, or force success for demo
        const isSuccess = Math.random() > 0.1;

        if (isSuccess) {
            setStatus({ isLoading: false, isSuccess: true, error: null });
            play('success');
        } else {
            setStatus({ isLoading: false, isSuccess: false, error: "Network error. Please try again." });
            play('error');
        }
    };

    const reset = () => {
        setStatus({ isLoading: false, isSuccess: false, error: null });
    };

    return { ...status, submit, reset };
};
