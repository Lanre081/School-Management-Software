import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Monitor, Clock, Calendar, AlertCircle,
    Play, CheckCircle2, Lock, ChevronRight,
    Search, Filter
} from 'lucide-react';
import clsx from 'clsx';

const StudentCbtList = () => {
    // Mock CBT Exams
    const [exams] = useState([
        {
            id: 1,
            name: 'Mathematics First Term CBT',
            subject: 'Mathematics',
            duration: 40,
            questions: 20,
            status: 'active', // 'active', 'upcoming', 'completed'
            startTime: '10:00 AM',
            date: 'Today',
            color: 'from-blue-500 to-indigo-600'
        },
        {
            id: 2,
            name: 'English Language Quiz',
            subject: 'English',
            duration: 30,
            questions: 15,
            status: 'upcoming',
            startTime: '2:00 PM',
            date: 'Tomorrow',
            color: 'from-amber-500 to-orange-600'
        },
        {
            id: 3,
            name: 'Biology Mid-Term CBT',
            subject: 'Biology',
            duration: 60,
            questions: 40,
            status: 'completed',
            startTime: 'Finished',
            date: 'Yesterday',
            score: '85/100',
            color: 'from-emerald-500 to-teal-600'
        }
    ]);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'active':
                return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest animate-pulse">Live Now</span>;
            case 'upcoming':
                return <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">Upcoming</span>;
            case 'completed':
                return <span className="bg-brown-100 text-brown-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">Completed</span>;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-brown-900 flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-primary to-primary-dark rounded-xl text-white shadow-lg">
                            <Monitor size={28} />
                        </div>
                        CBT Examinations
                    </h1>
                    <p className="text-brown-600 mt-1 ml-14 font-medium uppercase text-xs tracking-[0.2em]">Computer-Based Testing Portal</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search exams..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-brown-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <button className="p-2 bg-white border border-brown-200 rounded-xl text-brown-600 hover:bg-cream-50 transition-all">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {/* Live Exam Banner */}
            <div className="bg-gradient-to-r from-brown-900 via-brown-800 to-brown-900 rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl border border-brown-700">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -ml-32 -mb-32"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-ping"></div>
                            <span className="text-green-400 font-black text-sm uppercase tracking-[0.3em]">System Online</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">Mathematics <br /><span className="text-primary-lighter">Term Assessment</span></h2>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-cream-200/80 font-bold uppercase text-xs tracking-widest">
                            <div className="flex items-center gap-2"><Clock size={16} className="text-primary-lighter" /> 40 Minutes</div>
                            <div className="flex items-center gap-2"><AlertCircle size={16} className="text-primary-lighter" /> 20 Questions</div>
                            <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary-lighter" /> Auto-Marked</div>
                        </div>
                    </div>

                    <Link
                        to="/student/exam/1"
                        className="group flex items-center gap-4 bg-primary text-white px-10 py-5 rounded-2xl font-black text-xl shadow-xl hover:bg-white hover:text-primary transition-all hover:scale-105 active:scale-95"
                    >
                        START EXAM NOW
                        <div className="w-10 h-10 bg-white/20 group-hover:bg-primary/10 rounded-xl flex items-center justify-center transition-all">
                            <Play size={24} fill="currentColor" />
                        </div>
                    </Link>
                </div>
            </div>

            {/* Exam Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Available & Upcoming */}
                <div className="space-y-6">
                    <h3 className="text-sm font-black text-brown-500 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Clock size={18} /> Available & Upcoming
                    </h3>

                    <div className="space-y-4">
                        {exams.filter(e => e.status !== 'completed').map(exam => (
                            <div key={exam.id} className="bg-white rounded-3xl p-6 border border-brown-200 shadow-sm hover:shadow-xl hover:translate-x-1 transition-all group relative overflow-hidden">
                                <div className={clsx(
                                    "absolute top-0 left-0 w-2 h-full bg-gradient-to-b",
                                    exam.color
                                )}></div>

                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-cream-100 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                            <Monitor size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-brown-900 text-lg">{exam.name}</h4>
                                            <p className="text-xs text-brown-400 font-bold uppercase tracking-widest">{exam.subject}</p>
                                        </div>
                                    </div>
                                    {getStatusBadge(exam.status)}
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-brown-50">
                                    <div className="flex items-center gap-6">
                                        <div className="text-center">
                                            <p className="text-[10px] font-black text-brown-400 uppercase tracking-widest mb-1">Duration</p>
                                            <p className="text-sm font-black text-brown-700">{exam.duration}m</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[10px] font-black text-brown-400 uppercase tracking-widest mb-1">Time</p>
                                            <p className="text-sm font-black text-brown-700">{exam.startTime}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[10px] font-black text-brown-400 uppercase tracking-widest mb-1">Date</p>
                                            <p className="text-sm font-black text-brown-700">{exam.date}</p>
                                        </div>
                                    </div>

                                    {exam.status === 'active' ? (
                                        <Link
                                            to={`/student/exam/${exam.id}`}
                                            className="p-3 bg-brown-900 text-white rounded-xl hover:bg-black transition-all shadow-lg"
                                        >
                                            <ChevronRight size={20} />
                                        </Link>
                                    ) : (
                                        <div className="p-3 bg-cream-50 text-brown-300 rounded-xl border border-brown-100 cursor-not-allowed">
                                            <Lock size={20} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* History */}
                <div className="space-y-6">
                    <h3 className="text-sm font-black text-brown-500 uppercase tracking-[0.2em] flex items-center gap-2">
                        <CheckCircle2 size={18} /> Examination History
                    </h3>

                    <div className="space-y-4">
                        {exams.filter(e => e.status === 'completed').map(exam => (
                            <div key={exam.id} className="bg-cream-50/50 rounded-3xl p-6 border border-brown-100 hover:bg-white transition-all group">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-white rounded-2xl text-brown-400 border border-brown-100 shadow-sm">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-brown-800 text-lg opacity-70 group-hover:opacity-100 transition-opacity">{exam.name}</h4>
                                            <p className="text-xs text-brown-400 font-bold uppercase tracking-widest">{exam.subject} • {exam.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-brown-400 uppercase tracking-widest mb-1">Score</p>
                                        <p className="text-xl font-black text-primary">{exam.score}</p>
                                    </div>
                                </div>
                                <button className="w-full py-3 text-sm font-bold text-brown-600 hover:text-primary transition-all border-t border-brown-100 flex items-center justify-center gap-2">
                                    View Performance Analysis &rarr;
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="p-8 bg-white rounded-[2rem] border border-brown-200 shadow-inner text-center">
                        <AlertCircle className="text-amber-500 mx-auto mb-4" size={32} />
                        <h4 className="font-bold text-brown-900 mb-2">Need a reset?</h4>
                        <p className="text-xs text-brown-500 font-medium leading-relaxed">
                            If you experienced technical issues during an exam, please contact your administrator for a session reset.
                        </p>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out forwards;
                }
            ` }} />
        </div>
    );
};

export default StudentCbtList;
