"use client";

import { useEffect, useState } from 'react';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';
import { app } from '@/lib/firebase.config';

export function FCMHandler() {
    const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

    useEffect(() => {
        // Only run on client
        if (typeof window === 'undefined') return;

        const initMessaging = async () => {
            try {
                // Return early if no project ID to avoid crash in missing dev env config
                if (!app.options.projectId) return;

                const messaging = getMessaging(app);

                // Request permission
                const permission = await Notification.requestPermission();
                setNotificationPermission(permission);

                if (permission === 'granted') {
                    // Get token
                    const token = await getToken(messaging, {
                        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
                    });

                    if (token) {
                        console.log('[FCM] Token:', token);
                        // TODO: Send this token to your server/Supabase to associate with the user
                    }

                    // Handle incoming messages
                    onMessage(messaging, (payload) => {
                        console.log('[FCM] Message received:', payload);
                        // You can show a toast or custom UI here
                        // new Notification(payload.notification?.title || 'New Message', {
                        //   body: payload.notification?.body,
                        //   icon: '/icon.png'
                        // });
                    });
                }
            } catch (error) {
                console.error('[FCM] Error initializing messaging:', error);
            }
        };

        initMessaging();
    }, []);

    return null;
}
