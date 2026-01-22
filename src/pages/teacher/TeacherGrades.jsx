import React, { useState } from 'react';
import { Award, Save, Printer, Eye, Filter } from 'lucide-react';
import Modal from '../../components/Modal';

const TeacherGrades = () => {
    const [selectedClass, setSelectedClass] = useState('JSS 1');
    const [selectedSubject, setSelectedSubject] = useState('Mathematics');
    const [selectedTerm, setSelectedTerm] = useState('First Term');
    const [showReportModal, setShowReportModal] = useState(false);
    const [currentReport, setCurrentReport] = useState(null);

    // Mock Data
    const [students, setStudents] = useState([
        { id: 1, name: 'John Smith', admissionNo: 'ADM-001', test1: 14, test2: 13, exam: 60, total: 87, grade: 'A', remark: 'Excellent' },
        { id: 2, name: 'Emma Johnson', admissionNo: 'ADM-002', test1: 12, test2: 14, exam: 55, total: 81, grade: 'A', remark: 'Excellent' },
        { id: 3, name: 'Michael Brown', admissionNo: 'ADM-003', test1: 10, test2: 12, exam: 45, total: 67, grade: 'B', remark: 'Very Good' },
        { id: 4, name: 'Sarah Davis', admissionNo: 'ADM-004', test1: 8, test2: 10, exam: 40, total: 58, grade: 'C', remark: 'Credit' },
        { id: 5, name: 'James Wilson', admissionNo: 'ADM-005', test1: 5, test2: 8, exam: 25, total: 38, grade: 'F', remark: 'Fail' },
    ]);

    const calculateGrade = (total) => {
        if (total >= 75) return { grade: 'A', remark: 'Excellent' };
        if (total >= 65) return { grade: 'B', remark: 'Very Good' };
        if (total >= 50) return { grade: 'C', remark: 'Credit' };
        if (total >= 40) return { grade: 'D', remark: 'Pass' };
        if (total >= 0) return { grade: 'F', remark: 'Fail' };
        return { grade: '-', remark: '-' };
    };

    const handleMarkChange = (id, field, value) => {
        const val = Math.min(Math.max(Number(value), 0), field === 'exam' ? 70 : 15);

        setStudents(prev => prev.map(student => {
            if (student.id === id) {
                const updated = { ...student, [field]: value === '' ? '' : val };
                // Recalculate Total
                const t1 = Number(updated.test1) || 0;
                const t2 = Number(updated.test2) || 0;
                const ex = Number(updated.exam) || 0;
                const total = t1 + t2 + ex;
                const { grade, remark } = calculateGrade(total);
                return { ...updated, total, grade, remark };
            }
            return student;
        }));
    };

    const handleSave = () => {
        alert('Grades saved successfully!');
    };

    const handleViewReport = (student) => {
        setCurrentReport(student);
        setShowReportModal(true);
    };

    const classAverage = (students.reduce((acc, s) => acc + s.total, 0) / students.length).toFixed(1);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white shadow-lg">
                            <Award size={24} />
                        </div>
                        Grade Book
                    </h1>
                    <p className="text-gray-500 mt-1 ml-14">Record assessment scores and generate reports</p>
                </div>
                <div className="flex items-center gap-3 bg-white p-2 rounded-lg border shadow-sm">
                    <span className="text-sm text-gray-500 font-bold px-2">Average:</span>
                    <span className="text-xl font-bold text-indigo-600">{classAverage}%</span>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Class</label>
                    <select className="w-full p-2.5 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-100" value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
                        <option>JSS 1</option>
                        <option>JSS 2</option>
                        <option>SSS 1</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Subject</label>
                    <select className="w-full p-2.5 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-100" value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}>
                        <option>Mathematics</option>
                        <option>English Language</option>
                        <option>Basic Science</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Term</label>
                    <select className="w-full p-2.5 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-100" value={selectedTerm} onChange={e => setSelectedTerm(e.target.value)}>
                        <option>First Term</option>
                        <option>Second Term</option>
                        <option>Third Term</option>
                    </select>
                </div>
                <button className="h-[42px] bg-indigo-600 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-md">
                    <Filter size={18} /> Load Class
                </button>
            </div>

            {/* Marks Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="p-4 font-bold text-gray-600 text-sm">Student Name</th>
                                <th className="p-4 font-bold text-gray-600 text-sm w-24 text-center">CA 1 (15)</th>
                                <th className="p-4 font-bold text-gray-600 text-sm w-24 text-center">CA 2 (15)</th>
                                <th className="p-4 font-bold text-gray-600 text-sm w-24 text-center">Exam (70)</th>
                                <th className="p-4 font-bold text-gray-600 text-sm w-24 text-center">Total</th>
                                <th className="p-4 font-bold text-gray-600 text-sm text-center">Grade</th>
                                <th className="p-4 font-bold text-gray-600 text-sm">Result Sheet</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {students.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50 group">
                                    <td className="p-4">
                                        <p className="font-bold text-gray-800">{student.name}</p>
                                        <p className="text-xs text-gray-500 font-mono">{student.admissionNo}</p>
                                    </td>
                                    <td className="p-2">
                                        <input
                                            type="number"
                                            className="w-full p-2 text-center border rounded focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-semibold bg-gray-50 focus:bg-white"
                                            value={student.test1}
                                            onChange={(e) => handleMarkChange(student.id, 'test1', e.target.value)}
                                        />
                                    </td>
                                    <td className="p-2">
                                        <input
                                            type="number"
                                            className="w-full p-2 text-center border rounded focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-semibold bg-gray-50 focus:bg-white"
                                            value={student.test2}
                                            onChange={(e) => handleMarkChange(student.id, 'test2', e.target.value)}
                                        />
                                    </td>
                                    <td className="p-2">
                                        <input
                                            type="number"
                                            className="w-full p-2 text-center border rounded focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-semibold bg-gray-50 focus:bg-white"
                                            value={student.exam}
                                            onChange={(e) => handleMarkChange(student.id, 'exam', e.target.value)}
                                        />
                                    </td>
                                    <td className="p-4 text-center font-bold text-indigo-700 text-lg">{student.total}</td>
                                    <td className="p-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${student.grade === 'A' ? 'bg-green-100 text-green-700' :
                                                student.grade === 'B' ? 'bg-blue-100 text-blue-700' :
                                                    student.grade === 'F' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {student.grade}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => handleViewReport(student)}
                                            className="text-gray-400 hover:text-indigo-600 transition-colors flex items-center gap-1 text-sm font-semibold opacity-0 group-hover:opacity-100"
                                        >
                                            <Eye size={16} /> View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-bold"
                    >
                        <Save size={18} /> Save All Grades
                    </button>
                </div>
            </div>

            {/* Individual Student Report Modal */}
            <Modal isOpen={showReportModal} onClose={() => setShowReportModal(false)} title="Unofficial Result Snapshot">
                {currentReport && (
                    <div className="space-y-4 text-center">
                        <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-2xl mx-auto mb-4">
                            {currentReport.grade}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">{currentReport.name}</h3>
                        <p className="text-gray-500">{selectedSubject} • {selectedClass}</p>

                        <div className="grid grid-cols-3 gap-4 mt-6">
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-xs text-gray-500 uppercase font-bold">CA Total</p>
                                <p className="text-xl font-bold text-gray-800">{Number(currentReport.test1) + Number(currentReport.test2)}/30</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-xs text-gray-500 uppercase font-bold">Exam</p>
                                <p className="text-xl font-bold text-gray-800">{currentReport.exam}/70</p>
                            </div>
                            <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                                <p className="text-xs text-indigo-600 uppercase font-bold">Total</p>
                                <p className="text-xl font-bold text-indigo-700">{currentReport.total}/100</p>
                            </div>
                        </div>

                        <div className="pt-4 mt-4 border-t">
                            <button onClick={() => window.print()} className="w-full py-3 bg-gray-900 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-gray-800">
                                <Printer size={18} /> Print Snapshot
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default TeacherGrades;
