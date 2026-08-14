'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2 } from 'lucide-react';

interface PronunciationCoachProps {
    targetText: string;
    onSuccess?: () => void;
}

export default function PronunciationCoach({ targetText, onSuccess }: PronunciationCoachProps) {
    const [isListening, setIsListening] = useState(false);
    const [spokenText, setSpokenText] = useState('');
    const [feedback, setFeedback] = useState<'neutral' | 'success' | 'error'>('neutral');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const recognitionRef = useRef<any>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    const speakReference = () => {
        if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        setIsPlayingAudio(true);
        const utterance = new SpeechSynthesisUtterance(targetText);
        utterance.lang = 'de-DE';
        utterance.rate = 0.8;
        utteranceRef.current = utterance;
        utterance.onend = () => {
            setIsPlayingAudio(false);
            utteranceRef.current = null;
        };
        utterance.onerror = () => {
            setIsPlayingAudio(false);
            utteranceRef.current = null;
        };
        window.speechSynthesis.speak(utterance);
    };

    const checkPronunciation = useCallback((transcript: string) => {
        // Strip German articles and punctuation for flexible root matching
        const cleanArticles = (text: string) => 
            text.toLowerCase()
                .replace(/\b(der|die|das|ein|eine|einen|einem|einer|eines|den|dem|des)\b/gi, '')
                .replace(/[^\w\säöüß]/gi, '')
                .trim();

        const normalize = (text: string) => text.toLowerCase().replace(/[^\w\säöüß]/gi, "").trim();

        const normalizedTarget = normalize(targetText);
        const normalizedSpoken = normalize(transcript);
        const rootTarget = cleanArticles(targetText);
        const rootSpoken = cleanArticles(transcript);

        if (!normalizedTarget || !normalizedSpoken) {
            setFeedback('neutral');
            return;
        }

        const isExactMatch = normalizedTarget === normalizedSpoken;
        const isContainsMatch = normalizedTarget.length > 2 && normalizedSpoken.includes(normalizedTarget);
        const isRootMatch = rootTarget.length > 2 && (rootTarget === rootSpoken || rootSpoken.includes(rootTarget));

        if (isExactMatch || isContainsMatch || isRootMatch) {
            setFeedback('success');
            setErrorMessage(null);
            if (onSuccess) onSuccess();
        } else {
            setFeedback('error');
        }
    }, [targetText, onSuccess]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (SpeechRecognitionClass) {
                recognitionRef.current = new SpeechRecognitionClass();
                recognitionRef.current.continuous = false;
                recognitionRef.current.lang = 'de-DE';
                recognitionRef.current.interimResults = false;

                recognitionRef.current.onresult = (event: any) => {
                    const transcript = event.results[0][0].transcript;
                    setSpokenText(transcript);
                    checkPronunciation(transcript);
                    setIsListening(false);
                };

                recognitionRef.current.onerror = (event: any) => {
                    console.error('Speech recognition error', event.error);
                    switch (event.error) {
                        case 'not-allowed':
                        case 'permission-denied':
                            setErrorMessage('Microphone access denied. Please allow microphone permission in your browser.');
                            break;
                        case 'no-speech':
                            setErrorMessage('No speech detected. Please try speaking closer to the microphone.');
                            break;
                        case 'network':
                            setErrorMessage('Network connection error during voice recognition.');
                            break;
                        case 'audio-capture':
                            setErrorMessage('No microphone detected on your device.');
                            break;
                        default:
                            setErrorMessage('Speech recognition note: ' + event.error);
                    }
                    setIsListening(false);
                };

                recognitionRef.current.onend = () => {
                    setIsListening(false);
                };
            }
        }

        return () => {
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.abort();
                } catch {}
            }
        };
    }, [checkPronunciation]);

    const startListening = () => {
        setFeedback('neutral');
        setSpokenText('');
        setErrorMessage(null);
        if (recognitionRef.current) {
            try {
                recognitionRef.current.start();
                setIsListening(true);
            } catch (error) {
                console.error('Failed to start recognition', error);
                setIsListening(false);
            }
        } else {
            setErrorMessage('Speech recognition is not supported in this browser. Please use Google Chrome or Edge.');
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

                {/* Reference Audio Listen Button */}
                <button
                    onClick={speakReference}
                    disabled={isPlayingAudio}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 font-bold text-sm transition-colors"
                    title="Listen to native German pronunciation"
                    aria-label="Listen reference pronunciation"
                >
                    <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-pulse' : ''}`} />
                    <span>{isPlayingAudio ? 'Playing...' : 'Listen Reference'}</span>
                </button>

                {spokenText && (
                    <div className={`text-lg font-medium px-4 py-2 rounded-lg ${feedback === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                            feedback === 'error' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                'bg-slate-100 text-slate-700'
                        }`}>
                        &ldquo;{spokenText}&rdquo;
                    </div>
                )}

                {feedback === 'success' && (
                    <div className="text-green-600 dark:text-green-400 font-bold animate-bounce">
                        Perfect! 🎉
                    </div>
                )}

                {feedback === 'error' && (
                    <div className="text-red-600 dark:text-red-400 text-sm">
                        Try again! Listen to the reference and speak clearly.
                    </div>
                )}

                {errorMessage && (
                    <div className="w-full text-center p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 dark:bg-rose-950/20 dark:border-rose-800/50 dark:text-rose-400 text-sm font-medium">
                        {errorMessage}
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
