import { Award, Save, Printer, Eye, Filter, Plus, Clock, Settings2, Monitor, FileText, ArrowLeft } from 'lucide-react';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import CbtQuestionEditor from '../../components/CbtQuestionEditor';
import clsx from 'clsx';

const [activeTab, setActiveTab] = useState('schedule');
const [selectedExam, setSelectedExam] = useState(null);
const [showExamModal, setShowExamModal] = useState(false);

// Mock Data for Teacher's Exams
const [exams, setExams] = useState([
    {
        id: 1, name: 'First Term Quiz', subject: 'Mathematics', class: 'JSS 1',
        date: '2025-11-20', status: 'Completed', type: 'CBT', duration: 20,
        visibility: 'immediate', questions: [
            { id: 1, text: '2+2?', options: ['3', '4', '5', '6'], correctAnswer: '4', type: 'mcq' }
        ]
    },
    {
        id: 2, name: 'Mid-Term Assessment', subject: 'Mathematics', class: 'JSS 1',
        date: '2025-12-05', status: 'Scheduled', type: 'Theory', duration: 120,
        visibility: 'delayed', questions: []
    },
]);

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
                <h1 className="text-3xl font-black text-brown-900 flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-primary to-primary-dark rounded-xl text-white shadow-lg">
                        <Award size={24} />
                    </div>
                    Exams & Grades
                </h1>
                <p className="text-brown-500 mt-1 ml-14 font-medium">Manage assessments and student performance</p>
            </div>
            {activeTab === 'schedule' && (
                <button
                    onClick={() => setShowExamModal(true)}
                    className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-dark transition-all shadow-xl shadow-primary/20"
                >
                    <Plus size={20} /> Create New Exam
                </button>
            )}
        </div>

        {/* Navigation Tabs */}
        {activeTab !== 'questions' && activeTab !== 'entry' && (
            <div className="flex gap-4 border-b border-brown-200">
                <button onClick={() => setActiveTab('schedule')} className={`pb-3 px-4 text-sm font-black border-b-2 transition-all ${activeTab === 'schedule' ? 'border-primary text-primary' : 'border-transparent text-brown-400 hover:text-brown-600'}`}>Exam Schedule</button>
                <button onClick={() => setActiveTab('grades')} className={`pb-3 px-4 text-sm font-black border-b-2 transition-all ${activeTab === 'grades' ? 'border-primary text-primary' : 'border-transparent text-brown-400 hover:text-brown-600'}`}>Grade Book</button>
            </div>
        )}

        {activeTab === 'schedule' && (
            <div className="bg-white rounded-2xl shadow-sm border border-brown-200 overflow-hidden">
                <Table
                    data={exams}
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
                                            <p className="text-xs text-brown-400">{row.name}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        },
                        { header: 'Class', accessor: 'class' },
                        {
                            header: 'Settings', accessor: 'duration', render: (row) => (
                                <div className="space-y-1">
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-brown-600">
                                        <Clock size={12} /> {row.duration} mins
                                    </div>
                                    <div className="text-[10px] font-black uppercase text-primary-light">
                                        Visibility: {row.visibility}
                                    </div>
                                </div>
                            )
                        },
                        { header: 'Date', accessor: 'date' },
                        { header: 'Status', accessor: 'status', render: (r) => <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${r.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{r.status}</span> },
                        {
                            header: 'Actions', accessor: 'id', render: (row) => (
                                <div className="flex gap-2">
                                    {row.type === 'CBT' ? (
                                        <button
                                            onClick={() => { setSelectedExam(row); setActiveTab('questions'); }}
                                            className="px-3 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg text-xs font-bold flex items-center gap-1 border border-purple-200"
                                        >
                                            <Settings2 size={14} /> Questions
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => { setSelectedExam(row); setActiveTab('entry'); }}
                                            className="px-3 py-1.5 bg-cream-100 text-primary hover:bg-cream-200 rounded-lg text-xs font-bold flex items-center gap-1 border border-brown-200"
                                        >
                                            <Plus size={14} /> Enter Scores
                                        </button>
                                    )}
                                </div>
                            )
                        }
                    ]}
                    actions={false}
                />
            </div>
        )}

        {activeTab === 'questions' && selectedExam && (
            <CbtQuestionEditor
                exam={selectedExam}
                onBack={() => setActiveTab('schedule')}
                onSave={() => {
                    alert('Questions saved successfully!');
                    setActiveTab('schedule');
                }}
            />
        )}

        {activeTab === 'entry' && selectedExam && (
            <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-4 bg-cream-50 p-4 rounded-xl border border-brown-200">
                    <button onClick={() => setActiveTab('schedule')} className="p-2 hover:bg-white rounded-lg text-primary"><ArrowLeft size={20} /></button>
                    <div>
                        <h2 className="text-xl font-bold text-brown-900">{selectedExam.subject} <span className="text-brown-400 font-normal">| {selectedExam.name}</span></h2>
                        <p className="text-sm text-primary font-bold uppercase tracking-widest">{selectedExam.class}</p>
                    </div>
                    <div className="ml-auto">
                        <button onClick={() => { handleSave(); setActiveTab('schedule'); }} className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg font-bold shadow-md hover:bg-primary-dark transition-all">
                            <Save size={16} /> Save Scores
                        </button>
                    </div>
                </div>
                {/* Reuse grade entry table logic from original TeacherGrades */}
                <div className="bg-white rounded-2xl shadow-sm border border-brown-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-brown-50 border-b border-brown-100">
                            <tr>
                                <th className="p-4 font-black text-brown-600 text-sm">Student Name</th>
                                <th className="p-4 font-black text-brown-600 text-sm w-32 text-center">Score (Max 100)</th>
                                <th className="p-4 font-black text-brown-600 text-sm text-center">Grade</th>
                                <th className="p-4 font-black text-brown-600 text-sm">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brown-100">
                            {students.map((s) => (
                                <tr key={s.id}>
                                    <td className="p-4"><p className="font-bold text-brown-900">{s.name}</p><p className="text-xs text-brown-400">{s.admissionNo}</p></td>
                                    <td className="p-2">
                                        <input type="number" defaultValue={s.exam} className="w-full p-2 text-center border border-brown-100 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 bg-cream-50" />
                                    </td>
                                    <td className="p-4 text-center font-bold text-primary">{s.grade}</td>
                                    <td className="p-4"><span className="px-2 py-1 bg-green-50 text-green-700 rounded text-[10px] font-bold">SAVED</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {activeTab === 'grades' && (
            <div className="space-y-6 animate-fadeIn">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-brown-200 flex flex-wrap gap-4 items-end">
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-xs font-black text-brown-400 uppercase tracking-widest mb-1.5">Class Selection</label>
                        <select className="w-full p-2.5 bg-cream-50 border border-brown-100 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 font-bold text-brown-700">
                            <option>JSS 1</option>
                            <option>JSS 2</option>
                        </select>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-xs font-black text-brown-400 uppercase tracking-widest mb-1.5">Subject Selection</label>
                        <select className="w-full p-2.5 bg-cream-50 border border-brown-100 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 font-bold text-brown-700">
                            <option>Mathematics</option>
                        </select>
                    </div>
                    <button className="px-8 py-2.5 bg-brown-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all">
                        <Filter size={18} /> Load Data
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-brown-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-brown-50 border-b border-brown-100 text-xs font-black text-brown-600 uppercase">
                            <tr>
                                <th className="p-4">Student</th>
                                <th className="p-4 text-center">CA 1</th>
                                <th className="p-4 text-center">CA 2</th>
                                <th className="p-4 text-center">Exam</th>
                                <th className="p-4 text-center">Total</th>
                                <th className="p-4 text-center">Grade</th>
                                <th className="p-4">Report</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brown-100">
                            {students.map((student) => (
                                <tr key={student.id} className="hover:bg-cream-50 transition-colors group">
                                    <td className="p-4"><p className="font-bold text-brown-900 text-sm">{student.name}</p></td>
                                    <td className="p-4 text-center font-bold text-brown-600">{student.test1}</td>
                                    <td className="p-4 text-center font-bold text-brown-600">{student.test2}</td>
                                    <td className="p-4 text-center font-bold text-brown-600">{student.exam}</td>
                                    <td className="p-4 text-center font-black text-primary text-lg">{student.total}</td>
                                    <td className="p-4 text-center"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-black">{student.grade}</span></td>
                                    <td className="p-4"><button className="p-2 text-brown-300 hover:text-primary transition-all"><Eye size={18} /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

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
