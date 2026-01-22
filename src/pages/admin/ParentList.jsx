import React, { useState } from 'react';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import { Plus, Search, User, Phone, Mail, MapPin } from 'lucide-react';

const ParentList = () => {
    const [parents, setParents] = useState([
        {
            id: 1,
            name: 'Mr. Robert Doe',
            gender: 'Male',
            email: 'robert.doe@example.com',
            phone: '555-0101',
            address: '123 Main St, Springfield',
            relationship: 'Father',
            children: ['John Doe (10th A)', 'Emma Doe (6th B)'],
            nextOfKin: { name: 'Mrs. Sarah Doe', relation: 'Wife', phone: '555-0102' }
        },
        {
            id: 2,
            name: 'Mrs. Mary Smith',
            gender: 'Female',
            email: 'mary.smith@example.com',
            phone: '555-0202',
            address: '456 Oak Ave, Springfield',
            relationship: 'Mother',
            children: ['Jane Smith (10th A)'],
            nextOfKin: { name: 'Mr. James Smith', relation: 'Husband', phone: '555-0201' }
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentParent, setCurrentParent] = useState(null);
    const [formData, setFormData] = useState({
        name: '', gender: 'Male', email: '', phone: '', address: '',
        relationship: 'Father', childrenString: '',
        nokName: '', nokRelation: '', nokPhone: ''
    });
    const [searchTerm, setSearchTerm] = useState('');

    const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Gender', accessor: 'gender' },
        {
            header: 'Contact',
            accessor: 'phone',
            render: (row) => (
                <div className="text-sm">
                    <p className="flex items-center gap-1"><Phone size={12} className="text-brown-400" /> {row.phone}</p>
                    <p className="flex items-center gap-1"><Mail size={12} className="text-brown-400" /> {row.email}</p>
                </div>
            )
        },
        { header: 'Relationship', accessor: 'relationship' },
        {
            header: 'Children',
            accessor: 'children',
            render: (row) => (
                <div className="flex flex-wrap gap-1">
                    {row.children.map((child, i) => (
                        <span key={i} className="px-2 py-0.5 bg-cream-200 text-brown-800 rounded-full text-xs font-medium border border-brown-300">
                            {child}
                        </span>
                    ))}
                </div>
            )
        },
    ];

    const handleAdd = () => {
        setCurrentParent(null);
        setFormData({
            name: '', gender: 'Male', email: '', phone: '', address: '',
            relationship: 'Father', childrenString: '',
            nokName: '', nokRelation: '', nokPhone: ''
        });
        setIsModalOpen(true);
    };

    const handleEdit = (parent) => {
        setCurrentParent(parent);
        setFormData({
            ...parent,
            childrenString: parent.children.join(', '),
            nokName: parent.nextOfKin?.name || '',
            nokRelation: parent.nextOfKin?.relation || '',
            nokPhone: parent.nextOfKin?.phone || ''
        });
        setIsModalOpen(true);
    };

    const handleDelete = (parent) => {
        if (window.confirm(`Are you sure you want to delete ${parent.name}?`)) {
            setParents(parents.filter(p => p.id !== parent.id));
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        const parentData = {
            ...formData,
            children: formData.childrenString.split(',').map(s => s.trim()).filter(s => s),
            nextOfKin: {
                name: formData.nokName,
                relation: formData.nokRelation,
                phone: formData.nokPhone
            }
        };

        if (currentParent) {
            setParents(parents.map(p => p.id === currentParent.id ? { ...parentData, id: p.id } : p));
        } else {
            setParents([...parents, { ...parentData, id: Date.now() }]);
        }
        setIsModalOpen(false);
    };

    const filteredParents = parents.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.phone.includes(searchTerm)
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-brown-900">Parents & Guardians</h1>
                    <p className="text-brown-600 mt-1">Manage parent profiles and student relationships</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="bg-gradient-to-r from-primary to-primary-dark text-cream px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                    <Plus size={20} />
                    Add Parent
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-brown-200 p-4">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brown-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search parents by name, email, or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border-2 border-brown-200 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-brown-900 placeholder-brown-400"
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl border border-brown-200 shadow-sm">
                <Table
                    columns={columns}
                    data={filteredParents}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={currentParent ? "Edit Parent Profile" : "Add Parent Profile"}
            >
                <form onSubmit={handleSave} className="space-y-6">
                    {/* Personal Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-brown-400 uppercase tracking-wider border-b border-brown-100 pb-2">Personal Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Gender</label>
                                <select
                                    className="w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white"
                                    value={formData.gender}
                                    onChange={e => setFormData({ ...formData, gender: e.target.value })}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Phone</label>
                                <input
                                    type="tel"
                                    required
                                    className="w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-brown-700 mb-2">Address</label>
                            <textarea
                                className="w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                rows="2"
                                value={formData.address}
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                            ></textarea>
                        </div>
                    </div>

                    {/* Relationship Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-brown-400 uppercase tracking-wider border-b border-brown-100 pb-2">Family Link</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Relationship to Child</label>
                                <select
                                    className="w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white"
                                    value={formData.relationship}
                                    onChange={e => setFormData({ ...formData, relationship: e.target.value })}
                                >
                                    <option value="Father">Father</option>
                                    <option value="Mother">Mother</option>
                                    <option value="Guardian">Guardian</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Linked Student(s)</label>
                                <input
                                    type="text"
                                    placeholder="e.g. John Doe (10-A), Emma Doe (6-B)"
                                    className="w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    value={formData.childrenString}
                                    onChange={e => setFormData({ ...formData, childrenString: e.target.value })}
                                />
                                <p className="text-xs text-brown-500 mt-1">Separate multiple names with commas</p>
                            </div>
                        </div>
                    </div>

                    {/* Next of Kin */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-brown-400 uppercase tracking-wider border-b border-brown-100 pb-2">Emergency Contact (Next of Kin)</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    value={formData.nokName}
                                    onChange={e => setFormData({ ...formData, nokName: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Relation</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    value={formData.nokRelation}
                                    onChange={e => setFormData({ ...formData, nokRelation: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Phone</label>
                                <input
                                    type="tel"
                                    className="w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    value={formData.nokPhone}
                                    onChange={e => setFormData({ ...formData, nokPhone: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-brown-100 sticky bottom-0 bg-white pb-2">
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
                            Save Profile
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ParentList;
