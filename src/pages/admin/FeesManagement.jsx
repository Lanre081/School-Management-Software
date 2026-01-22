import React, { useState } from 'react';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import { Plus, DollarSign, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const FeesManagement = () => {
    const [fees, setFees] = useState([
        { id: 1, student: 'John Smith', class: 'Class 10-A', amount: 5000, dueDate: '2024-03-01', status: 'Paid', paidDate: '2024-02-28' },
        { id: 2, student: 'Emma Johnson', class: 'Class 10-A', amount: 5000, dueDate: '2024-03-01', status: 'Paid', paidDate: '2024-02-25' },
        { id: 3, student: 'Michael Brown', class: 'Class 10-A', amount: 5000, dueDate: '2024-03-01', status: 'Pending', paidDate: '-' },
        { id: 4, student: 'Sarah Davis', class: 'Class 10-B', amount: 5000, dueDate: '2024-03-01', status: 'Overdue', paidDate: '-' },
        { id: 5, student: 'James Wilson', class: 'Class 9-A', amount: 4500, dueDate: '2024-03-01', status: 'Paid', paidDate: '2024-02-20' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentFee, setCurrentFee] = useState(null);
    const [formData, setFormData] = useState({ student: '', class: '', amount: '', dueDate: '', status: 'Pending' });

    const stats = {
        total: fees.reduce((acc, f) => acc + f.amount, 0),
        collected: fees.filter(f => f.status === 'Paid').reduce((acc, f) => acc + f.amount, 0),
        pending: fees.filter(f => f.status === 'Pending').reduce((acc, f) => acc + f.amount, 0),
        overdue: fees.filter(f => f.status === 'Overdue').reduce((acc, f) => acc + f.amount, 0),
    };

    const columns = [
        { header: 'Student', accessor: 'student' },
        { header: 'Class', accessor: 'class' },
        { header: 'Amount', accessor: 'amount', render: (row) => <span className="font-semibold text-brown-900">${row.amount.toLocaleString()}</span> },
        { header: 'Due Date', accessor: 'dueDate' },
        {
            header: 'Status', accessor: 'status', render: (row) => {
                const styles = { Paid: 'bg-green-100 text-green-700 border border-green-200', Pending: 'bg-amber-100 text-amber-700 border border-amber-200', Overdue: 'bg-red-100 text-red-700 border border-red-200' };
                const icons = { Paid: <CheckCircle size={14} />, Pending: <Clock size={14} />, Overdue: <AlertCircle size={14} /> };
                return <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${styles[row.status]}`}>{icons[row.status]}{row.status}</span>;
            }
        },
        { header: 'Paid Date', accessor: 'paidDate' },
    ];

    const handleAdd = () => { setCurrentFee(null); setFormData({ student: '', class: '', amount: '', dueDate: '', status: 'Pending' }); setIsModalOpen(true); };
    const handleEdit = (fee) => { setCurrentFee(fee); setFormData(fee); setIsModalOpen(true); };
    const handleDelete = (fee) => { if (window.confirm(`Delete fee record for ${fee.student}?`)) setFees(fees.filter(f => f.id !== fee.id)); };
    const handleSave = (e) => { e.preventDefault(); const data = { ...formData, amount: Number(formData.amount), paidDate: formData.status === 'Paid' ? new Date().toISOString().split('T')[0] : '-' }; currentFee ? setFees(fees.map(f => f.id === currentFee.id ? { ...data, id: f.id } : f)) : setFees([...fees, { ...data, id: Date.now() }]); setIsModalOpen(false); };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-brown-900 flex items-center gap-3">
                        <div className="p-2 bg-cream-200 rounded-lg"><DollarSign className="text-primary" size={28} /></div>
                        Fees Management
                    </h1>
                    <p className="text-brown-500 mt-1">Track and manage student fees</p>
                </div>
                <button onClick={handleAdd} className="bg-primary text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary-dark shadow-md">
                    <Plus size={20} />Add Fee Record
                </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-cream-50 rounded-xl p-4 border border-brown-200 shadow-sm"><p className="text-sm text-brown-500">Total Fees</p><p className="text-2xl font-bold text-brown-900">${stats.total.toLocaleString()}</p></div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-200"><p className="text-sm text-green-600">Collected</p><p className="text-2xl font-bold text-green-700">${stats.collected.toLocaleString()}</p></div>
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200"><p className="text-sm text-amber-600">Pending</p><p className="text-2xl font-bold text-amber-700">${stats.pending.toLocaleString()}</p></div>
                <div className="bg-red-50 rounded-xl p-4 border border-red-200"><p className="text-sm text-red-600">Overdue</p><p className="text-2xl font-bold text-red-700">${stats.overdue.toLocaleString()}</p></div>
            </div>

            <Table columns={columns} data={fees} onEdit={handleEdit} onDelete={handleDelete} />

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentFee ? "Edit Fee" : "Add Fee Record"}>
                <form onSubmit={handleSave} className="space-y-4">
                    <div><label className="block text-sm font-medium text-brown-700 mb-1">Student Name</label><input type="text" required className="w-full p-2.5 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" value={formData.student} onChange={e => setFormData({ ...formData, student: e.target.value })} /></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-sm font-medium text-brown-700 mb-1">Class</label><input type="text" required className="w-full p-2.5 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" value={formData.class} onChange={e => setFormData({ ...formData, class: e.target.value })} /></div>
                        <div><label className="block text-sm font-medium text-brown-700 mb-1">Amount ($)</label><input type="number" required className="w-full p-2.5 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-sm font-medium text-brown-700 mb-1">Due Date</label><input type="date" required className="w-full p-2.5 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" value={formData.dueDate} onChange={e => setFormData({ ...formData, dueDate: e.target.value })} /></div>
                        <div>
                            <label className="block text-sm font-medium text-brown-700 mb-1">Status</label>
                            <select className="w-full p-2.5 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-white" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                <option value="Pending">Pending</option>
                                <option value="Paid">Paid</option>
                                <option value="Overdue">Overdue</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-brown-100">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-brown-600 hover:text-brown-800 hover:bg-cream-100 rounded-lg transition-colors">Cancel</button>
                        <button type="submit" className="px-6 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark shadow-md">Save</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default FeesManagement;
