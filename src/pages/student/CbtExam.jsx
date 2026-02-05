import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Clock, ChevronLeft, ChevronRight, Send,
    AlertCircle, CheckCircle2, Layout, BookOpen,
    User, HelpCircle, ShieldAlert
} from 'lucide-react';
import clsx from 'clsx';

const CbtExam = () => {
    const { examId } = useParams();
    const navigate = useNavigate();

    // Mock Exam Data
    const [exam, setExam] = useState({
        id: 1,
        name: 'First Term Mathematics CBT',
        subject: 'Mathematics',
        duration: 40, // minutes
        totalMarks: 100,
        questions: [
            {
                id: 1,
                question: "Solve for x: 2x + 5 = 15",
                type: 'mcq',
                options: ["x = 5", "x = 10", "x = 7.5", "x = 15"],
                correctAnswer: "x = 5"
            },
            {
                id: 2,
                question: "What is the square root of 144?",
                type: 'mcq',
                options: ["10", "11", "12", "13"],
                correctAnswer: "12"
            },
            {
                id: 3,
                question: "A triangle with all sides equal is called:",
                type: 'mcq',
                options: ["Isosceles", "Scalene", "Equilateral", "Right-angled"],
                correctAnswer: "Equilateral"
            },
            {
                id: 4,
                question: "The sum of angles in a quadrilateral is 360 degrees.",
                type: 'tf',
                options: ["True", "False"],
                correctAnswer: "True"
            },
            {
                id: 5,
                question: "What is 15% of 200?",
                type: 'mcq',
                options: ["20", "25", "30", "35"],
                correctAnswer: "30"
            }
        ]
    });

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(exam.duration * 60);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [violations, setViolations] = useState(0);

    // Timer Logic
    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmit();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    // Format Time
    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    // Rule Enforcement: Detection of tab switching/blur
    useEffect(() => {
        const handleBlur = () => {
            setViolations(prev => {
                const newCount = prev + 1;
                if (newCount >= 3) {
                    alert("Multiple violations detected. Your exam will be automatically submitted.");
                    handleSubmit();
                } else {
                    alert(`Warning: Tab switching/Page exit detected (${newCount}/3). Continuing will lead to auto-submission.`);
                }
                return newCount;
            });
        };

        window.addEventListener('blur', handleBlur);

        // Prevent Right Click
        const handleContextMenu = (e) => e.preventDefault();
        document.addEventListener('contextmenu', handleContextMenu);

        // Prevent Refresh Warning
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('blur', handleBlur);
            document.removeEventListener('contextmenu', handleContextMenu);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const handleAnswerSelect = (questionId, option) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: option
        }));
        // Auto-save logic would go here (e.g., API call)
    };

    const handleSubmit = useCallback(() => {
        setIsSubmitted(true);
        setShowSubmitModal(false);
        // In a real app, send final answers to backend here
    }, []);

    const currentQuestion = exam.questions[currentQuestionIndex];
    const answeredCount = Object.keys(answers).length;
    const progress = (answeredCount / exam.questions.length) * 100;

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-cream-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center border border-brown-200">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="text-green-600" size={40} />
                    </div>
                    <h2 className="text-3xl font-black text-brown-900 mb-4">Exam Submitted Successfully!</h2>
                    <p className="text-brown-600 mb-8 leading-relaxed">
                        Your answers have been recorded and auto-marked. Your final results will be released based on the administrator's settings.
                    </p>
                    <div className="bg-cream-50 rounded-2xl p-6 border border-brown-100 mb-8">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-brown-500 font-bold uppercase text-xs tracking-widest">Marking Status</span>
                            <span className="text-green-600 font-bold text-sm">Completed</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-brown-500 font-bold uppercase text-xs tracking-widest">Submission Time</span>
                            <span className="text-brown-900 font-bold text-sm">{new Date().toLocaleTimeString()}</span>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/student')}
                        className="w-full bg-primary text-white py-4 rounded-xl font-black text-lg shadow-xl hover:bg-primary-dark transition-all"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream-100 flex flex-col font-sans">
            {/* JAMB-Style Top Header */}
            <header className="bg-brown-900 text-white p-4 sticky top-0 z-50 shadow-lg border-b border-primary/30">
                <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary rounded-xl shadow-inner">
                            <BookOpen size={24} className="text-cream-100" />
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-tight">{exam.name}</h1>
                            <p className="text-xs text-cream-300/60 font-bold uppercase tracking-[0.2em]">{exam.subject}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex flex-col items-center">
                            <div className={clsx(
                                "flex items-center gap-2 px-6 py-2 rounded-2xl border-2 font-black transition-all",
                                timeLeft < 300 ? "border-red-500 text-red-500 animate-pulse bg-red-500/10" : "border-primary/50 text-primary-lighter bg-primary/20"
                            )}>
                                <Clock size={20} />
                                <span className="text-2xl font-mono">{formatTime(timeLeft)}</span>
                            </div>
                            <span className="text-[10px] font-bold text-cream-400 mt-1 uppercase tracking-widest">Remaining Time</span>
                        </div>

                        <div className="hidden lg:flex items-center gap-3 pl-8 border-l border-brown-700">
                            <div className="w-10 h-10 rounded-full bg-primary/30 border border-primary/50 flex items-center justify-center">
                                <User size={20} className="text-cream-300" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-black text-white">Student User</p>
                                <p className="text-[10px] font-bold text-cream-400 uppercase tracking-widest">ADM/2025/001</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex-1 max-w-[1600px] mx-auto w-full p-4 lg:p-6 flex flex-col lg:flex-row gap-6 overflow-hidden">
                {/* Left Panel: Question Area */}
                <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
                    {/* Progress Bar */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-brown-200">
                        <div className="flex justify-between items-center mb-3">
                            <p className="text-sm font-black text-brown-700 uppercase tracking-widest">Question {currentQuestionIndex + 1} of {exam.questions.length}</p>
                            <p className="text-sm font-black text-primary uppercase tracking-widest">{answeredCount} Answered</p>
                        </div>
                        <div className="h-3 bg-cream-200 rounded-full overflow-hidden border border-brown-100 shadow-inner">
                            <div
                                className="h-full bg-gradient-to-r from-primary to-primary-light transition-all duration-500 ease-out shadow-lg"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Question Card */}
                    <div className="bg-white rounded-3xl shadow-xl border border-brown-200 overflow-hidden flex-1 relative flex flex-col">
                        <div className="p-8 lg:p-12 flex-1">
                            <div className="bg-cream-50 rounded-2xl p-6 mb-8 border border-brown-100 flex items-start gap-4">
                                <div className="p-3 bg-primary text-white rounded-xl shadow-lg ring-4 ring-primary/10 shrink-0">
                                    <HelpCircle size={24} />
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold text-brown-900 leading-relaxed pt-1">
                                    {currentQuestion.question}
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {currentQuestion.options.map((option, idx) => {
                                    const optionLabel = String.fromCharCode(65 + idx); // A, B, C, D
                                    const isSelected = answers[currentQuestion.id] === option;

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                                            className={clsx(
                                                "group flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left relative overflow-hidden",
                                                isSelected
                                                    ? "bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-[1.02] z-10"
                                                    : "bg-white text-brown-800 border-brown-100 hover:border-primary/30 hover:bg-cream-50"
                                            )}
                                        >
                                            <span className={clsx(
                                                "w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg transition-colors border shadow-sm",
                                                isSelected
                                                    ? "bg-white text-primary border-white"
                                                    : "bg-cream-100 text-brown-500 border-brown-200 group-hover:bg-primary/10 group-hover:text-primary"
                                            )}>
                                                {optionLabel}
                                            </span>
                                            <span className="text-lg font-bold flex-1">{option}</span>
                                            {isSelected && (
                                                <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Question footer navigation */}
                        <div className="p-6 bg-cream-50 border-t border-brown-100 flex justify-between items-center">
                            <button
                                disabled={currentQuestionIndex === 0}
                                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                                className="flex items-center gap-2 px-8 py-3 rounded-xl font-black text-brown-600 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronLeft size={20} /> Previous
                            </button>

                            {currentQuestionIndex === exam.questions.length - 1 ? (
                                <button
                                    onClick={() => setShowSubmitModal(true)}
                                    className="flex items-center gap-3 px-10 py-4 bg-brown-900 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-black hover:scale-105 active:scale-95 transition-all"
                                >
                                    Finish & Submit <Send size={20} />
                                </button>
                            ) : (
                                <button
                                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                                    className="flex items-center gap-2 px-10 py-4 bg-primary text-white rounded-2xl font-black text-lg shadow-xl hover:bg-primary-dark hover:translate-x-1 active:scale-95 transition-all"
                                >
                                    Next <ChevronRight size={20} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Panel: Navigation Grid */}
                <div className="w-full lg:w-96 flex flex-col gap-6">
                    <div className="bg-white rounded-3xl shadow-xl border border-brown-200 p-6 flex flex-col h-full lg:max-h-[calc(100vh-140px)]">
                        <div className="flex items-center gap-2 mb-6 border-b border-brown-100 pb-4">
                            <Layout className="text-primary" size={20} />
                            <h3 className="font-black text-brown-900 uppercase tracking-widest text-sm">Question Map</h3>
                        </div>

                        <div className="grid grid-cols-5 md:grid-cols-10 lg:grid-cols-5 gap-3 mb-8 overflow-y-auto pr-2 custom-scrollbar">
                            {exam.questions.map((q, idx) => {
                                const isAnswered = !!answers[q.id];
                                const isCurrent = currentQuestionIndex === idx;

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentQuestionIndex(idx)}
                                        className={clsx(
                                            "aspect-square rounded-xl font-black text-sm flex items-center justify-center transition-all border-2",
                                            isCurrent
                                                ? "bg-primary text-white border-primary shadow-lg shadow-primary/30 scale-110 z-10"
                                                : isAnswered
                                                    ? "bg-primary-lighter text-primary-dark border-primary/20 hover:border-primary"
                                                    : "bg-cream-100 text-brown-400 border-brown-100 hover:border-brown-300"
                                        )}
                                    >
                                        {idx + 1}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-auto pt-6 border-t border-brown-100 space-y-3">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                                <div className="w-4 h-4 bg-primary rounded-md"></div>
                                <span className="text-brown-500">Current</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                                <div className="w-4 h-4 bg-primary-lighter rounded-md"></div>
                                <span className="text-brown-500">Answered</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                                <div className="w-4 h-4 bg-cream-100 rounded-md"></div>
                                <span className="text-brown-500">Unanswered</span>
                            </div>

                            <div className="mt-8 p-4 bg-red-50 rounded-2xl border border-red-100">
                                <div className="flex items-center gap-2 text-red-600 mb-1">
                                    <ShieldAlert size={16} />
                                    <span className="font-black text-[10px] uppercase tracking-widest">Integrity Monitoring</span>
                                </div>
                                <p className="text-[10px] text-red-600/70 font-bold leading-tight uppercase">
                                    Violations: {violations}/3. Tab switching is strictly prohibited.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showSubmitModal && (
                <div className="fixed inset-0 bg-brown-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-fadeIn">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full border border-brown-200">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                            <AlertCircle className="text-primary" size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-brown-900 mb-2">Final Submission</h3>
                        <p className="text-brown-600 mb-6 leading-relaxed">
                            Are you sure you want to end this exam? You have answered <b>{answeredCount}</b> out of <b>{exam.questions.length}</b> questions.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowSubmitModal(false)}
                                className="flex-1 px-6 py-4 rounded-2xl font-black text-brown-500 hover:bg-cream-100 transition-all border border-brown-100"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="flex-1 px-6 py-4 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all"
                            >
                                Confirm Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #F5E6D3;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #E6CCB2;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            ` }} />
        </div>
    );
};

export default CbtExam;
