import React, { useState } from 'react';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import { Plus, Search, Upload, FileText, User, Calendar, MapPin, Mail, Phone } from 'lucide-react';

const StudentList = () => {
    const [students, setStudents] = useState([
        {
            id: 1,
            name: 'John Doe',
            admissionNo: 'ADM-2023-001',
            age: 15,
            dob: '2008-05-15',
            gender: 'Male',
            class: '10th A',
            section: 'A',
            roll: '101',
            email: 'john@school.com',
            phone: '555-0100',
            address: '123 Main St',
            enrollmentDate: '2023-01-10',
            status: 'Active',
            parentName: 'Robert Doe',
            performance: 'A',
            nextOfKin: { name: 'Sarah Doe', relation: 'Mother', phone: '555-0102' }
        },
        // Add more mock data as needed
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [formData, setFormData] = useState({
        name: '', admissionNo: '', age: '', dob: '', gender: 'Male',
        class: '', section: '', roll: '', email: '', phone: '', address: '',
        enrollmentDate: '', status: 'Active', parentName: '',
        nokName: '', nokRelation: '', nokPhone: ''
    });
    const [searchTerm, setSearchTerm] = useState('');

    const columns = [
        {
            header: 'Student Info',
            accessor: 'name',
            render: (row) => (
                <div>
                    <p className="font-bold text-brown-900">{row.name}</p>
                    <p className="text-xs text-brown-500">{row.gender} • {row.age} yrs</p>
                </div>
            )
        },
        { header: 'Admission No', accessor: 'admissionNo' },
        {
            header: 'Academic',
            accessor: 'class',
            render: (row) => (
                <div>
                    <span className="font-semibold text-primary">{row.class}</span>
                    <span className="text-brown-400 text-xs ml-1">(Roll: {row.roll})</span>
                </div>
            )
        },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${row.status === 'Active' ? 'bg-green-100 text-green-700' :
                    row.status === 'Graduated' ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'
                    }`}>
                    {row.status}
                </span>
            )
        },
    ];

    const handleAdd = () => {
        setCurrentStudent(null);
        setFormData({
            name: '', admissionNo: `ADM-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`, age: '', dob: '', gender: 'Male',
            class: '', section: '', roll: '', email: '', phone: '', address: '',
            enrollmentDate: new Date().toISOString().split('T')[0], status: 'Active', parentName: '',
            nokName: '', nokRelation: '', nokPhone: ''
        });
        setIsModalOpen(true);
    };

    const handleEdit = (student) => {
        setCurrentStudent(student);
        setFormData({
            ...student,
            nokName: student.nextOfKin?.name || '',
            nokRelation: student.nextOfKin?.relation || '',
            nokPhone: student.nextOfKin?.phone || ''
        });
        setIsModalOpen(true);
    };

    const handleDelete = (student) => {
        if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
            setStudents(students.filter(s => s.id !== student.id));
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        const studentData = {
            ...formData,
            nextOfKin: {
                name: formData.nokName,
                relation: formData.nokRelation,
                phone: formData.nokPhone
            }
        };

        if (currentStudent) {
            setStudents(students.map(s => s.id === currentStudent.id ? { ...studentData, id: s.id } : s));
        } else {
            setStudents([...students, { ...studentData, id: Date.now(), performance: 'B' }]);
        }
        setIsModalOpen(false);
    };

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.admissionNo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-brown-900">Student Management</h1>
                    <p className="text-brown-600 mt-1">Total Students: <span className="font-bold text-primary">{students.length}</span></p>
                </div>
                <button
                    onClick={handleAdd}
                    className="bg-gradient-to-r from-primary to-primary-dark text-cream px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                >
                    <Plus size={20} />
                    Add Student
                </button>
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm border border-brown-200 p-4">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brown-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name, admission no..."
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
                    data={filteredStudents}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>

            {/* Comprehensive Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={currentStudent ? "Edit Student Record" : "Enroll New Student"}
            >
                <form onSubmit={handleSave} className="space-y-8">
                    {/* Personal Info Group */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-brown-400 uppercase tracking-wider border-b border-brown-100 pb-2 flex items-center gap-2">
                            <User size={16} /> Personal Information
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Full Name</label>
                                <input type="text" required className="form-input w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Admission No</label>
                                <input type="text" required className="form-input w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={formData.admissionNo} onChange={e => setFormData({ ...formData, admissionNo: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Date of Birth</label>
                                <input type="date" required className="form-input w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={formData.dob} onChange={e => setFormData({ ...formData, dob: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-semibold text-brown-700 mb-2">Age</label>
                                    <input type="number" className="form-input w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-brown-700 mb-2">Gender</label>
                                    <select className="form-select w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white" value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Academic Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-brown-400 uppercase tracking-wider border-b border-brown-100 pb-2 flex items-center gap-2">
                            <FileText size={16} /> Academic Information
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Class</label>
                                <input type="text" required className="form-input w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={formData.class} onChange={e => setFormData({ ...formData, class: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Section</label>
                                <input type="text" className="form-input w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={formData.section} onChange={e => setFormData({ ...formData, section: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Roll No</label>
                                <input type="text" required className="form-input w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={formData.roll} onChange={e => setFormData({ ...formData, roll: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Enrollment Date</label>
                                <input type="date" required className="form-input w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={formData.enrollmentDate} onChange={e => setFormData({ ...formData, enrollmentDate: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Status</label>
                                <select className="form-select w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                    <option value="Active">Active</option>
                                    <option value="Graduated">Graduated</option>
                                    <option value="Withdrawn">Withdrawn</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-brown-400 uppercase tracking-wider border-b border-brown-100 pb-2 flex items-center gap-2">
                            <MapPin size={16} /> Contact & Parent Info
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Student Email</label>
                                <input type="email" className="form-input w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Phone</label>
                                <input type="tel" className="form-input w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Address</label>
                                <input type="text" className="form-input w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Parent/Guardian Name</label>
                                <input type="text" required className="form-input w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={formData.parentName} onChange={e => setFormData({ ...formData, parentName: e.target.value })} />
                            </div>
                        </div>
                    </div>

                    {/* Next of Kin & Docs */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-brown-400 uppercase tracking-wider border-b border-brown-100 pb-2 flex items-center gap-2">
                            <Phone size={16} /> Next of Kin / Emergency
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Name</label>
                                <input type="text" className="form-input w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={formData.nokName} onChange={e => setFormData({ ...formData, nokName: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Relation</label>
                                <input type="text" className="form-input w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={formData.nokRelation} onChange={e => setFormData({ ...formData, nokRelation: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-brown-700 mb-2">Phone</label>
                                <input type="tel" className="form-input w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={formData.nokPhone} onChange={e => setFormData({ ...formData, nokPhone: e.target.value })} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-brown-700 mb-2">Documents (Optional)</label>
                            <div className="border-2 border-dashed border-brown-300 rounded-lg p-6 text-center hover:bg-cream-50 transition-colors cursor-pointer">
                                <Upload className="mx-auto text-brown-400 mb-2" />
                                <p className="text-sm text-brown-500">Click to upload Birth Certificate or Reports</p>
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
                            Save Record
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default StudentList;
