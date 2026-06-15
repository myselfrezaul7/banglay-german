'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
    children: ReactNode;
}

const pageVariants: Variants = {
  initial: { opacity: 0, y: 15, scale: 0.98 },
  enter: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: 'easeIn'
    }
  }
};

export default function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial="initial"
                animate="enter"
                exit="exit"
                variants={pageVariants}
                className="w-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
