import React, { useState } from 'react';
import { User, Bell, TrendingUp, AlertCircle, Calendar, DollarSign, CheckCircle, XCircle } from 'lucide-react';

const ParentDashboard = () => {
    // Mock child data - in real app, might select between multiple children
    const child = {
        name: "Alex Doe",
        class: "Class 10-A",
        attendance: 92,
        gpa: 3.5,
        feesDue: 150
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-brown-900 flex items-center gap-3">
                        <div className="p-2 bg-cream-200 rounded-lg">
                            <User className="text-primary" size={28} />
                        </div>
                        Parent Dashboard
                    </h1>
                    <p className="text-brown-600 mt-1">Overview for <span className="font-bold text-primary">{child.name}</span> ({child.class})</p>
                </div>

                {/* Child Selector (Mock) */}
                <select className="bg-white border-2 border-brown-200 text-brown-700 font-semibold text-sm rounded-lg px-4 py-2 outline-none focus:border-primary transition-all cursor-pointer">
                    <option>Alex Doe (Class 10-A)</option>
                    <option>Emma Doe (Class 6-B)</option>
                </select>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-brown-200 p-6 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${child.attendance >= 90 ? 'bg-green-50' : 'bg-amber-50'}`}>
                            {child.attendance >= 90 ? <CheckCircle className="text-green-600" size={24} /> : <AlertCircle className="text-amber-600" size={24} />}
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${child.attendance >= 90 ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                            {child.attendance >= 90 ? 'Excellent' : 'Needs Attention'}
                        </span>
                    </div>
                    <p className="text-brown-500 text-sm font-medium">Attendance Rate</p>
                    <p className="text-3xl font-bold text-brown-900 mt-1">{child.attendance}%</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-brown-200 p-6 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                            <TrendingUp className="text-blue-600" size={24} />
                        </div>
                        <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-full">Top 20%</span>
                    </div>
                    <p className="text-brown-500 text-sm font-medium">Academic Performance (GPA)</p>
                    <p className="text-3xl font-bold text-brown-900 mt-1">{child.gpa}</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-brown-200 p-6 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                            <DollarSign className="text-red-600" size={24} />
                        </div>
                        <span className="text-xs font-bold bg-red-50 text-red-600 px-2 py-1 rounded-full">Due Now</span>
                    </div>
                    <p className="text-brown-500 text-sm font-medium">Fees Due</p>
                    <p className="text-3xl font-bold text-brown-900 mt-1">${child.feesDue}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Results */}
                <div className="bg-white rounded-xl border border-brown-200 shadow-sm p-6">
                    <h2 className="text-xl font-bold text-brown-900 mb-4 flex items-center gap-2">
                        <TrendingUp size={20} className="text-green-500" />
                        Recent Results
                    </h2>
                    <div className="space-y-4">
                        {[
                            { subject: 'Mathematics', score: 87, grade: 'A', date: 'First Term' },
                            { subject: 'English Language', score: 81, grade: 'A', date: 'First Term' },
                            { subject: 'Basic Science', score: 67, grade: 'B', date: 'First Term' },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-cream-50 rounded-lg border border-brown-100">
                                <div>
                                    <p className="font-bold text-brown-900">{item.subject}</p>
                                    <p className="text-xs text-brown-500">{item.date}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`text-sm font-bold px-2 py-1 rounded-full ${item.grade === 'A' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                        Grade {item.grade}
                                    </span>
                                    <p className="text-xs text-brown-400 mt-1">{item.score}/100</p>
                                </div>
                            </div>
                        ))}
                        <button className="w-full mt-2 text-primary font-bold text-sm hover:underline">View Full Report Card</button>
                    </div>
                </div>

                {/* Attendance Alerts */}
                <div className="bg-white rounded-xl border border-brown-200 shadow-sm p-6">
                    <h2 className="text-xl font-bold text-brown-900 mb-4 flex items-center gap-2">
                        <AlertCircle size={20} className="text-amber-500" />
                        Attendance Alerts (Last 30 Days)
                    </h2>
                    <div className="space-y-4">
                        {[
                            { date: 'Jan 12, 2026', status: 'Late', time: '09:15 AM', type: 'Late Arrival' },
                            { date: 'Jan 08, 2026', status: 'Absent', time: '-', type: 'Medical (Excused)' },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-cream-50 rounded-lg border border-brown-100">
                                <div>
                                    <p className="font-bold text-brown-900">{item.date}</p>
                                    <p className="text-xs text-brown-500">{item.type}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.status === 'Absent' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                                        {item.status}
                                    </span>
                                    {item.time !== '-' && <p className="text-xs text-brown-400 mt-1">{item.time}</p>}
                                </div>
                            </div>
                        ))}
                        {[].length === 0 && <p className="text-brown-500 text-sm">No recent attendance issues.</p>}
                    </div>
                </div>

                {/* Upcoming Events */}
                <div className="bg-white rounded-xl border border-brown-200 shadow-sm p-6 lg:col-span-2">
                    <h2 className="text-xl font-bold text-brown-900 mb-4 flex items-center gap-2">
                        <Calendar size={20} className="text-primary" />
                        Upcoming Events
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { title: 'Parent-Teacher Meeting', date: 'Jan 25, 2026', type: 'Meeting' },
                            { title: 'Annual Sports Day', date: 'Feb 15, 2026', type: 'Event' },
                            { title: 'Science Fair', date: 'Feb 28, 2026', type: 'Exhibition' },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-3 bg-cream-50 rounded-lg border border-brown-100">
                                <div className="bg-white p-2 rounded-lg border border-brown-100 shadow-sm min-w-[60px] text-center">
                                    <p className="text-xs text-red-500 font-bold uppercase">{item.date.split(' ')[0]}</p>
                                    <p className="text-lg font-bold text-brown-900">{item.date.split(' ')[1].replace(',', '')}</p>
                                </div>
                                <div>
                                    <p className="font-bold text-brown-900">{item.title}</p>
                                    <span className="text-xs bg-cream-200 text-primary px-2 py-0.5 rounded-full font-medium">{item.type}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ParentDashboard;
