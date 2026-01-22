import React from 'react';
import { LayoutDashboard, GraduationCap, Clock, Calendar, TrendingUp, BookOpen, AlertCircle } from 'lucide-react';

const StudentDashboard = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-brown-900 flex items-center gap-3">
                <div className="p-2 bg-cream-200 rounded-lg">
                    <LayoutDashboard className="text-primary" size={28} />
                </div>
                Student Dashboard
            </h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-brown-200 p-6 hover:shadow-lg transition-all group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Clock className="text-green-600" size={24} />
                        </div>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">Good</span>
                    </div>
                    <p className="text-brown-500 text-sm font-medium">Attendance</p>
                    <p className="text-3xl font-bold text-brown-900 mt-1">95%</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-brown-200 p-6 hover:shadow-lg transition-all group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <GraduationCap className="text-blue-600" size={24} />
                        </div>
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">GPA 3.8</span>
                    </div>
                    <p className="text-brown-500 text-sm font-medium">Overall Grade</p>
                    <p className="text-3xl font-bold text-brown-900 mt-1">A</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-brown-200 p-6 hover:shadow-lg transition-all group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <AlertCircle className="text-amber-600" size={24} />
                        </div>
                        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Pending</span>
                    </div>
                    <p className="text-brown-500 text-sm font-medium">Assignments Due</p>
                    <p className="text-3xl font-bold text-brown-900 mt-1">4</p>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming */}
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Today's Schedule */}
                    <div className="bg-white rounded-xl border border-brown-200 shadow-sm p-6">
                        <h2 className="text-xl font-bold text-brown-900 mb-4 flex items-center gap-2">
                            <Clock size={20} className="text-brown-500" />
                            Today's Classes
                        </h2>
                        <div className="space-y-3">
                            {[
                                { time: '09:00 AM', subject: 'Mathematics', room: '101' },
                                { time: '10:00 AM', subject: 'English', room: '102' },
                                { time: '11:00 AM', subject: 'Science', room: '201' },
                            ].map((cls, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-cream-50 rounded-lg border border-brown-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-cream-100 flex items-center justify-center text-primary font-bold text-xs">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <p className="font-bold text-brown-900 text-sm">{cls.subject}</p>
                                            <p className="text-xs text-brown-500">Room {cls.room}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-semibold text-brown-500 bg-white border border-brown-100 px-2 py-1 rounded-full">
                                        {cls.time}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Exams */}
                    <div className="bg-white rounded-xl border border-brown-200 shadow-sm p-6">
                        <h2 className="text-xl font-bold text-brown-900 mb-4 flex items-center gap-2">
                            <Calendar size={20} className="text-brown-500" />
                            Upcoming Exams
                        </h2>
                        <div className="space-y-4">
                            {[
                                { subject: 'Mathematics', date: 'Tomorrow', type: 'Mid-Term', color: 'text-red-500 bg-red-50' },
                                { subject: 'Science', date: 'Jan 15', type: 'Quiz', color: 'text-blue-600 bg-blue-50' },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-cream-50 rounded-lg border border-brown-100 hover:bg-cream-100 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-brown-100">
                                            <BookOpen size={18} className="text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-brown-900">{item.subject}</p>
                                            <p className="text-xs text-brown-500">{item.type}</p>
                                        </div>
                                    </div>
                                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${item.color}`}>
                                        {item.date}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Performance */}
                <div className="space-y-6">
                    {/* Recent Performance */}
                    <div className="bg-gradient-to-br from-brown-50 to-cream-100 rounded-xl border border-brown-200 p-6">
                        <h2 className="text-xl font-bold text-brown-900 mb-4 flex items-center gap-2">
                            <TrendingUp size={20} className="text-primary" />
                            Performance Insight
                        </h2>
                        <div className="bg-white/60 rounded-xl p-4 backdrop-blur-sm border border-brown-100">
                            <p className="text-brown-800 font-medium mb-2">You're doing great!</p>
                            <p className="text-sm text-brown-600 leading-relaxed">
                                Your attendance is improving and you've maintained an A grade average in Science and Math.
                                Keep an eye on History assignments for next week.
                            </p>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <div className="bg-white p-3 rounded-lg shadow-sm border border-brown-100">
                                <p className="text-xs text-brown-500">Best Subject</p>
                                <p className="font-bold text-primary">Computer Science</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg shadow-sm border border-brown-100">
                                <p className="text-xs text-brown-500">Focus Area</p>
                                <p className="font-bold text-amber-600">History</p>
                            </div>
                        </div>
                    </div>

                    {/* Latest Announcement Widget */}
                    <div className="bg-white rounded-xl border border-brown-200 shadow-sm p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                        <h2 className="text-xl font-bold text-brown-900 mb-4 relative z-10 flex items-center gap-2">
                            <AlertCircle size={20} className="text-red-500" />
                            Latest Notice
                        </h2>
                        <div className="relative z-10">
                            <p className="font-bold text-brown-900 mb-1">Winter Break</p>
                            <p className="text-sm text-brown-600 line-clamp-2 mb-3">
                                School will remain closed from Dec 20 to Jan 5 for winter break. Classes resume on Jan 6th.
                            </p>
                            <button className="text-sm text-red-600 font-medium hover:text-red-700">Read More &rarr;</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
