import React from 'react';
import { Award, TrendingUp, BookOpen, Printer, Download } from 'lucide-react';

const StudentGrades = () => {
    // Mock Data reflecting the new system: Test 1 (15), Test 2 (15), Exam (70)
    const grades = [
        { subject: 'Mathematics', teacher: 'Mr. John Anderson', test1: 14, test2: 13, exam: 60, total: 87, grade: 'A', remarks: 'Excellent' },
        { subject: 'English Language', teacher: 'Mrs. Sarah Davis', test1: 12, test2: 14, exam: 55, total: 81, grade: 'A', remarks: 'Excellent' },
        { subject: 'Basic Science', teacher: 'Mr. Michael Wilson', test1: 10, test2: 12, exam: 45, total: 67, grade: 'B', remarks: 'Very Good' },
        { subject: 'Social Studies', teacher: 'Ms. Emily Johnson', test1: 11, test2: 11, exam: 50, total: 72, grade: 'A', remarks: 'Good' },
        { subject: 'Computer Science', teacher: 'Mr. David Brown', test1: 15, test2: 15, exam: 65, total: 95, grade: 'A+', remarks: 'Outstanding' },
    ];

    const getGradeColor = (grade) => {
        if (grade.startsWith('A')) return 'bg-green-100 text-green-700';
        if (grade.startsWith('B')) return 'bg-blue-100 text-blue-700';
        if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-700';
        return 'bg-red-100 text-red-700';
    };

    const avgScore = (grades.reduce((acc, g) => acc + g.total, 0) / grades.length).toFixed(1);

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 rounded-xl"><Award className="text-indigo-600" size={28} /></div>
                        Academic Performance
                    </h1>
                    <p className="text-gray-500 mt-1">Review your assessment scores and grades</p>
                </div>
                <button onClick={() => window.print()} className="bg-white text-gray-700 px-5 py-2.5 rounded-lg border hover:bg-gray-50 font-semibold flex items-center gap-2 shadow-sm transition-all">
                    <Printer size={18} /> Print Result Sheet
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-5 text-white shadow-lg">
                    <div className="flex items-center gap-3"><TrendingUp size={24} className="opacity-80" /><p className="text-sm font-medium opacity-90">Term Average</p></div>
                    <p className="text-4xl font-bold mt-2">{avgScore}%</p>
                </div>
                <div className="bg-white rounded-xl p-5 border shadow-sm">
                    <p className="text-sm text-gray-500 font-bold">CGPA</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">4.52</p>
                </div>
                <div className="bg-white rounded-xl p-5 border shadow-sm">
                    <p className="text-sm text-gray-500 font-bold">Class Position</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">3rd<span className="text-sm text-gray-400 font-normal"> / 35</span></p>
                </div>
                <div className="bg-white rounded-xl p-5 border shadow-sm">
                    <p className="text-sm text-gray-500 font-bold">Total Subjects</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{grades.length}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Subject</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Teacher</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase">Test 1 (15)</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase">Test 2 (15)</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase">Exam (70)</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase">Total</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase">Grade</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Remarks</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {grades.map((g, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                                                <BookOpen size={20} className="text-indigo-600" />
                                            </div>
                                            <span className="font-bold text-gray-800">{g.subject}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{g.teacher}</td>
                                    <td className="px-6 py-4 text-center font-medium text-gray-600">{g.test1}</td>
                                    <td className="px-6 py-4 text-center font-medium text-gray-600">{g.test2}</td>
                                    <td className="px-6 py-4 text-center font-medium text-gray-600">{g.exam}</td>
                                    <td className="px-6 py-4 text-center font-bold text-indigo-700 text-lg">{g.total}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getGradeColor(g.grade)}`}>
                                            {g.grade}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-medium text-gray-500 uppercase">{g.remarks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentGrades;
