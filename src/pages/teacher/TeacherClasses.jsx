import React from 'react';
import { BookOpen, Users, Clock, MapPin } from 'lucide-react';

const TeacherClasses = () => {
    const classes = [
        { id: 1, name: 'Class 10-A', subject: 'Mathematics', students: 32, room: '101', schedule: 'Mon, Wed, Fri - 9:00 AM' },
        { id: 2, name: 'Class 10-B', subject: 'Mathematics', students: 30, room: '102', schedule: 'Mon, Wed, Fri - 10:00 AM' },
        { id: 3, name: 'Class 9-A', subject: 'Mathematics', students: 28, room: '201', schedule: 'Tue, Thu - 9:00 AM' },
    ];

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg"><BookOpen className="text-purple-600" size={28} /></div>
                    My Classes
                </h1>
                <p className="text-gray-500 mt-1">View your assigned classes and schedules</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map(cls => (
                    <div key={cls.id} className="bg-white rounded-xl border shadow-sm hover:shadow-lg transition-all overflow-hidden group">
                        <div className="bg-gradient-to-r from-primary to-primary-dark p-4">
                            <h3 className="text-xl font-bold text-white">{cls.name}</h3>
                            <p className="text-white/80">{cls.subject}</p>
                        </div>
                        <div className="p-4 space-y-3">
                            <div className="flex items-center gap-3 text-gray-600">
                                <Users size={18} className="text-primary" />
                                <span>{cls.students} Students</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <MapPin size={18} className="text-primary" />
                                <span>Room {cls.room}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <Clock size={18} className="text-primary" />
                                <span className="text-sm">{cls.schedule}</span>
                            </div>
                        </div>
                        <div className="px-4 pb-4">
                            <button className="w-full py-2 bg-gray-100 hover:bg-primary hover:text-white text-gray-700 rounded-lg font-medium transition-all">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherClasses;
