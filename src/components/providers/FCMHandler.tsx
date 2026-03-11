"use client";

import { useEffect, useState } from 'react';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';
import { app } from '@/lib/firebase.config';
import { createClient } from '@/lib/supabase/client';

export function FCMHandler() {
    const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

    useEffect(() => {
        // Only run on client
        if (typeof window === 'undefined') return;

        const initMessaging = async () => {
            try {
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

                        const supabase = createClient();
                        const { data: { user } } = await supabase.auth.getUser();

                        if (user) {
                            await supabase.from('fcm_tokens').upsert({ user_id: user.id, token: token }, { onConflict: 'token' });
                        }
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
