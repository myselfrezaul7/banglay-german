'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface PronunciationCoachProps {
    targetText: string;
    onSuccess?: () => void;
}

export default function PronunciationCoach({ targetText, onSuccess }: PronunciationCoachProps) {
    const [isListening, setIsListening] = useState(false);
    const [spokenText, setSpokenText] = useState('');
    const [feedback, setFeedback] = useState<'neutral' | 'success' | 'error'>('neutral');
    const [permissionError, setPermissionError] = useState(false);
    const recognitionRef = useRef<any>(null); // Using any for SpeechRecognition as types might not be available

    useEffect(() => {
        if (typeof window !== 'undefined' && (window as any).webkitSpeechRecognition) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.lang = 'de-DE'; // German language
            recognitionRef.current.interimResults = false;

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setSpokenText(transcript);
                checkPronunciation(transcript);
                setIsListening(false);
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error('Speech recognition error', event.error);
                if (event.error === 'not-allowed') {
                    setPermissionError(true);
                }
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }
    }, [targetText]);

    const startListening = () => {
        setFeedback('neutral');
        setSpokenText('');
        setPermissionError(false);
        if (recognitionRef.current) {
            try {
                recognitionRef.current.start();
                setIsListening(true);
            } catch (error) {
                console.error('Failed to start recognition', error);
            }
        } else {
            setPermissionError(true);
        }
    };

    const checkPronunciation = (transcript: string) => {
        // Basic normalization: remove punctuation and lowercase
        const normalize = (text: string) => text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim();

        const normalizedTarget = normalize(targetText);
        const normalizedSpoken = normalize(transcript);

        // Simple Levenshtein distance check could be better, but direct comparison for now
        // Allow for small differences or partial matches if needed, but 'includes' is a start
        if (normalizedTarget === normalizedSpoken || normalizedSpoken.includes(normalizedTarget)) {
            setFeedback('success');
            if (onSuccess) onSuccess();
        } else {
            setFeedback('error');
        }
    };

    return (
        <div className="mt-6 p-6 md:p-8 rounded-[2rem] bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-slate-800/60 shadow-xl shadow-slate-200/40 dark:shadow-none transition-all">
            <div className="flex flex-col items-center gap-5">
                <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-6 h-[2px] bg-slate-300 dark:bg-slate-700 rounded-full inline-block"></span>
                    Pronunciation Coach
                    <span className="w-6 h-[2px] bg-slate-300 dark:bg-slate-700 rounded-full inline-block"></span>
                </h4>

                {spokenText && (
                    <div className={`text-lg font-medium px-4 py-2 rounded-lg ${feedback === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                            feedback === 'error' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                'bg-slate-100 text-slate-700'
                        }`}>
                        "{spokenText}"
                    </div>
                )}

                {feedback === 'success' && (
                    <div className="text-green-600 dark:text-green-400 font-bold animate-bounce">
                        Perfect! 🎉
                    </div>
                )}

                {feedback === 'error' && (
                    <div className="text-red-600 dark:text-red-400 text-sm">
                        Try again! Close, but needs more practice.
                    </div>
                )}

                {permissionError && (
                    <div className="w-full text-center p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 dark:bg-rose-900/20 dark:border-rose-800/50 dark:text-rose-400 text-sm font-medium">
                        Microphone access denied or browser unsupported. Please use Chrome.
                    </div>
                )}

                <button
                    onClick={startListening}
                    disabled={isListening}
                    className={`relative flex items-center justify-center gap-3 px-8 py-5 rounded-[2rem] font-bold text-lg md:text-xl transition-all shadow-lg active:scale-95 min-w-[200px] overflow-hidden ${isListening
                            ? 'bg-rose-500 text-white shadow-rose-500/30'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30 hover:shadow-blue-600/40'
                        }`}
                >
                    {isListening && (
                        <span className="absolute inset-0 bg-white/20 animate-ping rounded-[2rem]"></span>
                    )}
                    <span className="text-2xl relative z-10">{isListening ? '🛑' : '🎤'}</span>
                    <span className="relative z-10">{isListening ? 'Listening...' : 'Speak Now'}</span>
                </button>
            </div>
        </div>
    );
}
