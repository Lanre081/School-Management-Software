import React, { useState } from 'react';
import Table from '../../components/Table';
import { Bell, Search, Filter } from 'lucide-react';

const TeacherAnnouncements = () => {
    // Mock data - In a real app, this would be fetched from the backend, likely filtered for 'Teachers' or 'All'
    const announcements = [
        {
            id: 1,
            title: 'Staff Meeting',
            message: 'Mandatory staff meeting in the conference room. Topic: Upcoming standardized tests.',
            target: 'Teachers',
            priority: 'High',
            date: '2026-01-12'
        },
        {
            id: 2,
            title: 'Winter Break Notice',
            message: 'School will be closed from Dec 20 to Jan 5 for winter break.',
            target: 'All',
            priority: 'High',
            date: '2026-01-10'
        },
        {
            id: 4,
            title: 'Staff Training Workshop',
            message: 'Mandatory training session on new teaching methodologies.',
            target: 'Teachers',
            priority: 'Medium',
            date: '2026-01-03'
        },
        {
            id: 5,
            title: 'Science Fair Details',
            message: 'Details for the science fair setup have been mailed to all science department heads.',
            target: 'Teachers',
            priority: 'Medium',
            date: '2026-01-11'
        },
    ];

    const [searchTerm, setSearchTerm] = useState('');

    const columns = [
        { header: 'Title', accessor: 'title' },
        {
            header: 'Message',
            accessor: 'message',
            render: (row) => (
                <span className="line-clamp-2 max-w-md">{row.message}</span>
            )
        },
        {
            header: 'For',
            accessor: 'target',
            render: (row) => (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                    {row.target}
                </span>
            )
        },
        {
            header: 'Priority',
            accessor: 'priority',
            render: (row) => (
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${row.priority === 'High' ? 'bg-red-100 text-red-700' :
                    row.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                    }`}>
                    {row.priority}
                </span>
            )
        },
        { header: 'Date', accessor: 'date' },
    ];

    const filteredAnnouncements = announcements.filter(a =>
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <Bell className="text-orange-600" size={32} />
                        </div>
                        Announcements
                    </h1>
                    <p className="text-gray-600 mt-1">View school-wide and staff announcements</p>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search announcements..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                    />
                </div>
            </div>

            <Table
                columns={columns}
                data={filteredAnnouncements}
            // No edit/delete actions for teacher
            />
        </div>
    );
};

export default TeacherAnnouncements;
