"use client";

import { motion, useScroll, useTransform, useSpring, useVelocity } from "framer-motion";

export const BackgroundLogo = () => {
    const { scrollY } = useScroll();

    // 1. 3D Rotation based on scroll position
    // Rotates 180 degrees for every 500px scrolled
    const rotateX = useTransform(scrollY, [0, 5000], [0, 1800]);
    const smoothRotate = useSpring(rotateX, { stiffness: 50, damping: 20 });

    // 2. Motion Blur based on scroll velocity
    const scrollVelocity = useVelocity(scrollY);
    const blurAmount = useTransform(scrollVelocity, [-2000, 0, 2000], [10, 0, 10]);
    const smoothBlur = useSpring(blurAmount, { stiffness: 200, damping: 30 });

    // 3. Opacity (Increased slightly for visibility, but still background)
    const opacity = 0.6;

    return (
        <div
            className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden"
            style={{ perspective: "1000px" }}
        >

            {/* The Logo Image */}
            <motion.img
                src="https://ik.imagekit.io/mosesmawela/Rose%20Pearl/logo(icon).svg?updatedAt=1770182492360"
                alt="Rose Pearl Logo"
                style={{
                    rotateX: smoothRotate,
                    filter: useTransform(smoothBlur, (v) => `blur(${v}px)`),
                    opacity: 0.8,
                }}
                className="w-[600px] h-[600px] object-contain relative z-0 drop-shadow-[0_0_100px_rgba(225,29,72,0.3)]"
            />
        </div>
    );
};
