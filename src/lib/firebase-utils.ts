import type { Analytics } from "firebase/analytics";
import { logEvent } from "firebase/analytics";

// Export the internal logger so it can be mocked in tests
export const logger = {
    logEvent
};

export const logPageView = (analytics: Analytics | null, pageName: string) => {
    if (analytics) {
        logger.logEvent(analytics, 'page_view', { page_title: pageName });
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logCustomEvent = (analytics: Analytics | null, eventName: string, eventParams?: { [key: string]: any }) => {
    if (analytics) {
        logger.logEvent(analytics, eventName, eventParams);
    }
};
