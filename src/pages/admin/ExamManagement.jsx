import React, { useState } from 'react';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import CbtQuestionEditor from '../../components/CbtQuestionEditor';
import clsx from 'clsx';
import {
    Plus, Award, Edit, Printer, Share2, ArrowLeft,
    Filter, BookOpen, Clock, Settings2, Save, Eye,
    Monitor, FileText
} from 'lucide-react';

const ExamManagement = () => {
    const [activeTab, setActiveTab] = useState('schedule');
    const [selectedExam, setSelectedExam] = useState(null);
    const [selectedProgram, setSelectedProgram] = useState('Western'); // 'Western', 'Arabic', 'Quran'

    // Mock Data for Exams: Added 'program' field and CBT meta
    const [exams, setExams] = useState([
        {
            id: 1, name: 'First Term Mathematics', session: '2025/2026', term: 'First Term',
            subject: 'Mathematics', class: 'JSS 1', program: 'Western', date: '2025-12-10',
            status: 'Scheduled', published: false, type: 'CBT', duration: 40,
            visibility: 'immediate', questions: []
        },
        {
            id: 2, name: 'First Term Nahw', session: '2025/2026', term: 'First Term',
            subject: 'Nahw (Grammar)', class: 'Aliyah 1', program: 'Arabic', date: '2025-12-11',
            status: 'Scheduled', published: false, type: 'Theory', duration: 120,
            visibility: 'delayed', questions: []
        },
        {
            id: 3, name: 'Hifz Assessment', session: '2025/2026', term: 'First Term',
            subject: 'Hifz (Memorization)', class: 'Tahfeez 1', program: 'Quran', date: '2025-12-12',
            status: 'Scheduled', published: false, type: 'Manual', duration: 60,
            visibility: 'hidden', questions: []
        },
    ]);

    // Mock Students for Marks Entry (Differentiated by programs in real app)
    const [studentMarks, setStudentMarks] = useState([
        { id: 101, admissionNo: 'ADM-001', name: 'Abdullahi Yusuf', p1: 15, p2: 15, p3: 60, total: 90, grade: 'A', remarks: 'Excellent' },
        { id: 102, admissionNo: 'ADM-002', name: 'Fatima Omar', p1: 12, p2: 14, p3: 50, total: 76, grade: 'B', remarks: 'Good' },
        { id: 103, admissionNo: 'ADM-003', name: 'Zaynab Ali', p1: 10, p2: 10, p3: 40, total: 60, grade: 'C', remarks: 'Credit' },
    ]);

    const [isExamModalOpen, setIsExamModalOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [currentReportStudent, setCurrentReportStudent] = useState(null);

    const [examForm, setExamForm] = useState({
        name: '', session: '2025/2026', term: 'First Term', subject: '', class: '',
        program: 'Western', date: '', status: 'Scheduled', type: 'CBT', duration: 40,
        visibility: 'immediate'
    });

    // Helper to calculate Grade
    const calculateGrade = (total) => {
        if (total >= 75) return { grade: 'A', remark: 'Excellent' };
        if (total >= 65) return { grade: 'B', remark: 'Very Good' };
        if (total >= 50) return { grade: 'C', remark: 'Credit' };
        if (total >= 40) return { grade: 'D', remark: 'Pass' };
        if (total >= 0) return { grade: 'F', remark: 'Fail' };
        return { grade: '-', remark: '-' };
    };

    // Columns config based on Program
    const getColumns = (program) => {
        if (program === 'Western' || program === 'Arabic') {
            return [
                { key: 'p1', label: 'Test 1 (15)', max: 15 },
                { key: 'p2', label: 'Test 2 (15)', max: 15 },
                { key: 'p3', label: 'Exam (70)', max: 70 },
            ];
        } else if (program === 'Quran') {
            return [
                { key: 'p1', label: 'Hifz (50)', max: 50 },
                { key: 'p2', label: 'Tajweed (25)', max: 25 },
                { key: 'p3', label: 'Tilawah (25)', max: 25 },
            ];
        }
        return [];
    };

    const handleMarkChange = (id, field, value) => {
        const programCols = getColumns(selectedExam?.program || 'Western');
        const colConfig = programCols.find(c => c.key === field);
        const max = colConfig ? colConfig.max : 100;

        const val = Math.min(Math.max(Number(value), 0), max);

        setStudentMarks(prev => prev.map(student => {
            if (student.id === id) {
                const updated = { ...student, [field]: value === '' ? '' : val };
                const t1 = Number(updated.p1) || 0;
                const t2 = Number(updated.p2) || 0;
                const t3 = Number(updated.p3) || 0;
                const total = t1 + t2 + t3;
                const { grade, remark } = calculateGrade(total);
                return { ...updated, total, grade, remarks: remark };
            }
            return student;
        }));
    };

    const handleSaveExam = (e) => {
        e.preventDefault();
        setExams([...exams, { ...examForm, id: Date.now(), published: false }]);
        setIsExamModalOpen(false);
    };

    const handlePublish = (examId) => {
        if (window.confirm('Publish results to student/parent dashboards?')) {
            setExams(exams.map(e => e.id === examId ? { ...e, published: true, status: 'Completed' } : e));
        }
    };

    const filteredExams = exams.filter(e => selectedProgram === 'All' || e.program === selectedProgram);

    // Dynamic Labels for Report Card
    const getReportLabels = (program) => {
        if (program === 'Quran') return { c1: 'Hifz', c2: 'Tajweed', c3: 'Tilawah' };
        return { c1: 'CA 1', c2: 'CA 2', c3: 'Exam' };
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-brown-900 flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-primary to-primary-dark rounded-xl text-white shadow-lg">
                            <Award size={24} />
                        </div>
                        Exams & Results
                    </h1>
                    <p className="text-brown-600 mt-1 ml-14">Multi-Program Assessment Management</p>
                </div>
                {activeTab === 'schedule' && (
                    <button
                        onClick={() => { setExamForm({ ...examForm, name: '' }); setIsExamModalOpen(true); }}
                        className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-dark transition-all shadow-xl"
                    >
                        <Plus size={20} /> Schedule Exam
                    </button>
                )}
            </div>

            {/* Program Tabs */}
            {activeTab === 'schedule' && (
                <div className="flex gap-2 p-1 bg-cream-50 rounded-lg w-fit border border-brown-100">
                    {['Western', 'Arabic', 'Quran'].map((prog) => (
                        <button
                            key={prog}
                            onClick={() => setSelectedProgram(prog)}
                            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${selectedProgram === prog ? 'bg-white text-primary shadow-sm' : 'text-brown-500 hover:text-brown-700'}`}
                        >
                            {prog} Education
                        </button>
                    ))}
                </div>
            )}

            {/* Navigation Tabs (Sub-level) */}
            {activeTab !== 'entry' && (
                <div className="flex gap-4 border-b border-brown-200">
                    <button onClick={() => setActiveTab('schedule')} className={`pb-3 px-4 text-sm font-bold border-b-2 ${activeTab === 'schedule' ? 'border-primary text-primary' : 'border-transparent text-brown-500 hover:text-brown-700'}`}>Schedule</button>
                    <button onClick={() => setActiveTab('reports')} className={`pb-3 px-4 text-sm font-bold border-b-2 ${activeTab === 'reports' ? 'border-primary text-primary' : 'border-transparent text-brown-500 hover:text-brown-700'}`}>Result Sheets</button>
                </div>
            )}

            {activeTab === 'schedule' && (
                <div className="bg-white rounded-xl shadow-sm border border-brown-200 overflow-hidden">
                    <Table
                        columns={[
                            {
                                header: 'Subject / Exam', accessor: 'name', render: (row) => (
                                    <div className="flex items-center gap-3">
                                        <div className={clsx(
                                            "p-2 rounded-lg",
                                            row.type === 'CBT' ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-blue-600"
                                        )}>
                                            {row.type === 'CBT' ? <Monitor size={18} /> : <FileText size={18} />}
                                        </div>
                                        <div>
                                            <p className="font-bold text-brown-900">{row.subject}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] bg-brown-100 text-brown-600 px-1.5 py-0.5 rounded font-black uppercase">{row.type}</span>
                                                <p className="text-xs text-brown-500">{row.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            },
                            {
                                header: 'Settings', accessor: 'duration', render: (row) => (
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-brown-600">
                                            <Clock size={12} /> {row.duration} mins
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-primary-light">
                                            <Eye size={10} /> {row.visibility}
                                        </div>
                                    </div>
                                )
                            },
                            { header: 'Class', accessor: 'class' },
                            { header: 'Date', accessor: 'date' },
                            { header: 'Status', accessor: 'status', render: (r) => <span className={`px-3 py-1 rounded-full text-xs font-bold ${r.published ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{r.published ? 'Published' : r.status}</span> },
                            {
                                header: 'Actions', accessor: 'actions', render: (row) => (
                                    <div className="flex gap-2">
                                        {row.type === 'CBT' ? (
                                            <button
                                                onClick={() => { setSelectedExam(row); setActiveTab('questions'); }}
                                                className="px-3 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg text-xs font-bold flex items-center gap-1 border border-purple-200"
                                            >
                                                <Settings2 size={14} /> Questions
                                            </button>
                                        ) : (
                                            <button onClick={() => { setSelectedExam(row); setActiveTab('entry'); }} className="px-3 py-1.5 bg-cream-100 text-primary hover:bg-cream-200 rounded-lg text-xs font-bold flex items-center gap-1 border border-brown-200"><Edit size={14} /> Input Scores</button>
                                        )}
                                        {!row.published && row.status === 'Completed' && <button onClick={() => handlePublish(row.id)} className="p-1.5 text-brown-600 hover:bg-cream-100 rounded-lg border border-transparent hover:border-brown-200" title="Publish"><Share2 size={18} /></button>}
                                    </div>
                                )
                            }
                        ]}
                        data={filteredExams}
                        actions={false}
                    />
                </div>
            )}

            {activeTab === 'questions' && selectedExam && (
                <CbtQuestionEditor
                    exam={selectedExam}
                    onBack={() => setActiveTab('schedule')}
                    onSave={(updatedQuestions) => {
                        setExams(exams.map(e => e.id === selectedExam.id ? { ...e, questions: updatedQuestions } : e));
                        setActiveTab('schedule');
                        alert('Question Bank saved successfully!');
                    }}
                />
            )}

            {activeTab === 'entry' && selectedExam && (
                <div className="space-y-6 animate-fadeIn">
                    <div className="flex items-center gap-4 bg-cream-50 p-4 rounded-xl border border-brown-200">
                        <button onClick={() => setActiveTab('schedule')} className="p-2 hover:bg-white rounded-lg text-primary"><ArrowLeft size={20} /></button>
                        <div>
                            <h2 className="text-xl font-bold text-brown-900">{selectedExam.subject} <span className="text-brown-400 font-normal">| {selectedExam.program}</span></h2>
                            <p className="text-sm text-primary font-medium">{selectedExam.class} • {selectedExam.term}</p>
                        </div>
                        <div className="ml-auto flex gap-3">
                            <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg font-bold shadow-md hover:bg-primary-dark" onClick={() => setActiveTab('schedule')}><Save size={16} /> Save Marks</button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-brown-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-brown-100/50 border-b border-brown-200">
                                        <th className="p-4 text-sm font-bold text-brown-800">Student Info</th>
                                        {getColumns(selectedExam.program).map((col) => (
                                            <th key={col.key} className="p-4 text-sm font-bold text-brown-800 w-24 text-center">{col.label}</th>
                                        ))}
                                        <th className="p-4 text-sm font-bold text-brown-800 text-center">Total</th>
                                        <th className="p-4 text-sm font-bold text-brown-800 text-center">Grade</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brown-100">
                                    {studentMarks.map((student) => (
                                        <tr key={student.id} className="hover:bg-brown-50">
                                            <td className="p-4">
                                                <p className="font-bold text-brown-900">{student.name}</p>
                                                <p className="text-xs text-brown-500 font-mono">{student.admissionNo}</p>
                                            </td>
                                            {getColumns(selectedExam.program).map((col) => (
                                                <td key={col.key} className="p-2">
                                                    <input
                                                        type="number"
                                                        className="w-full p-2 text-center border rounded focus:ring-2 focus:ring-primary/20 outline-none font-semibold border-brown-200 bg-white"
                                                        value={student[col.key]}
                                                        onChange={(e) => handleMarkChange(student.id, col.key, e.target.value)}
                                                    />
                                                </td>
                                            ))}
                                            <td className="p-4 text-center font-bold text-primary">{student.total}</td>
                                            <td className="p-4 text-center"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">{student.grade}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
                <div className="space-y-6">
                    <div className="flex gap-4 p-4 bg-cream-50 rounded-xl border border-brown-200 shadow-sm">
                        <div className="flex-1">
                            <label className="block text-sm font-bold text-brown-700 mb-1">Program</label>
                            <select className="w-full p-2 border border-brown-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" value={selectedProgram} onChange={e => setSelectedProgram(e.target.value)}>
                                <option value="Western">Western Education</option>
                                <option value="Arabic">Arabic Studies</option>
                                <option value="Quran">Quran Memorization</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-bold text-brown-700 mb-1">Class</label>
                            <select className="w-full p-2 border border-brown-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20"><option>JSS 1</option><option>Tahfeez 1</option></select>
                        </div>
                        <button className="px-6 bg-primary hover:bg-primary-dark text-white rounded-lg font-bold flex items-center gap-2 transition-all"><Filter size={18} /> Load</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {studentMarks.map((student) => (
                            <div key={student.id} className="bg-cream-50 p-6 rounded-xl border border-brown-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                                <div className={`absolute top-0 left-0 w-1 h-full ${selectedProgram === 'Quran' ? 'bg-amber-500' : 'bg-primary'}`}></div>
                                <h3 className="font-bold text-brown-800">{student.name}</h3>
                                <p className="text-xs text-brown-500 mb-3">{student.admissionNo}</p>
                                <div className="flex justify-between items-center pt-3 border-t border-brown-100">
                                    <span className="text-sm font-bold text-brown-600">Avg: {student.total}%</span>
                                    <button onClick={() => { setCurrentReportStudent(student); setIsReportModalOpen(true); }} className="text-primary hover:text-primary-dark text-sm font-bold flex items-center gap-1"><Eye size={16} /> View</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Schedule Modal */}
            <Modal isOpen={isExamModalOpen} onClose={() => setIsExamModalOpen(false)} title="Schedule New Exam">
                <form onSubmit={handleSaveExam} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-brown-700 mb-1">Program</label>
                        <select className="w-full p-2.5 bg-white border border-brown-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" value={examForm.program} onChange={e => setExamForm({ ...examForm, program: e.target.value })}>
                            <option value="Western">Western Education</option>
                            <option value="Arabic">Arabic Studies</option>
                            <option value="Quran">Quran Memorization</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-brown-700 mb-1">Exam Type</label>
                            <select className="w-full p-2.5 bg-white border border-brown-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" value={examForm.type} onChange={e => setExamForm({ ...examForm, type: e.target.value })}>
                                <option value="CBT">CBT (Auto-Marked)</option>
                                <option value="Theory">Theory/Manual</option>
                                <option value="Oral">Oral Assessment</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brown-700 mb-1">Duration (Mins)</label>
                            <input type="number" className="w-full p-2.5 border border-brown-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" value={examForm.duration} onChange={e => setExamForm({ ...examForm, duration: e.target.value })} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-brown-700 mb-1">Result Visibility</label>
                        <select className="w-full p-2.5 bg-white border border-brown-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" value={examForm.visibility} onChange={e => setExamForm({ ...examForm, visibility: e.target.value })}>
                            <option value="immediate">Immediate (Show score after submit)</option>
                            <option value="delayed">Delayed (Release later by admin)</option>
                            <option value="hidden">Hidden (Admins only)</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-sm font-medium text-brown-700 mb-1">Subject</label><input className="w-full p-2.5 border border-brown-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" value={examForm.subject} onChange={e => setExamForm({ ...examForm, subject: e.target.value })} /></div>
                        <div><label className="block text-sm font-medium text-brown-700 mb-1">Class</label><input className="w-full p-2.5 border border-brown-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" value={examForm.class} onChange={e => setExamForm({ ...examForm, class: e.target.value })} /></div>
                    </div>
                    <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-bold shadow-md mt-4 transition-all">Save Schedule</button>
                </form>
            </Modal>

            {/* Report Modal */}
            <Modal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} title="Academic Report">
                {currentReportStudent && (
                    <div className="space-y-6">
                        <div className="text-center border-b border-brown-200 pb-4">
                            <h2 className="text-2xl font-bold text-brown-900 uppercase">Springdale High School</h2>
                            <p className="font-bold text-primary text-sm uppercase tracking-widest">{selectedProgram} Education Report</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <p><span className="text-brown-500">Name:</span> <b className="text-brown-800">{currentReportStudent.name}</b></p>
                            <p><span className="text-brown-500">Admission No:</span> <b className="text-brown-800">{currentReportStudent.admissionNo}</b></p>
                        </div>
                        <table className="w-full text-sm border border-brown-200 rounded-lg overflow-hidden">
                            <thead className="bg-brown-100 font-bold text-brown-700">
                                <tr>
                                    <th className="p-2 text-left">Subject</th>
                                    <th className="p-2 text-center">{getReportLabels(selectedProgram).c1}</th>
                                    <th className="p-2 text-center">{getReportLabels(selectedProgram).c2}</th>
                                    <th className="p-2 text-center">{getReportLabels(selectedProgram).c3}</th>
                                    <th className="p-2 text-center">Total</th>
                                    <th className="p-2 text-center">Grade</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brown-100">
                                <tr>
                                    <td className="p-2 font-medium text-brown-800">{selectedProgram === 'Quran' ? 'Hifz' : selectedProgram === 'Arabic' ? 'Nahw' : 'Mathematics'}</td>
                                    <td className="p-2 text-center text-brown-600">{currentReportStudent.p1}</td>
                                    <td className="p-2 text-center text-brown-600">{currentReportStudent.p2}</td>
                                    <td className="p-2 text-center text-brown-600">{currentReportStudent.p3}</td>
                                    <td className="p-2 text-center font-bold text-brown-900">{currentReportStudent.total}</td>
                                    <td className="p-2 text-center font-bold text-green-600">{currentReportStudent.grade}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="flex gap-3 pt-4 border-t border-brown-200">
                            <button onClick={() => window.print()} className="flex-1 bg-brown-900 text-white py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-brown-800 transition-all"><Printer size={16} /> Print</button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ExamManagement;
