import React, { useState } from 'react';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import { Plus, Search, Bell } from 'lucide-react';

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([
        {
            id: 1,
            title: 'Winter Break Notice',
            message: 'School will be closed from Dec 20 to Jan 5 for winter break.',
            target: 'All',
            priority: 'High',
            date: '2026-01-10'
        },
        {
            id: 2,
            title: 'Parent-Teacher Meeting',
            message: 'Annual parent-teacher meeting scheduled for January 25th.',
            target: 'Parents',
            priority: 'Medium',
            date: '2026-01-08'
        },
        {
            id: 3,
            title: 'Sports Day Event',
            message: 'Annual sports day will be held on February 15th. All students must participate.',
            target: 'Students',
            priority: 'High',
            date: '2026-01-05'
        },
        {
            id: 4,
            title: 'Staff Training Workshop',
            message: 'Mandatory training session on new teaching methodologies.',
            target: 'Teachers',
            priority: 'Medium',
            date: '2026-01-03'
        },
        {
            id: 5,
            title: 'Library Updates',
            message: 'New books have been added to the library. Students can issue them from Monday.',
            target: 'Students',
            priority: 'Low',
            date: '2026-01-02'
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        message: '',
        target: 'All',
        priority: 'Medium'
    });
    const [searchTerm, setSearchTerm] = useState('');

    const columns = [
        { header: 'Title', accessor: 'title' },
        {
            header: 'Message',
            accessor: 'message',
            render: (row) => (
                <span className="line-clamp-2 max-w-md text-brown-600">{row.message}</span>
            )
        },
        {
            header: 'Target',
            accessor: 'target',
            render: (row) => (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-cream-200 text-brown-800 border border-brown-200">
                    {row.target}
                </span>
            )
        },
        {
            header: 'Priority',
            accessor: 'priority',
            render: (row) => (
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${row.priority === 'High' ? 'bg-red-100 text-red-700 border border-red-200' :
                    row.priority === 'Medium' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                        'bg-green-100 text-green-700 border border-green-200'
                    }`}>
                    {row.priority}
                </span>
            )
        },
        { header: 'Date', accessor: 'date' },
    ];

    const handleAdd = () => {
        setCurrentAnnouncement(null);
        setFormData({ title: '', message: '', target: 'All', priority: 'Medium' });
        setIsModalOpen(true);
    };

    const handleEdit = (announcement) => {
        setCurrentAnnouncement(announcement);
        setFormData(announcement);
        setIsModalOpen(true);
    };

    const handleDelete = (announcement) => {
        if (window.confirm(`Are you sure you want to delete "${announcement.title}"?`)) {
            setAnnouncements(announcements.filter(a => a.id !== announcement.id));
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (currentAnnouncement) {
            setAnnouncements(announcements.map(a =>
                a.id === currentAnnouncement.id ? { ...formData, id: a.id, date: a.date } : a
            ));
        } else {
            setAnnouncements([...announcements, {
                ...formData,
                id: Date.now(),
                date: new Date().toISOString().split('T')[0]
            }]);
        }
        setIsModalOpen(false);
    };

    const filteredAnnouncements = announcements.filter(a =>
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.target.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-brown-900 flex items-center gap-3">
                        <Bell className="text-primary" size={36} />
                        Announcements
                    </h1>
                    <p className="text-brown-600 mt-1">Create and manage school announcements</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="bg-gradient-to-r from-primary to-primary-dark text-cream px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                >
                    <Plus size={20} />
                    Add Announcement
                </button>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-brown-200 p-4">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brown-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search announcements by title, message, or target..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border-2 border-brown-200 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-brown-900 placeholder-brown-400"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-brown-200 shadow-sm">
                <Table
                    columns={columns}
                    data={filteredAnnouncements}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={currentAnnouncement ? "Edit Announcement" : "Add New Announcement"}
            >
                <form onSubmit={handleSave} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-brown-700 mb-2">Title</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 border-2 border-brown-200 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Enter announcement title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-brown-700 mb-2">Message</label>
                        <textarea
                            required
                            rows="4"
                            className="w-full px-4 py-3 border-2 border-brown-200 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                            value={formData.message}
                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Enter announcement message"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-brown-700 mb-2">Target Audience</label>
                            <select
                                required
                                className="w-full px-4 py-3 border-2 border-brown-200 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white"
                                value={formData.target}
                                onChange={e => setFormData({ ...formData, target: e.target.value })}
                            >
                                <option value="All">All</option>
                                <option value="Students">Students</option>
                                <option value="Teachers">Teachers</option>
                                <option value="Parents">Parents</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-brown-700 mb-2">Priority</label>
                            <select
                                required
                                className="w-full px-4 py-3 border-2 border-brown-200 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white"
                                value={formData.priority}
                                onChange={e => setFormData({ ...formData, priority: e.target.value })}
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-brown-100">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-6 py-2.5 text-brown-600 hover:text-brown-800 font-medium hover:bg-cream-100 rounded-lg transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-cream rounded-lg font-bold shadow-md hover:shadow-lg transition-all"
                        >
                            Save Announcement
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Announcements;
