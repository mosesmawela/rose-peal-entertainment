import type { Analytics } from "firebase/analytics";
import { logEvent } from "firebase/analytics";

export const logPageView = (analytics: Analytics | null, pageName: string) => {
    if (analytics) {
        logEvent(analytics, 'page_view', { page_title: pageName });
    }
};

export const logCustomEvent = (analytics: Analytics | null, eventName: string, eventParams?: { [key: string]: any }) => {
    if (analytics) {
        logEvent(analytics, eventName, eventParams);
    }
};
