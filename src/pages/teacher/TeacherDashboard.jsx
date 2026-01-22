import React from 'react';
import { LayoutDashboard, BookOpen, CheckCircle, FileText, Clock, Plus, MessageSquare, Bell } from 'lucide-react';


const TeacherDashboard = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-brown-900 flex items-center gap-3">
                <div className="p-2 bg-cream-200 rounded-lg">
                    <LayoutDashboard className="text-primary" size={28} />
                </div>
                Teacher Dashboard
            </h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-brown-200 p-6 hover:shadow-lg transition-all group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <BookOpen className="text-blue-600" size={24} />
                        </div>
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Active</span>
                    </div>
                    <p className="text-brown-500 text-sm font-medium">My Classes</p>
                    <p className="text-3xl font-bold text-brown-900 mt-1">5</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-brown-200 p-6 hover:shadow-lg transition-all group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <CheckCircle className="text-green-600" size={24} />
                        </div>
                        <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">Today</span>
                    </div>
                    <p className="text-brown-500 text-sm font-medium">Attendance Pending</p>
                    <p className="text-3xl font-bold text-brown-900 mt-1">2 Classes</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-brown-200 p-6 hover:shadow-lg transition-all group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <FileText className="text-purple-600" size={24} />
                        </div>
                        <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">Action Needed</span>
                    </div>
                    <p className="text-brown-500 text-sm font-medium">Pending Grades</p>
                    <p className="text-3xl font-bold text-brown-900 mt-1">12</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-brown-200 p-6 hover:shadow-lg transition-all group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <MessageSquare className="text-yellow-600" size={24} />
                        </div>
                        <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">New</span>
                    </div>
                    <p className="text-brown-500 text-sm font-medium">Unread Messages</p>
                    <p className="text-3xl font-bold text-brown-900 mt-1">3</p>
                </div>
            </div>

            {/* Recent Activity / Schedule Mockup */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-brown-200 shadow-sm p-6">
                    <h2 className="text-xl font-bold text-brown-900 mb-4 flex items-center gap-2">
                        <Clock size={20} className="text-brown-500" />
                        Today's Schedule
                    </h2>
                    <div className="space-y-4">
                        {[
                            { time: '09:00 AM', class: 'Class 10-A', subject: 'Mathematics', room: '101' },
                            { time: '11:00 AM', class: 'Class 9-B', subject: 'Mathematics', room: '202' },
                            { time: '02:00 PM', class: 'Class 10-B', subject: 'Mathematics', room: '102' },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-cream-50 rounded-lg border border-brown-100">
                                <div>
                                    <p className="font-bold text-brown-900">{item.class} - {item.subject}</p>
                                    <p className="text-sm text-brown-500">Room {item.room}</p>
                                </div>
                                <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                    {item.time}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-gradient-to-br from-brown-50 to-cream-100 rounded-xl border border-brown-200 p-6">
                        <h2 className="text-xl font-bold text-brown-900 mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="bg-white hover:bg-primary hover:text-white text-brown-700 p-4 rounded-xl font-medium transition-all shadow-sm hover:shadow-md flex flex-col items-center gap-2">
                                <Plus size={24} />
                                Create Assignment
                            </button>
                            <button className="bg-white hover:bg-primary hover:text-white text-brown-700 p-4 rounded-xl font-medium transition-all shadow-sm hover:shadow-md flex flex-col items-center gap-2">
                                <CheckCircle size={24} />
                                Mark Attendance
                            </button>
                        </div>
                    </div>

                    {/* Announcements */}
                    <div className="bg-white rounded-xl border border-brown-200 shadow-sm p-6">
                        <h2 className="text-xl font-bold text-brown-900 mb-4 flex items-center gap-2">
                            <Bell size={20} className="text-brown-500" />
                            Recent Announcements
                        </h2>
                        <div className="space-y-3">
                            {[
                                { title: 'Staff Meeting', time: '2 hours ago', type: 'Administrative' },
                                { title: 'Science Fair Details', time: 'Yesterday', type: 'Event' },
                            ].map((item, idx) => (
                                <div key={idx} className="p-3 bg-cream-50 rounded-lg border border-brown-100 hover:bg-cream-100 transition-colors cursor-pointer">
                                    <div className="flex justify-between items-start mb-1">
                                        <p className="font-bold text-brown-900 text-sm">{item.title}</p>
                                        <span className="text-xs text-brown-500">{item.time}</span>
                                    </div>
                                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                                        {item.type}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
