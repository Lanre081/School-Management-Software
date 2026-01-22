import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

const StudentTimetable = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const times = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM'];

    const schedule = {
        Monday: [
            { time: '9:00 AM', subject: 'Mathematics', teacher: 'Mr. Anderson', room: '101' },
            { time: '10:00 AM', subject: 'English', teacher: 'Mrs. Davis', room: '102' },
            { time: '11:00 AM', subject: 'Science', teacher: 'Mr. Wilson', room: '201' },
            { time: '2:00 PM', subject: 'History', teacher: 'Ms. Johnson', room: '103' },
        ],
        Tuesday: [
            { time: '9:00 AM', subject: 'Computer Science', teacher: 'Mr. Brown', room: 'Lab 1' },
            { time: '10:00 AM', subject: 'Mathematics', teacher: 'Mr. Anderson', room: '101' },
            { time: '11:00 AM', subject: 'English', teacher: 'Mrs. Davis', room: '102' },
            { time: '2:00 PM', subject: 'Physical Ed', teacher: 'Coach Smith', room: 'Gym' },
        ],
        Wednesday: [
            { time: '9:00 AM', subject: 'Science', teacher: 'Mr. Wilson', room: '201' },
            { time: '10:00 AM', subject: 'History', teacher: 'Ms. Johnson', room: '103' },
            { time: '11:00 AM', subject: 'Mathematics', teacher: 'Mr. Anderson', room: '101' },
            { time: '2:00 PM', subject: 'Art', teacher: 'Ms. Lee', room: '301' },
        ],
        Thursday: [
            { time: '9:00 AM', subject: 'English', teacher: 'Mrs. Davis', room: '102' },
            { time: '10:00 AM', subject: 'Computer Science', teacher: 'Mr. Brown', room: 'Lab 1' },
            { time: '11:00 AM', subject: 'Science', teacher: 'Mr. Wilson', room: '201' },
            { time: '2:00 PM', subject: 'Music', teacher: 'Mr. Garcia', room: '302' },
        ],
        Friday: [
            { time: '9:00 AM', subject: 'Mathematics', teacher: 'Mr. Anderson', room: '101' },
            { time: '10:00 AM', subject: 'History', teacher: 'Ms. Johnson', room: '103' },
            { time: '11:00 AM', subject: 'English', teacher: 'Mrs. Davis', room: '102' },
        ],
    };

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const colors = ['bg-blue-100 border-blue-300', 'bg-green-100 border-green-300', 'bg-purple-100 border-purple-300', 'bg-amber-100 border-amber-300', 'bg-pink-100 border-pink-300'];

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg"><Calendar className="text-blue-600" size={28} /></div>
                    My Timetable
                </h1>
                <p className="text-gray-500 mt-1">View your weekly class schedule</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                {days.map((day, idx) => (
                    <div key={day} className={`bg-white rounded-xl border shadow-sm overflow-hidden ${today === day ? 'ring-2 ring-primary' : ''}`}>
                        <div className={`p-3 ${today === day ? 'bg-primary text-white' : 'bg-gray-50'}`}>
                            <h3 className="font-bold text-center">{day}</h3>
                            {today === day && <p className="text-xs text-center opacity-80">Today</p>}
                        </div>
                        <div className="p-3 space-y-2">
                            {schedule[day]?.map((cls, i) => (
                                <div key={i} className={`p-3 rounded-lg border ${colors[i % colors.length]}`}>
                                    <p className="font-semibold text-gray-800 text-sm">{cls.subject}</p>
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

export default StudentTimetable;
