import React, { useState } from 'react';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import { Plus, BookOpen, Hash } from 'lucide-react';

const SubjectList = () => {
    const [subjects, setSubjects] = useState([
        { id: 1, name: 'Mathematics', code: 'MATH101', description: 'Algebra, Geometry, Calculus', assignedClasses: 'Class 10-A, 10-B', teacher: 'Mr. Anderson' },
        { id: 2, name: 'English', code: 'ENG101', description: 'Grammar, Literature, Writing', assignedClasses: 'Class 10-A, 10-B, 9-A', teacher: 'Mrs. Davis' },
        { id: 3, name: 'Science', code: 'SCI101', description: 'Physics, Chemistry, Biology', assignedClasses: 'Class 9-A, 9-B', teacher: 'Mr. Wilson' },
        { id: 4, name: 'History', code: 'HIS101', description: 'World History, Civics', assignedClasses: 'Class 8-A, 8-B', teacher: 'Ms. Johnson' },
        { id: 5, name: 'Computer Science', code: 'CS101', description: 'Programming, Algorithms', assignedClasses: 'Class 10-A, 10-B', teacher: 'Mr. Brown' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSubject, setCurrentSubject] = useState(null);
    const [formData, setFormData] = useState({
        name: '', code: '', description: '', assignedClasses: '', teacher: ''
    });

    const columns = [
        {
            header: 'Subject',
            accessor: 'name',
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                        <BookOpen size={18} className="text-primary" />
                    </div>
                    <div>
                        <p className="font-semibold text-brown-900">{row.name}</p>
                        <p className="text-xs text-brown-500">{row.code}</p>
                    </div>
                </div>
            )
        },
        { header: 'Description', accessor: 'description' },
        { header: 'Assigned Classes', accessor: 'assignedClasses' },
        { header: 'Teacher', accessor: 'teacher' },
    ];

    const handleAdd = () => {
        setCurrentSubject(null);
        setFormData({ name: '', code: '', description: '', assignedClasses: '', teacher: '' });
        setIsModalOpen(true);
    };

    const handleEdit = (subject) => {
        setCurrentSubject(subject);
        setFormData(subject);
        setIsModalOpen(true);
    };

    const handleDelete = (subject) => {
        if (window.confirm(`Delete ${subject.name}?`)) {
            setSubjects(subjects.filter(s => s.id !== subject.id));
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (currentSubject) {
            setSubjects(subjects.map(s => s.id === currentSubject.id ? { ...formData, id: s.id } : s));
        } else {
            setSubjects([...subjects, { ...formData, id: Date.now() }]);
        }
        setIsModalOpen(false);
    };

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-brown-900 flex items-center gap-3">
                        <div className="p-2 bg-cream-200 rounded-lg">
                            <Hash className="text-primary" size={28} />
                        </div>
                        Subject Management
                    </h1>
                    <p className="text-brown-500 mt-1">Manage curriculum subjects and assignments</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="bg-primary text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary-dark transition-all shadow-md hover:shadow-lg"
                >
                    <Plus size={20} />
                    Add Subject
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-cream-50 rounded-xl p-4 border border-brown-200 shadow-sm">
                    <p className="text-sm text-brown-500 font-medium mb-1">Total Subjects</p>
                    <p className="text-2xl font-bold text-brown-900">{subjects.length}</p>
                </div>
                <div className="bg-cream-50 rounded-xl p-4 border border-brown-200 shadow-sm">
                    <p className="text-sm text-brown-500 font-medium mb-1">Core Subjects</p>
                    <p className="text-2xl font-bold text-brown-900">3</p>
                </div>
                <div className="bg-cream-50 rounded-xl p-4 border border-brown-200 shadow-sm">
                    <p className="text-sm text-brown-500 font-medium mb-1">Electives</p>
                    <p className="text-2xl font-bold text-brown-900">2</p>
                </div>
                <div className="bg-cream-50 rounded-xl p-4 border border-brown-200 shadow-sm">
                    <p className="text-sm text-brown-500 font-medium mb-1">Teachers Assigned</p>
                    <p className="text-2xl font-bold text-brown-900">5</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-brown-200 shadow-sm">
                <Table
                    columns={columns}
                    data={subjects}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={currentSubject ? "Edit Subject" : "Add New Subject"}
            >
                <form onSubmit={handleSave} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-brown-700 mb-1">Subject Name</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g., Mathematics"
                                className="w-full p-2.5 border border-brown-200 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brown-700 mb-1">Subject Code</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g., MATH101"
                                className="w-full p-2.5 border border-brown-200 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                value={formData.code}
                                onChange={e => setFormData({ ...formData, code: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-brown-700 mb-1">Description</label>
                        <textarea
                            placeholder="Brief description of the subject..."
                            rows={2}
                            className="w-full p-2.5 border border-brown-200 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-brown-700 mb-1">Assigned Classes</label>
                        <input
                            type="text"
                            placeholder="e.g., Class 10-A, 10-B"
                            className="w-full p-2.5 border border-brown-200 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            value={formData.assignedClasses}
                            onChange={e => setFormData({ ...formData, assignedClasses: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-brown-700 mb-1">Assigned Teacher</label>
                        <input
                            type="text"
                            placeholder="e.g., Mr. Anderson"
                            className="w-full p-2.5 border border-brown-200 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            value={formData.teacher}
                            onChange={e => setFormData({ ...formData, teacher: e.target.value })}
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-brown-100">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-5 py-2.5 text-brown-600 hover:text-brown-800 hover:bg-cream-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors shadow-md"
                        >
                            {currentSubject ? 'Update' : 'Create'} Subject
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default SubjectList;
