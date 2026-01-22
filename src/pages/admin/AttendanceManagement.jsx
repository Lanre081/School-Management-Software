import React, { useState } from 'react';
import { Calendar, Users, CheckCircle, XCircle, Clock, Filter } from 'lucide-react';

const AttendanceManagement = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedClass, setSelectedClass] = useState('all');

    const classes = ['Class 10-A', 'Class 10-B', 'Class 9-A', 'Class 9-B', 'Class 8-A'];

    const attendanceData = [
        { id: 1, studentName: 'John Smith', class: 'Class 10-A', status: 'present', time: '08:15 AM' },
        { id: 2, studentName: 'Emma Johnson', class: 'Class 10-A', status: 'present', time: '08:10 AM' },
        { id: 3, studentName: 'Michael Brown', class: 'Class 10-A', status: 'absent', time: '-' },
        { id: 4, studentName: 'Sarah Davis', class: 'Class 10-B', status: 'present', time: '08:20 AM' },
        { id: 5, studentName: 'James Wilson', class: 'Class 10-B', status: 'late', time: '08:45 AM' },
        { id: 6, studentName: 'Emily Taylor', class: 'Class 9-A', status: 'present', time: '08:05 AM' },
        { id: 7, studentName: 'Daniel Anderson', class: 'Class 9-A', status: 'present', time: '08:12 AM' },
        { id: 8, studentName: 'Olivia Martinez', class: 'Class 9-B', status: 'absent', time: '-' },
    ];

    const filteredData = selectedClass === 'all'
        ? attendanceData
        : attendanceData.filter(a => a.class === selectedClass);

    const stats = {
        total: filteredData.length,
        present: filteredData.filter(a => a.status === 'present').length,
        absent: filteredData.filter(a => a.status === 'absent').length,
        late: filteredData.filter(a => a.status === 'late').length,
    };

    const attendanceRate = ((stats.present / stats.total) * 100).toFixed(1);

    const getStatusBadge = (status) => {
        const styles = {
            present: 'bg-green-100 text-green-700 border border-green-200',
            absent: 'bg-red-100 text-red-700 border border-red-200',
            late: 'bg-amber-100 text-amber-700 border border-amber-200',
        };
        const icons = {
            present: <CheckCircle size={14} />,
            absent: <XCircle size={14} />,
            late: <Clock size={14} />,
        };
        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
                {icons[status]}
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-brown-900 flex items-center gap-3">
                        <div className="p-2 bg-cream-200 rounded-lg">
                            <Calendar className="text-primary" size={28} />
                        </div>
                        Attendance Management
                    </h1>
                    <p className="text-brown-500 mt-1">Track and manage student attendance</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-4 border border-brown-200 shadow-sm mb-6">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Filter size={18} className="text-brown-400" />
                        <span className="text-sm font-medium text-brown-600">Filters:</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-brown-600">Date:</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="px-3 py-2 border border-brown-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none text-brown-800"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-brown-600">Class:</label>
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="px-3 py-2 border border-brown-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-white text-brown-800"
                        >
                            <option value="all">All Classes</option>
                            {classes.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <div className="bg-cream-50 rounded-xl p-4 border border-brown-200 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white border border-brown-100 rounded-lg flex items-center justify-center">
                            <Users size={20} className="text-brown-600" />
                        </div>
                        <div>
                            <p className="text-xs text-brown-500">Total</p>
                            <p className="text-xl font-bold text-brown-900">{stats.total}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-cream-50 rounded-xl p-4 border border-green-200 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckCircle size={20} className="text-green-600" />
                        </div>
                        <div>
                            <p className="text-xs text-green-700">Present</p>
                            <p className="text-xl font-bold text-green-700">{stats.present}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-cream-50 rounded-xl p-4 border border-red-200 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <XCircle size={20} className="text-red-600" />
                        </div>
                        <div>
                            <p className="text-xs text-red-700">Absent</p>
                            <p className="text-xl font-bold text-red-700">{stats.absent}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-cream-50 rounded-xl p-4 border border-amber-200 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                            <Clock size={20} className="text-amber-600" />
                        </div>
                        <div>
                            <p className="text-xs text-amber-700">Late</p>
                            <p className="text-xl font-bold text-amber-700">{stats.late}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 border border-primary/20 col-span-2 lg:col-span-1">
                    <p className="text-xs text-primary font-medium mb-1">Attendance Rate</p>
                    <p className="text-2xl font-bold text-primary">{attendanceRate}%</p>
                    <div className="mt-2 bg-white/50 rounded-full h-2">
                        <div
                            className="bg-primary rounded-full h-2 transition-all"
                            style={{ width: `${attendanceRate}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Attendance Table */}
            <div className="bg-white rounded-xl shadow-sm border border-brown-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-brown-100">
                        <thead className="bg-brown-100/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-brown-700 uppercase tracking-wider">Student</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-brown-700 uppercase tracking-wider">Class</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-brown-700 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-brown-700 uppercase tracking-wider">Check-in Time</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-brown-100">
                            {filteredData.map((record) => (
                                <tr key={record.id} className="hover:bg-cream/30 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-semibold text-sm">
                                                {record.studentName.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="font-medium text-brown-900">{record.studentName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-brown-500">{record.class}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(record.status)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-brown-500">{record.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AttendanceManagement;
