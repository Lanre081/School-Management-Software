import React, { useState } from 'react';
import { Calendar, CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';

const StudentAttendance = () => {
    // Mock data
    const attendanceStats = {
        totalDays: 120,
        present: 114,
        absent: 4,
        late: 2,
        percentage: 95
    };

    const attendanceHistory = [
        { date: '2026-01-12', status: 'Present', checkIn: '08:45 AM', type: 'Regular' },
        { date: '2026-01-11', status: 'Present', checkIn: '08:50 AM', type: 'Regular' },
        { date: '2026-01-10', status: 'Late', checkIn: '09:15 AM', type: 'Late Arrival' },
        { date: '2026-01-09', status: 'Present', checkIn: '08:40 AM', type: 'Regular' },
        { date: '2026-01-08', status: 'Absent', checkIn: '-', type: 'Medical' },
        { date: '2026-01-07', status: 'Present', checkIn: '08:45 AM', type: 'Regular' },
        { date: '2026-01-06', status: 'Present', checkIn: '08:42 AM', type: 'Regular' },
    ];

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'present': return 'text-green-600 bg-green-50 border-green-200';
            case 'absent': return 'text-red-600 bg-red-50 border-red-200';
            case 'late': return 'text-amber-600 bg-amber-50 border-amber-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'present': return <CheckCircle size={16} />;
            case 'absent': return <XCircle size={16} />;
            case 'late': return <Clock size={16} />;
            default: return <AlertCircle size={16} />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <Calendar className="text-green-600" size={28} />
                        </div>
                        My Attendance
                    </h1>
                    <p className="text-gray-600 mt-1">Track your daily attendance record</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500 font-medium mb-1">Total Days</p>
                    <p className="text-2xl font-bold text-gray-800">{attendanceStats.totalDays}</p>
                </div>
                <div className="bg-green-50 p-5 rounded-xl border border-green-100 shadow-sm">
                    <p className="text-sm text-green-700 font-medium mb-1">Present</p>
                    <p className="text-2xl font-bold text-green-800">{attendanceStats.present}</p>
                </div>
                <div className="bg-red-50 p-5 rounded-xl border border-red-100 shadow-sm">
                    <p className="text-sm text-red-700 font-medium mb-1">Absent</p>
                    <p className="text-2xl font-bold text-red-800">{attendanceStats.absent}</p>
                </div>
                <div className="bg-amber-50 p-5 rounded-xl border border-amber-100 shadow-sm">
                    <p className="text-sm text-amber-700 font-medium mb-1">Late</p>
                    <p className="text-2xl font-bold text-amber-800">{attendanceStats.late}</p>
                </div>
            </div>

            {/* Attendance History */}
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-lg font-bold text-gray-800">Recent History</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                <th className="p-4 font-semibold">Date</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold">Check In</th>
                                <th className="p-4 font-semibold">Type</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {attendanceHistory.map((record, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 font-medium text-gray-800">{record.date}</td>
                                    <td className="p-4">
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(record.status)}`}>
                                            {getStatusIcon(record.status)}
                                            {record.status}
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-600 font-mono text-sm">{record.checkIn}</td>
                                    <td className="p-4 text-sm text-gray-600">{record.type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentAttendance;
