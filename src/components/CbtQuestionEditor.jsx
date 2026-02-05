import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2, Circle, Save, HelpCircle, FileText, Upload } from 'lucide-react';
import clsx from 'clsx';

const CbtQuestionEditor = ({ exam, onSave, onBack, userRole = 'teacher' }) => { // Roles: 'admin', 'teacher'
    const [questions, setQuestions] = useState(exam.questions || []);

    const [filterStatus, setFilterStatus] = useState('all');

    const addQuestion = () => {
        setQuestions([...questions, {
            id: Date.now(),
            text: '', options: ['', '', '', ''],
            correctAnswer: '', type: 'mcq', marks: 5,
            status: 'draft', // draft, submitted, approved, rejected
            difficulty: 'medium', // easy, medium, hard
            rejectionReason: ''
        }]);
    };

    const removeQuestion = (id) => {
        if (userRole === 'teacher') {
            const q = questions.find(q => q.id === id);
            if (q.status === 'approved' || q.status === 'submitted') {
                alert('Cannot delete submitted or approved questions.');
                return;
            }
        }
        setQuestions(questions.filter(q => q.id !== id));
    };

    const updateQuestion = (id, field, value) => {
        setQuestions(questions.map(q => {
            if (q.id !== id) return q;

            // Logic: Who can edit what?
            if (userRole === 'teacher') {
                // Teachers can't edit if submitted or approved, unless reverted to draft
                if (q.status === 'submitted' || q.status === 'approved') return q;
            }
            // Admins can always edit/override, but usually they just review status

            return { ...q, [field]: value };
        }));
    };

    const handleStatusChange = (id, newStatus, reason = '') => {
        setQuestions(questions.map(q => {
            if (q.id === id) {
                return { ...q, status: newStatus, rejectionReason: reason };
            }
            return q;
        }));
    };

    const updateOption = (qId, optIdx, value) => {
        setQuestions(questions.map(q => {
            if (q.id !== qId) return q;
            if (userRole === 'teacher' && (q.status === 'submitted' || q.status === 'approved')) return q;

            const newOpts = [...q.options];
            newOpts[optIdx] = value;
            return { ...q, options: newOpts };
        }));
    };

    const handleSave = () => {
        onSave(questions);
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'draft': return <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-black uppercase">Draft</span>;
            case 'submitted': return <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-black uppercase animate-pulse">Pending Review</span>;
            case 'approved': return <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-black uppercase">Approved</span>;
            case 'rejected': return <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-black uppercase">Rejected</span>;
            default: return null;
        }
    };

    const filteredQuestions = filterStatus === 'all' ? questions : questions.filter(q => q.status === filterStatus);

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-brown-200 shadow-sm sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-brown-900 text-white rounded-xl">
                        <FileText size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-brown-900">{exam.subject} Question Bank</h2>
                        <div className="flex items-center gap-2 text-sm text-brown-500 font-bold uppercase tracking-widest">
                            <span className={clsx(
                                "px-2 py-0.5 rounded text-[10px]",
                                userRole === 'admin' ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                            )}>{userRole === 'admin' ? 'Examiner Mode' : 'Teacher Mode'}</span>
                            <span>• {questions.length} Questions</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    {userRole === 'teacher' && (
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-cream-100 text-brown-700 rounded-xl font-bold border border-brown-200 hover:bg-cream-200 transition-all">
                            <Upload size={18} /> Bulk Upload
                        </button>
                    )}
                    <button onClick={handleSave} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-primary text-white rounded-xl font-black shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
                        <Save size={18} /> Save Progress
                    </button>
                </div>
            </div>

            {/* Admin Filter Bar */}
            {userRole === 'admin' && (
                <div className="flex gap-2 p-1 bg-white border border-brown-200 rounded-xl w-fit">
                    {['all', 'submitted', 'approved', 'rejected'].map(s => (
                        <button
                            key={s}
                            onClick={() => setFilterStatus(s)}
                            className={clsx(
                                "px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all",
                                filterStatus === s ? "bg-brown-900 text-white" : "text-brown-500 hover:bg-cream-50"
                            )}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            )}

            <div className="space-y-4">
                {filteredQuestions.map((q, qIdx) => (
                    <div key={q.id} className={clsx(
                        "bg-white rounded-2xl border shadow-sm overflow-hidden group transition-all",
                        q.status === 'rejected' ? "border-red-200" : "border-brown-200"
                    )}>
                        <div className="p-4 bg-brown-50 border-b border-brown-100 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-brown-900 text-white flex items-center justify-center font-black text-sm">
                                    {qIdx + 1}
                                </span>
                                {getStatusBadge(q.status)}
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-brown-500 uppercase">Diff:</span>
                                    <select
                                        value={q.difficulty}
                                        onChange={(e) => updateQuestion(q.id, 'difficulty', e.target.value)}
                                        disabled={userRole === 'teacher' && (q.status === 'submitted' || q.status === 'approved')}
                                        className="bg-transparent text-xs font-bold text-brown-900 border-none outline-none focus:ring-0 cursor-pointer"
                                    >
                                        <option value="easy">Easy</option>
                                        <option value="medium">Medium</option>
                                        <option value="hard">Hard</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-brown-500 uppercase">Type:</span>
                                    <select
                                        value={q.type}
                                        onChange={(e) => updateQuestion(q.id, 'type', e.target.value)}
                                        disabled={userRole === 'teacher' && (q.status === 'submitted' || q.status === 'approved')}
                                        className="bg-transparent text-xs font-bold text-brown-900 border-none outline-none focus:ring-0 cursor-pointer"
                                    >
                                        <option value="mcq">MCQ</option>
                                        <option value="tf">True/False</option>
                                        <option value="theory">Theory</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-brown-500 uppercase">Marks:</span>
                                    <input
                                        type="number"
                                        value={q.marks}
                                        onChange={(e) => updateQuestion(q.id, 'marks', e.target.value)}
                                        disabled={userRole === 'teacher' && (q.status === 'submitted' || q.status === 'approved')}
                                        className="w-12 p-1 border border-brown-200 rounded text-center text-sm font-bold text-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                    />
                                </div>
                                {userRole === 'teacher' && q.status === 'draft' && (
                                    <button onClick={() => removeQuestion(q.id)} className="p-2 text-brown-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Rejected Reason Banner */}
                        {q.status === 'rejected' && (
                            <div className="px-6 py-3 bg-red-50 text-red-700 text-sm font-medium border-b border-red-100 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <strong>Examiner Comment:</strong> {q.rejectionReason}
                            </div>
                        )}

                        <div className={clsx("p-6 space-y-4", (q.status === 'submitted' || q.status === 'approved') && userRole === 'teacher' && "opacity-60 grayscale-[0.5] pointer-events-none")}>
                            <div>
                                <textarea
                                    value={q.text}
                                    onChange={(e) => updateQuestion(q.id, 'text', e.target.value)}
                                    className="w-full p-4 bg-cream-50 border border-brown-100 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-brown-900 min-h-[100px]"
                                    placeholder="Enter the question here..."
                                    readOnly={userRole === 'teacher' && (q.status === 'submitted' || q.status === 'approved')}
                                />
                            </div>

                            {q.type !== 'theory' ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {q.options.slice(0, q.type === 'tf' ? 2 : 4).map((opt, optIdx) => (
                                        <div key={optIdx} className="relative group/option">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuestion(q.id, 'correctAnswer', opt)}
                                                    className={clsx(
                                                        "transition-all",
                                                        q.correctAnswer === opt && opt !== '' ? "text-green-600 scale-110" : "text-brown-200 hover:text-brown-400"
                                                    )}
                                                    disabled={userRole === 'teacher' && (q.status === 'submitted' || q.status === 'approved')}
                                                >
                                                    {q.correctAnswer === opt && opt !== '' ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                                                </button>
                                                <span className="text-xs font-black text-brown-400">{String.fromCharCode(65 + optIdx)}</span>
                                            </div>
                                            <input
                                                value={opt}
                                                onChange={(e) => updateOption(q.id, optIdx, e.target.value)}
                                                className={clsx(
                                                    "w-full pl-16 pr-4 py-3 bg-white border rounded-xl outline-none transition-all font-bold",
                                                    q.correctAnswer === opt && opt !== ''
                                                        ? "border-green-500 ring-2 ring-green-100 bg-green-50/30"
                                                        : "border-brown-100 focus:border-primary/50"
                                                )}
                                                placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                                                disabled={q.type === 'tf' || (userRole === 'teacher' && (q.status === 'submitted' || q.status === 'approved'))}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
                                    <HelpCircle className="text-amber-600 shrink-0" size={20} />
                                    <p className="text-xs text-amber-700 font-bold leading-relaxed">
                                        Note: Short Answer questions require manual marking by the teacher after the exam is submitted.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Action Bar */}
                        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                            {userRole === 'teacher' && (
                                <>
                                    {q.status === 'draft' || q.status === 'rejected' ? (
                                        <button
                                            onClick={() => handleStatusChange(q.id, 'submitted')}
                                            className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold shadow hover:bg-blue-700 transition-all"
                                        >
                                            Submit for Review
                                        </button>
                                    ) : q.status === 'submitted' ? (
                                        <button
                                            onClick={() => handleStatusChange(q.id, 'draft')}
                                            className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-300 transition-all"
                                        >
                                            Recall to Edit
                                        </button>
                                    ) : null}
                                </>
                            )}

                            {userRole === 'admin' && q.status === 'submitted' && (
                                <>
                                    <button
                                        onClick={() => {
                                            const reason = prompt("Enter rejection reason:");
                                            if (reason) handleStatusChange(q.id, 'rejected', reason);
                                        }}
                                        className="px-4 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs font-bold hover:bg-red-200 transition-all border border-red-200"
                                    >
                                        Reject
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(q.id, 'approved')}
                                        className="px-4 py-1.5 bg-green-600 text-white rounded-lg text-xs font-bold shadow hover:bg-green-700 transition-all"
                                    >
                                        Approve
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}

                {userRole === 'teacher' && (
                    <button
                        onClick={addQuestion}
                        className="w-full py-6 border-2 border-dashed border-brown-200 rounded-2xl text-brown-400 hover:text-primary hover:border-primary hover:bg-cream-50 transition-all flex flex-col items-center justify-center gap-2 group"
                    >
                        <div className="p-3 bg-brown-50 group-hover:bg-primary/10 rounded-full transition-all">
                            <Plus size={24} />
                        </div>
                        <span className="font-black uppercase tracking-[0.2em] text-xs">Add New Question</span>
                    </button>
                )}
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-brown-200">
                <button
                    onClick={onBack}
                    className="px-8 py-3 rounded-xl font-bold text-brown-500 hover:bg-white transition-all"
                >
                    Back to Exams
                </button>
                <div className="text-right">
                    <p className="text-xs text-brown-400 font-bold mb-1">
                        {questions.filter(q => q.status === 'approved').length} Approved • {questions.filter(q => q.status === 'submitted').length} Pending
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CbtQuestionEditor;
