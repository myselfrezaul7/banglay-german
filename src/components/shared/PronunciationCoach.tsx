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
            alert('Your browser does not support speech recognition. Try Chrome or Safari.');
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
        <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col items-center gap-4">
                <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Pronunciation Coach 🎙️
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
                    <div className="text-red-500 text-xs">
                        Microphone access denied. Please allow it in browser settings.
                    </div>
                )}

                <button
                    onClick={startListening}
                    disabled={isListening}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all shadow-lg ${isListening
                            ? 'bg-red-500 text-white animate-pulse'
                            : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105'
                        }`}
                >
                    <span className="text-xl">{isListening ? '🛑' : '🎤'}</span>
                    {isListening ? 'Listening...' : 'Speak Now'}
                </button>
            </div>
        </div>
    );
}
