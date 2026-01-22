import React from 'react';
import { Users, GraduationCap, BookOpen, DollarSign, TrendingUp, Calendar } from 'lucide-react';

const AdminDashboard = () => {
    const stats = [
        { icon: Users, label: 'Total Students', value: '1,245', trend: '+12%' },
        { icon: GraduationCap, label: 'Total Teachers', value: '84', trend: '+3%' },
        { icon: BookOpen, label: 'Classes', value: '42', trend: '+2' },
        { icon: DollarSign, label: 'Revenue', value: '$45K', trend: '+8%' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-brown-900 mb-2">Admin Dashboard</h1>
                    <p className="text-brown-600">Welcome back! Here's what's happening today.</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-brown-700 bg-cream-50 px-4 py-2 rounded-lg shadow-sm border border-brown-200">
                    <Calendar size={16} />
                    <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-cream-50 rounded-xl shadow-sm border border-brown-200 p-6 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 bg-cream-200 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                                <stat.icon className="text-primary" size={24} />
                            </div>
                            <span className="text-green-700 text-sm font-semibold bg-green-50 px-2 py-1 rounded-full flex items-center gap-1 border border-green-100">
                                <TrendingUp size={12} />
                                {stat.trend}
                            </span>
                        </div>
                        <p className="text-brown-500 text-sm font-medium mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-brown-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-cream-50 rounded-xl shadow-sm border border-brown-200 p-6 hover:shadow-md transition-shadow">
                    <h2 className="text-xl font-bold mb-4 text-brown-900 flex items-center gap-2">
                        <div className="w-1 h-6 bg-primary rounded-full"></div>
                        Recent Activity
                    </h2>
                    <p className="text-brown-500 py-8 text-center">No recent activity</p>
                </div>

                <div className="bg-gradient-to-br from-brown-50 to-cream-100 rounded-xl shadow-sm border border-brown-200 p-6">
                    <h2 className="text-xl font-bold mb-4 text-brown-900 flex items-center gap-2">
                        <div className="w-1 h-6 bg-primary rounded-full"></div>
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="bg-white hover:bg-primary hover:text-white text-brown-800 border border-brown-200 px-4 py-3 rounded-lg font-bold transition-all shadow-sm hover:shadow-md">
                            Add Student
                        </button>
                        <button className="bg-white hover:bg-primary hover:text-white text-brown-800 border border-brown-200 px-4 py-3 rounded-lg font-bold transition-all shadow-sm hover:shadow-md">
                            Add Teacher
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
