import { Analytics, logEvent } from "firebase/analytics";

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

/**
 * Associates an FCM device token with the current user.
 *
 * @param token The FCM device token
 */
export const saveDeviceToken = async (token: string): Promise<void> => {
    // This is a placeholder for future backend integration (e.g., Supabase)
    // to associate the device token with the user for push notifications.
    console.debug('[FCM] Token ready for server sync:', token);

    // Simulate API call or Supabase insertion
    return Promise.resolve();
};
