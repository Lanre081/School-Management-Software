import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';

const ParentCalendar = () => {
    const events = [
        { date: 25, month: 0, title: 'Parent-Teacher Meeting', time: '09:00 AM - 12:00 PM', type: 'meeting' },
        { date: 15, month: 1, title: 'Annual Sports Day', time: '08:00 AM - 04:00 PM', type: 'event' },
        { date: 28, month: 1, title: 'Science Fair', time: '10:00 AM - 02:00 PM', type: 'exhibition' },
    ];

    const currentYear = 2026;
    const [currentMonth, setCurrentMonth] = useState(0); // 0 = Jan

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

    // Create calendar grid
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    const getEventForDay = (day) => {
        return events.find(e => e.date === day && e.month === currentMonth);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                            <Calendar className="text-indigo-600" size={28} />
                        </div>
                        School Calendar
                    </h1>
                    <p className="text-gray-600 mt-1">Events, Exams & Holidays</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar View */}
                <div className="lg:col-span-2 bg-white rounded-xl border shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">{months[currentMonth]} {currentYear}</h2>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentMonth(prev => Math.max(0, prev - 1))}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                disabled={currentMonth === 0}
                            >
                                <ChevronLeft size={20} className={currentMonth === 0 ? 'text-gray-300' : 'text-gray-600'} />
                            </button>
                            <button
                                onClick={() => setCurrentMonth(prev => Math.min(11, prev + 1))}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                disabled={currentMonth === 11}
                            >
                                <ChevronRight size={20} className={currentMonth === 11 ? 'text-gray-300' : 'text-gray-600'} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-2 mb-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="text-center text-sm font-semibold text-gray-400 py-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                        {days.map((day, idx) => {
                            const event = day ? getEventForDay(day) : null;
                            return (
                                <div
                                    key={idx}
                                    className={`
                                        aspect-square rounded-xl border p-2 flex flex-col justify-between transition-all
                                        ${!day ? 'bg-gray-50/50 border-transparent' : 'bg-white border-gray-100 hover:border-indigo-200 hover:shadow-sm'}
                                        ${event ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}
                                    `}
                                >
                                    {day && (
                                        <>
                                            <span className={`text-sm font-bold ${event ? 'text-indigo-600' : 'text-gray-700'}`}>{day}</span>
                                            {event && (
                                                <div className="mt-1">
                                                    <div className={`w-2 h-2 rounded-full ${event.type === 'meeting' ? 'bg-indigo-500' :
                                                            event.type === 'event' ? 'bg-pink-500' : 'bg-green-500'
                                                        } mx-auto md:mx-0`}></div>
                                                    <p className="hidden md:block text-[10px] text-gray-500 truncate mt-1">{event.title}</p>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Upcoming List */}
                <div className="bg-white rounded-xl border shadow-sm p-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Upcoming This Month</h2>
                    <div className="space-y-4">
                        {events.filter(e => e.month === currentMonth).map((event, idx) => (
                            <div key={idx} className="p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md transition-all group">
                                <div className="flex gap-3">
                                    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-2 min-w-[50px]">
                                        <span className="text-xs font-bold text-gray-400 uppercase">{months[event.month].substring(0, 3)}</span>
                                        <span className="text-xl font-bold text-gray-800">{event.date}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">{event.title}</h3>
                                        <div className="flex items-center gap-4 mt-2">
                                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                                <Clock size={12} /> {event.time}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {events.filter(e => e.month === currentMonth).length === 0 && (
                            <div className="text-center py-8 text-gray-400">
                                <p>No events scheduled for this month.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParentCalendar;
