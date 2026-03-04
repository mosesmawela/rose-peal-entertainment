"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initFirebaseServices } from '@/lib/firebase.config';
import { logPageView } from '@/lib/firebase-utils';

export function FirebaseAnalytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const init = async () => {
            const { analytics } = await initFirebaseServices();
            if (analytics) {
                // Track page view on route change
                const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
                logPageView(analytics, url);
                console.log(`[Firebase Analytics] Page view tracked: ${url}`);
            }
        };

        init();
    }, [pathname, searchParams]);

    return null;
}
