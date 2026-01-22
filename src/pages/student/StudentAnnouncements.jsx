import React, { useState } from 'react';
import { Bell, Search, Calendar, ChevronRight } from 'lucide-react';

const StudentAnnouncements = () => {
    const announcements = [
        {
            id: 1,
            title: 'School Closed for Winter Break',
            content: 'Please be informed that the school will remain closed from December 20th to January 5th for Winter Break. Classes will resume on January 6th.',
            date: '2026-01-10',
            category: 'Important',
            read: false
        },
        {
            id: 2,
            title: 'Annual Sports Day Registration',
            content: 'Registration for the Annual Sports Day is now open. Interested students can register with their respective class teachers by Friday.',
            date: '2026-01-08',
            category: 'Event',
            read: true
        },
        {
            id: 3,
            title: 'Library Books Return',
            content: 'All students are requested to return borrowed library books before the end of the term to avoid fines.',
            date: '2026-01-05',
            category: 'Academic',
            read: true
        },
        {
            id: 4,
            title: 'Science Fair Projects Due',
            content: 'This is a reminder that all Science Fair projects must be submitted to the Science Lab by next Monday.',
            date: '2026-01-03',
            category: 'Academic',
            read: true
        }
    ];

    const [searchTerm, setSearchTerm] = useState('');

    const filtered = announcements.filter(a =>
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <Bell className="text-orange-600" size={28} />
                        </div>
                        Announcements
                    </h1>
                    <p className="text-gray-600 mt-1">Stay updated with school news</p>
                </div>
            </div>

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

            <div className="space-y-4">
                {filtered.map(item => (
                    <div key={item.id} className={`bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden ${!item.read ? 'border-l-4 border-l-orange-500' : ''}`}>
                        {!item.read && (
                            <span className="absolute top-4 right-4 text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">New</span>
                        )}

                        <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs font-bold px-2 py-1 rounded-md ${item.category === 'Important' ? 'bg-red-100 text-red-600' :
                                    item.category === 'Event' ? 'bg-blue-100 text-blue-600' :
                                        'bg-gray-100 text-gray-600'
                                }`}>
                                {item.category}
                            </span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                <Calendar size={12} />
                                {item.date}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{item.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentAnnouncements;
