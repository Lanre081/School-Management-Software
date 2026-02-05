import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2, Circle, Save, HelpCircle, FileText, Upload } from 'lucide-react';
import clsx from 'clsx';

const CbtQuestionEditor = ({ exam, onSave, onBack }) => {
    const [questions, setQuestions] = useState(exam.questions || [
        { id: Date.now(), text: '', options: ['', '', '', ''], correctAnswer: '', type: 'mcq', marks: 5 }
    ]);

    const addQuestion = () => {
        setQuestions([...questions, { id: Date.now(), text: '', options: ['', '', '', ''], correctAnswer: '', type: 'mcq', marks: 5 }]);
    };

    const removeQuestion = (id) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    const updateQuestion = (id, field, value) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q));
    };

    const updateOption = (qId, optIdx, value) => {
        setQuestions(questions.map(q => {
            if (q.id === qId) {
                const newOpts = [...q.options];
                newOpts[optIdx] = value;
                return { ...q, options: newOpts };
            }
            return q;
        }));
    };

    const handleSave = () => {
        onSave(questions);
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-brown-200 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-brown-900 text-white rounded-xl">
                        <FileText size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-brown-900">{exam.subject} Question Bank</h2>
                        <p className="text-sm text-brown-500 font-bold uppercase tracking-widest">{exam.name} • {questions.length} Questions</p>
                    </div>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-cream-100 text-brown-700 rounded-xl font-bold border border-brown-200 hover:bg-cream-200 transition-all">
                        <Upload size={18} /> Bulk Upload
                    </button>
                    <button onClick={handleSave} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-primary text-white rounded-xl font-black shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
                        <Save size={18} /> Save All
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {questions.map((q, qIdx) => (
                    <div key={q.id} className="bg-white rounded-2xl border border-brown-200 shadow-sm overflow-hidden group">
                        <div className="p-4 bg-brown-50 border-b border-brown-100 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-brown-900 text-white flex items-center justify-center font-black text-sm">
                                    {qIdx + 1}
                                </span>
                                <select
                                    value={q.type}
                                    onChange={(e) => updateQuestion(q.id, 'type', e.target.value)}
                                    className="bg-transparent border-none font-bold text-brown-700 focus:ring-0 cursor-pointer"
                                >
                                    <option value="mcq">Multiple Choice</option>
                                    <option value="tf">True / False</option>
                                    <option value="theory">Short Answer (Theory)</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-brown-500 uppercase">Marks:</span>
                                    <input
                                        type="number"
                                        value={q.marks}
                                        onChange={(e) => updateQuestion(q.id, 'marks', e.target.value)}
                                        className="w-12 p-1 border border-brown-200 rounded text-center text-sm font-bold text-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                    />
                                </div>
                                <button onClick={() => removeQuestion(q.id)} className="p-2 text-brown-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-black text-brown-400 uppercase tracking-widest mb-2">Question Text</label>
                                <textarea
                                    value={q.text}
                                    onChange={(e) => updateQuestion(q.id, 'text', e.target.value)}
                                    className="w-full p-4 bg-cream-50 border border-brown-100 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-brown-900 min-h-[100px]"
                                    placeholder="Enter the question here..."
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
                                                disabled={q.type === 'tf'}
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
                    </div>
                ))}

                <button
                    onClick={addQuestion}
                    className="w-full py-6 border-2 border-dashed border-brown-200 rounded-2xl text-brown-400 hover:text-primary hover:border-primary hover:bg-cream-50 transition-all flex flex-col items-center justify-center gap-2 group"
                >
                    <div className="p-3 bg-brown-50 group-hover:bg-primary/10 rounded-full transition-all">
                        <Plus size={24} />
                    </div>
                    <span className="font-black uppercase tracking-[0.2em] text-xs">Add New Question</span>
                </button>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-brown-200">
                <button
                    onClick={onBack}
                    className="px-8 py-3 rounded-xl font-bold text-brown-500 hover:bg-white transition-all"
                >
                    Cancel Changes
                </button>
                <button
                    onClick={handleSave}
                    className="px-12 py-4 bg-brown-900 text-white rounded-xl font-black text-lg shadow-xl hover:bg-black transition-all"
                >
                    Save Question Bank
                </button>
            </div>
        </div>
    );
};

export default CbtQuestionEditor;
