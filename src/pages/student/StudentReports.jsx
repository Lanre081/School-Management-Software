import React from 'react';
import { FileText, Download, TrendingUp, Calendar, Printer } from 'lucide-react';

const StudentReports = () => {
    const reportCards = [
        { id: 1, term: 'Fall Semester 2025', grade: '10th', date: '2025-12-20', gpa: '3.8', status: 'Final' },
        { id: 2, term: 'Spring Semester 2025', grade: '9th', date: '2025-05-30', gpa: '3.6', status: 'Final' },
        { id: 3, term: 'Fall Semester 2024', grade: '9th', date: '2024-12-15', gpa: '3.5', status: 'Final' },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <FileText className="text-purple-600" size={28} />
                        </div>
                        Report Cards
                    </h1>
                    <p className="text-gray-600 mt-1">View and download your academic reports</p>
                </div>
            </div>

            {/* Current Summary */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <p className="text-purple-100 font-medium mb-1">Cumulative GPA</p>
                        <h2 className="text-5xl font-bold">3.8</h2>
                        <div className="flex items-center gap-2 mt-4 bg-white/20 px-3 py-1.5 rounded-lg w-fit backdrop-blur-sm">
                            <TrendingUp size={16} />
                            <span className="text-sm font-medium">Top 15% of class</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-purple-100 font-medium text-sm">Latest Report</p>
                        <p className="text-2xl font-bold mb-2">Fall Semester 2025</p>
                        <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-bold shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2 float-right">
                            <Download size={18} />
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* History List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">Report History</h2>
                </div>
                <div className="divide-y divide-gray-100">
                    {reportCards.map(report => (
                        <div key={report.id} className="p-6 flex flex-col md:flex-row items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                                    <FileText className="text-purple-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg">{report.term}</h3>
                                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                        <span className="flex items-center gap-1"><Calendar size={14} /> {report.date}</span>
                                        <span>•</span>
                                        <span>Grade {report.grade}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                <div className="text-center">
                                    <p className="text-xs text-gray-500 uppercase font-bold">GPA</p>
                                    <p className="font-bold text-gray-800 text-lg">{report.gpa}</p>
                                </div>
                                <div className="text-center px-4 border-l border-gray-200">
                                    <p className="text-xs text-gray-500 uppercase font-bold">Status</p>
                                    <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded text-sm">{report.status}</span>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Print">
                                        <Printer size={20} />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Download">
                                        <Download size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentReports;
