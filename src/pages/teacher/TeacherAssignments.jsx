import React, { useState } from 'react';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import { Plus, FileText, Calendar, CheckCircle } from 'lucide-react';

const TeacherAssignments = () => {
    const [assignments, setAssignments] = useState([
        { id: 1, title: 'Algebra Practice Set', class: 'Class 10-A', dueDate: '2024-03-20', submissions: 28, total: 32, status: 'Active' },
        { id: 2, title: 'Geometry Problems', class: 'Class 10-B', dueDate: '2024-03-22', submissions: 30, total: 30, status: 'Completed' },
        { id: 3, title: 'Trigonometry Quiz', class: 'Class 9-A', dueDate: '2024-03-25', submissions: 15, total: 28, status: 'Active' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', class: '', dueDate: '', description: '' });

    const columns = [
        { header: 'Assignment', accessor: 'title' },
        { header: 'Class', accessor: 'class' },
        { header: 'Due Date', accessor: 'dueDate' },
        { header: 'Submissions', accessor: 'submissions', render: (row) => <span className="font-semibold">{row.submissions}/{row.total}</span> },
        {
            header: 'Status', accessor: 'status', render: (row) => (
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${row.status === 'Active' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                    {row.status}
                </span>
            )
        },
    ];

    const handleAdd = () => { setFormData({ title: '', class: '', dueDate: '', description: '' }); setIsModalOpen(true); };
    const handleDelete = (a) => { if (window.confirm(`Delete "${a.title}"?`)) setAssignments(assignments.filter(x => x.id !== a.id)); };
    const handleSave = (e) => { e.preventDefault(); setAssignments([...assignments, { ...formData, id: Date.now(), submissions: 0, total: 32, status: 'Active' }]); setIsModalOpen(false); };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 rounded-lg"><FileText className="text-indigo-600" size={28} /></div>
                        Assignments
                    </h1>
                    <p className="text-gray-500 mt-1">Create and manage assignments</p>
                </div>
                <button onClick={handleAdd} className="bg-primary text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary-dark shadow-md">
                    <Plus size={20} />New Assignment
                </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 border shadow-sm"><p className="text-sm text-gray-500">Total</p><p className="text-2xl font-bold text-gray-800">{assignments.length}</p></div>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200"><p className="text-sm text-blue-600">Active</p><p className="text-2xl font-bold text-blue-700">{assignments.filter(a => a.status === 'Active').length}</p></div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-200"><p className="text-sm text-green-600">Completed</p><p className="text-2xl font-bold text-green-700">{assignments.filter(a => a.status === 'Completed').length}</p></div>
            </div>

            <Table columns={columns} data={assignments} onDelete={handleDelete} />

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Assignment">
                <form onSubmit={handleSave} className="space-y-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Title</label><input type="text" required className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} /></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Class</label><select required className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary" value={formData.class} onChange={e => setFormData({ ...formData, class: e.target.value })}><option value="">Select</option><option>Class 10-A</option><option>Class 10-B</option><option>Class 9-A</option></select></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label><input type="date" required className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary" value={formData.dueDate} onChange={e => setFormData({ ...formData, dueDate: e.target.value })} /></div>
                    </div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea rows={3} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary resize-none" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} /></div>
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                        <button type="submit" className="px-6 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark shadow-md">Create</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default TeacherAssignments;
