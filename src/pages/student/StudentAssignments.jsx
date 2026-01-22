import React from 'react';
import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const StudentAssignments = () => {
    const assignments = [
        { id: 1, title: 'Algebra Practice Set', subject: 'Mathematics', dueDate: '2024-03-20', status: 'pending', teacher: 'Mr. Anderson' },
        { id: 2, title: 'Essay on Shakespeare', subject: 'English', dueDate: '2024-03-18', status: 'submitted', teacher: 'Mrs. Davis' },
        { id: 3, title: 'Lab Report: Photosynthesis', subject: 'Science', dueDate: '2024-03-22', status: 'pending', teacher: 'Mr. Wilson' },
        { id: 4, title: 'History Research Paper', subject: 'History', dueDate: '2024-03-15', status: 'graded', grade: 'A', teacher: 'Ms. Johnson' },
        { id: 5, title: 'Programming Project', subject: 'Computer Science', dueDate: '2024-03-25', status: 'pending', teacher: 'Mr. Brown' },
    ];

    const getStatusBadge = (status, grade) => {
        if (status === 'graded') return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700"><CheckCircle size={14} />Graded: {grade}</span>;
        if (status === 'submitted') return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700"><CheckCircle size={14} />Submitted</span>;
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700"><Clock size={14} />Pending</span>;
    };

    const getDaysLeft = (dueDate) => {
        const days = Math.ceil((new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24));
        if (days < 0) return <span className="text-red-600 font-medium">Overdue</span>;
        if (days === 0) return <span className="text-amber-600 font-medium">Due Today</span>;
        if (days <= 3) return <span className="text-amber-600 font-medium">{days} days left</span>;
        return <span className="text-gray-600">{days} days left</span>;
    };

    const pending = assignments.filter(a => a.status === 'pending').length;
    const submitted = assignments.filter(a => a.status === 'submitted').length;
    const graded = assignments.filter(a => a.status === 'graded').length;

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg"><FileText className="text-indigo-600" size={28} /></div>
                    My Assignments
                </h1>
                <p className="text-gray-500 mt-1">Track your assignments and submissions</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200"><p className="text-sm text-amber-600">Pending</p><p className="text-2xl font-bold text-amber-700">{pending}</p></div>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200"><p className="text-sm text-blue-600">Submitted</p><p className="text-2xl font-bold text-blue-700">{submitted}</p></div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-200"><p className="text-sm text-green-600">Graded</p><p className="text-2xl font-bold text-green-700">{graded}</p></div>
            </div>

            <div className="space-y-4">
                {assignments.map(a => (
                    <div key={a.id} className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-md transition-all">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-800 text-lg">{a.title}</h3>
                                <p className="text-gray-500 text-sm">{a.subject} • {a.teacher}</p>
                            </div>
                            <div className="text-right">
                                {getStatusBadge(a.status, a.grade)}
                                <p className="text-sm mt-2">{getDaysLeft(a.dueDate)}</p>
                            </div>
                        </div>
                        {a.status === 'pending' && (
                            <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors">
                                Submit Assignment
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentAssignments;
