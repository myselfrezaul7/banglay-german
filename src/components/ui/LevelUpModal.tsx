'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface LevelUpModalProps {
    isOpen: boolean;
    level: number;
    onClose: () => void;
}

export default function LevelUpModal({ isOpen, level, onClose }: LevelUpModalProps) {
    useEffect(() => {
        if (isOpen) {
            // Haptic
            if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
                window.navigator.vibrate([50, 100, 150]);
            }
            
            const end = Date.now() + 2000;
            const colors = ['#fbbf24', '#f59e0b', '#d97706'];

            (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 50 }}
                        transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
                        className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 text-center shadow-2xl border border-amber-200 dark:border-amber-900/50 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-amber-400/20 to-transparent pointer-events-none" />
                        
                        <motion.div 
                            initial={{ rotate: -180, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ type: "spring", delay: 0.2, duration: 0.8 }}
                            className="relative w-32 h-32 mx-auto mb-6"
                        >
                            <div className="absolute inset-0 bg-amber-400 blur-2xl opacity-40 rounded-full animate-pulse" />
                            <div className="relative w-full h-full bg-gradient-to-br from-amber-300 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-slate-800">
                                <Trophy className="w-16 h-16 text-white" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Level Up!</h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-8 font-medium">You reached Level {level}. Keep up the amazing work!</p>

                            <button 
                                onClick={onClose}
                                className="w-full flex items-center justify-center gap-2 py-4 bg-amber-500 hover:bg-amber-400 text-white rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-[0_4px_0_0] shadow-amber-700 active:shadow-[0_0px_0_0] active:translate-y-1"
                            >
                                Continue <ChevronRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
