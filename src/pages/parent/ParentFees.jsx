import React, { useState } from 'react';
import { DollarSign, Download, CreditCard, Clock, AlertCircle } from 'lucide-react';
import Table from '../../components/Table';

const ParentFees = () => {
    const [invoices] = useState([
        { id: 'INV-2026-001', title: 'Tuition Fee - Term 1', amount: 1200, dueDate: '2026-01-15', status: 'Pending' },
        { id: 'INV-2026-002', title: 'Bus Fee - January', amount: 150, dueDate: '2026-01-05', status: 'Overdue' },
        { id: 'INV-2025-012', title: 'Tuition Fee - Term 3 (Last Year)', amount: 1200, dueDate: '2025-09-15', status: 'Paid' },
        { id: 'INV-2025-011', title: 'Lab Utilities', amount: 50, dueDate: '2025-08-01', status: 'Paid' },
    ]);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Paid': return 'bg-green-100 text-green-700';
            case 'Pending': return 'bg-amber-100 text-amber-700';
            case 'Overdue': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const columns = [
        { header: 'Invoice ID', accessor: 'id' },
        { header: 'Description', accessor: 'title' },
        { header: 'Amount', accessor: 'amount', render: (row) => <span className="font-mono font-medium">${row.amount}</span> },
        { header: 'Due Date', accessor: 'dueDate' },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(row.status)}`}>
                    {row.status}
                </span>
            )
        },
        {
            header: 'Action',
            accessor: 'action', // Dummy accessor
            render: (row) => row.status !== 'Paid' ? (
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm">
                    <CreditCard size={14} /> Pay
                </button>
            ) : (
                <button className="text-gray-400 hover:text-indigo-600 transition-colors flex items-center gap-1 text-xs font-semibold">
                    <Download size={14} /> Receipt
                </button>
            )
        }
    ];

    const totalDue = invoices.filter(i => i.status !== 'Paid').reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <DollarSign className="text-red-600" size={28} />
                        </div>
                        Fee Payments
                    </h1>
                    <p className="text-gray-600 mt-1">Manage and pay your child's school fees</p>
                </div>
            </div>

            {/* Payment Overview */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>

                <div className="relative z-10">
                    <p className="text-gray-400 font-medium mb-1">Total Outstanding</p>
                    <h2 className="text-5xl font-bold font-mono">${totalDue.toFixed(2)}</h2>
                    <div className="flex items-center gap-2 mt-4 text-sm text-gray-300">
                        <AlertCircle size={16} className="text-amber-400" />
                        <span>Includes {invoices.filter(i => i.status === 'Overdue').length} overdue invoice(s)</span>
                    </div>
                </div>

                <div className="flex gap-3 relative z-10 w-full md:w-auto">
                    <button className="flex-1 md:flex-none bg-white text-gray-900 px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                        <CreditCard size={20} />
                        Pay All Due
                    </button>
                    <button className="flex-1 md:flex-none bg-gray-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-gray-600 transition-all flex items-center justify-center gap-2">
                        <Clock size={20} />
                        History
                    </button>
                </div>
            </div>

            {/* Invoices Table */}
            <div className="bg-white rounded-xl border shadow-sm">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">Invoice History</h2>
                </div>
                <Table
                    columns={columns}
                    data={invoices}
                />
            </div>
        </div>
    );
};

export default ParentFees;
