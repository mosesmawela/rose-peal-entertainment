import { logEvent } from "firebase/analytics";
import type { Analytics } from "firebase/analytics";

export const logPageView = (analytics: Analytics | null, pageName: string) => {
    if (analytics) {
        logEvent(analytics, 'page_view', { page_title: pageName });
    }
};

export const logCustomEvent = (analytics: Analytics | null, eventName: string, eventParams?: Record<string, unknown>) => {
    if (analytics) {
        logEvent(analytics, eventName, eventParams);
    }
};
