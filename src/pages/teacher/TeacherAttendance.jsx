import React, { useState } from 'react';
import { Calendar, CheckCircle, XCircle, Save } from 'lucide-react';

const TeacherAttendance = () => {
    const [selectedClass, setSelectedClass] = useState('Class 10-A');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [saved, setSaved] = useState(false);

    const [students, setStudents] = useState([
        { id: 1, name: 'John Smith', rollNo: '001', status: 'present' },
        { id: 2, name: 'Emma Johnson', rollNo: '002', status: 'present' },
        { id: 3, name: 'Michael Brown', rollNo: '003', status: 'absent' },
        { id: 4, name: 'Sarah Davis', rollNo: '004', status: 'present' },
        { id: 5, name: 'James Wilson', rollNo: '005', status: 'present' },
        { id: 6, name: 'Emily Taylor', rollNo: '006', status: 'absent' },
    ]);

    const toggleStatus = (id) => {
        setStudents(students.map(s => s.id === id ? { ...s, status: s.status === 'present' ? 'absent' : 'present' } : s));
    };

    const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

    const presentCount = students.filter(s => s.status === 'present').length;

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg"><Calendar className="text-blue-600" size={28} /></div>
                    Mark Attendance
                </h1>
                <p className="text-gray-500 mt-1">Record daily attendance for your classes</p>
            </div>

            <div className="bg-white rounded-xl border shadow-sm p-4 mb-6">
                <div className="flex flex-wrap gap-4 items-center">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                        <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary">
                            <option>Class 10-A</option>
                            <option>Class 10-B</option>
                            <option>Class 9-A</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary" />
                    </div>
                    <div className="ml-auto flex items-end gap-4">
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Present</p>
                            <p className="text-2xl font-bold text-green-600">{presentCount}/{students.length}</p>
                        </div>
                        <button onClick={handleSave} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold shadow-md ${saved ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary-dark'}`}>
                            <Save size={18} />{saved ? 'Saved!' : 'Save'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 divide-y">
                    {students.map(student => (
                        <div key={student.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-semibold">
                                    {student.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">{student.name}</p>
                                    <p className="text-sm text-gray-500">Roll No: {student.rollNo}</p>
                                </div>
                            </div>
                            <button onClick={() => toggleStatus(student.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${student.status === 'present' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}>
                                {student.status === 'present' ? <><CheckCircle size={18} />Present</> : <><XCircle size={18} />Absent</>}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeacherAttendance;
