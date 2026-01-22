import React, { useState } from 'react';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import { Plus, Search, User, Briefcase, Phone, Mail, MapPin } from 'lucide-react';

const TeacherList = () => {
    const [teachers, setTeachers] = useState([
        {
            id: 1,
            staffId: 'STF-2023-001',
            name: 'Mr. John Anderson',
            gender: 'Male',
            dob: '1985-04-12',
            email: 'j.anderson@school.com',
            phone: '555-0101',
            address: '456 Oak Lane',
            qualifications: 'M.Sc. Mathematics',
            subjects: ['Mathematics', 'Physics'],
            classes: ['10th A', '9th B'],
            employmentType: 'Full-time',
            dateEmployed: '2015-08-01',
            status: 'Active',
            nextOfKin: { name: 'Mrs. Anderson', relation: 'Wife', phone: '555-0199' }
        },
        // More mock data
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTeacher, setCurrentTeacher] = useState(null);
    const [formData, setFormData] = useState({
        name: '', staffId: '', gender: 'Male', dob: '',
        email: '', phone: '', address: '',
        qualifications: '', subjectsString: '', classesString: '',
        employmentType: 'Full-time', dateEmployed: '', status: 'Active',
        nokName: '', nokRelation: '', nokPhone: ''
    });
    const [searchTerm, setSearchTerm] = useState('');

    const columns = [
        {
            header: 'Staff Details',
            accessor: 'name',
            render: (row) => (
                <div>
                    <p className="font-bold text-brown-900">{row.name}</p>
                    <p className="text-xs text-primary font-mono">{row.staffId}</p>
                </div>
            )
        },
        { header: 'Subjects', accessor: 'subjects', render: (row) => row.subjects.join(', ') },
        {
            header: 'Contact',
            accessor: 'email',
            render: (row) => (
                <div className="text-sm">
                    <p>{row.email}</p>
                    <p className="text-brown-500 text-xs">{row.phone}</p>
                </div>
            )
        },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${row.status === 'Active' ? 'bg-green-100 text-green-700' :
                    row.status === 'On Leave' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                    }`}>
                    {row.status}
                </span>
            )
        },
    ];

    const handleAdd = () => {
        setCurrentTeacher(null);
        setFormData({
            name: '', staffId: `STF-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`, gender: 'Male', dob: '',
            email: '', phone: '', address: '',
            qualifications: '', subjectsString: '', classesString: '',
            employmentType: 'Full-time', dateEmployed: new Date().toISOString().split('T')[0], status: 'Active',
            nokName: '', nokRelation: '', nokPhone: ''
        });
        setIsModalOpen(true);
    };

    const handleEdit = (teacher) => {
        setCurrentTeacher(teacher);
        setFormData({
            ...teacher,
            subjectsString: teacher.subjects.join(', '),
            classesString: teacher.classes.join(', '),
            nokName: teacher.nextOfKin?.name || '',
            nokRelation: teacher.nextOfKin?.relation || '',
            nokPhone: teacher.nextOfKin?.phone || ''
        });
        setIsModalOpen(true);
    };

    const handleDelete = (teacher) => {
        if (window.confirm(`Delete ${teacher.name}?`)) {
            setTeachers(teachers.filter(t => t.id !== teacher.id));
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        const teacherData = {
            ...formData,
            subjects: formData.subjectsString.split(',').map(s => s.trim()).filter(s => s),
            classes: formData.classesString.split(',').map(s => s.trim()).filter(s => s),
            nextOfKin: {
                name: formData.nokName,
                relation: formData.nokRelation,
                phone: formData.nokPhone
            }
        };

        if (currentTeacher) {
            setTeachers(teachers.map(t => t.id === currentTeacher.id ? { ...teacherData, id: t.id } : t));
        } else {
            setTeachers([...teachers, { ...teacherData, id: Date.now() }]);
        }
        setIsModalOpen(false);
    };

    const filteredTeachers = teachers.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.staffId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-brown-900">Teacher Management</h1>
                    <p className="text-brown-600 mt-1">Manage staff records and assignments</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="bg-gradient-to-r from-primary to-primary-dark text-cream px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                    <Plus size={20} />
                    Add Teacher
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-brown-200 p-4">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brown-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name, staff ID, or subject..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border-2 border-brown-200 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-brown-900 placeholder-brown-400"
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl border border-brown-200 shadow-sm">
                <Table
                    columns={columns}
                    data={filteredTeachers}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={currentTeacher ? "Edit Staff Record" : "Add New Staff"}
            >
                <form onSubmit={handleSave} className="space-y-6">
                    {/* Personal Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-brown-400 uppercase tracking-wider border-b border-brown-100 pb-2">Personal Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Full Name</label>
                                <input type="text" required className="form-input w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Staff ID</label>
                                <input type="text" className="form-input w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={formData.staffId} onChange={e => setFormData({ ...formData, staffId: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Gender</label>
                                <select className="form-select w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white" value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Date of Birth</label>
                                <input type="date" required className="form-input w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={formData.dob} onChange={e => setFormData({ ...formData, dob: e.target.value })} />
                            </div>
                        </div>
                    </div>

                    {/* Professional Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-brown-400 uppercase tracking-wider border-b border-brown-100 pb-2">Professional Info</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Qualifications</label>
                                <input type="text" required className="form-input w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={formData.qualifications} onChange={e => setFormData({ ...formData, qualifications: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Subjects (Comma separated)</label>
                                <input type="text" className="form-input w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={formData.subjectsString} onChange={e => setFormData({ ...formData, subjectsString: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Classes Assigned</label>
                                <input type="text" className="form-input w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={formData.classesString} onChange={e => setFormData({ ...formData, classesString: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Employment Type</label>
                                <select className="form-select w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white" value={formData.employmentType} onChange={e => setFormData({ ...formData, employmentType: e.target.value })}>
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Status</label>
                                <select className="form-select w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                    <option value="Active">Active</option>
                                    <option value="On Leave">On Leave</option>
                                    <option value="Resigned">Resigned</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Contact & NOK */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-brown-400 uppercase tracking-wider border-b border-brown-100 pb-2">Contact & Next of Kin</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Email</label>
                                <input type="email" required className="form-input w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Phone</label>
                                <input type="tel" required className="form-input w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Address</label>
                                <input type="text" className="form-input w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Next of Kin Name</label>
                                <input type="text" className="form-input w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={formData.nokName} onChange={e => setFormData({ ...formData, nokName: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Next of Kin Phone</label>
                                <input type="tel" className="form-input w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={formData.nokPhone} onChange={e => setFormData({ ...formData, nokPhone: e.target.value })} />
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
                            Save Staff
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default TeacherList;
