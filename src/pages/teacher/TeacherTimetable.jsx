import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

const TeacherTimetable = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    const schedule = {
        Monday: [
            { time: '9:00 AM', subject: 'Mathematics', class: 'Class 10-A', room: '101' },
            { time: '10:00 AM', subject: 'Mathematics', class: 'Class 9-B', room: '202' },
            { time: '11:00 AM', subject: 'Free Period', class: '', room: '' },
            { time: '2:00 PM', subject: 'Mathematics', class: 'Class 10-B', room: '102' },
        ],
        Tuesday: [
            { time: '9:00 AM', subject: 'Mathematics', class: 'Class 8-C', room: '105' },
            { time: '10:00 AM', subject: 'Free Period', class: '', room: '' },
            { time: '11:00 AM', subject: 'Mathematics', class: 'Class 9-B', room: '202' },
            { time: '2:00 PM', subject: 'Tutoring', class: 'Library', room: 'Lib' },
        ],
        Wednesday: [
            { time: '9:00 AM', subject: 'Mathematics', class: 'Class 10-A', room: '101' },
            { time: '10:00 AM', subject: 'Science Support', class: 'Class 9-A', room: 'Lab' },
            { time: '11:00 AM', subject: 'Mathematics', class: 'Class 10-B', room: '102' },
            { time: '2:00 PM', subject: 'Free Period', class: '', room: '' },
        ],
        Thursday: [
            { time: '9:00 AM', subject: 'Mathematics', class: 'Class 9-B', room: '202' },
            { time: '10:00 AM', subject: 'Mathematics', class: 'Class 8-C', room: '105' },
            { time: '11:00 AM', subject: 'Free Period', class: '', room: '' },
            { time: '2:00 PM', subject: 'Meeting', class: 'Staff Room', room: 'Conf' },
        ],
        Friday: [
            { time: '9:00 AM', subject: 'Mathematics', class: 'Class 10-A', room: '101' },
            { time: '10:00 AM', subject: 'Mathematics', class: 'Class 10-B', room: '102' },
            { time: '11:00 AM', subject: 'Mathematics', class: 'Class 8-C', room: '105' },
        ],
    };

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const colors = ['bg-indigo-100 border-indigo-300', 'bg-purple-100 border-purple-300', 'bg-pink-100 border-pink-300', 'bg-blue-100 border-blue-300'];

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg"><Calendar className="text-indigo-600" size={28} /></div>
                    My Timetable
                </h1>
                <p className="text-gray-500 mt-1">View your weekly teaching schedule</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                {days.map((day, idx) => (
                    <div key={day} className={`bg-white rounded-xl border shadow-sm overflow-hidden ${today === day ? 'ring-2 ring-indigo-500' : ''}`}>
                        <div className={`p-3 ${today === day ? 'bg-indigo-600 text-white' : 'bg-gray-50'}`}>
                            <h3 className="font-bold text-center">{day}</h3>
                            {today === day && <p className="text-xs text-center opacity-80">Today</p>}
                        </div>
                        <div className="p-3 space-y-2">
                            {schedule[day]?.filter(cls => cls.subject !== 'Free Period').map((cls, i) => (
                                <div key={i} className={`p-3 rounded-lg border ${colors[i % colors.length]}`}>
                                    <p className="font-semibold text-gray-800 text-sm">{cls.class}</p>
                                    <p className="text-xs text-indigo-700 font-medium">{cls.subject}</p>
                                    <div className="flex items-center gap-1 text-xs text-gray-600 mt-1"><Clock size={12} />{cls.time}</div>
                                    <div className="flex items-center gap-1 text-xs text-gray-600"><MapPin size={12} />{cls.room}</div>
                                </div>
                            )) || <p className="text-sm text-gray-400 text-center py-4">No classes</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherTimetable;
