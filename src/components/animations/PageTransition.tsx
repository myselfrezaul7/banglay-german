'use client';

import { motion, AnimatePresence, Transition } from 'framer-motion';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
    children: ReactNode;
}

const transition: Transition = {
    duration: 0.6,
    ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
};

export default function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={transition}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
