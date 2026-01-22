import React, { useState } from 'react';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import { Plus, Users, BookOpen } from 'lucide-react';

const ClassList = () => {
    const [classes, setClasses] = useState([
        { id: 1, name: 'Class 10-A', section: 'A', gradeLevel: '10th Grade', classTeacher: 'Mr. Anderson', roomNumber: '101', studentCount: 32 },
        { id: 2, name: 'Class 10-B', section: 'B', gradeLevel: '10th Grade', classTeacher: 'Mrs. Davis', roomNumber: '102', studentCount: 30 },
        { id: 3, name: 'Class 9-A', section: 'A', gradeLevel: '9th Grade', classTeacher: 'Mr. Wilson', roomNumber: '201', studentCount: 28 },
        { id: 4, name: 'Class 9-B', section: 'B', gradeLevel: '9th Grade', classTeacher: 'Ms. Johnson', roomNumber: '202', studentCount: 31 },
        { id: 5, name: 'Class 8-A', section: 'A', gradeLevel: '8th Grade', classTeacher: 'Mr. Brown', roomNumber: '301', studentCount: 29 },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentClass, setCurrentClass] = useState(null);
    const [formData, setFormData] = useState({
        name: '', section: '', gradeLevel: '', classTeacher: '', roomNumber: ''
    });

    const columns = [
        { header: 'Class Name', accessor: 'name' },
        { header: 'Section', accessor: 'section' },
        { header: 'Grade Level', accessor: 'gradeLevel' },
        { header: 'Class Teacher', accessor: 'classTeacher' },
        { header: 'Room', accessor: 'roomNumber' },
        {
            header: 'Students',
            accessor: 'studentCount',
            render: (row) => (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-cream-200 text-brown-800">
                    <Users size={12} />
                    {row.studentCount}
                </span>
            )
        },
    ];

    const handleAdd = () => {
        setCurrentClass(null);
        setFormData({ name: '', section: '', gradeLevel: '', classTeacher: '', roomNumber: '' });
        setIsModalOpen(true);
    };

    const handleEdit = (classItem) => {
        setCurrentClass(classItem);
        setFormData(classItem);
        setIsModalOpen(true);
    };

    const handleDelete = (classItem) => {
        if (window.confirm(`Delete ${classItem.name}?`)) {
            setClasses(classes.filter(c => c.id !== classItem.id));
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (currentClass) {
            setClasses(classes.map(c => c.id === currentClass.id ? { ...formData, id: c.id, studentCount: c.studentCount } : c));
        } else {
            setClasses([...classes, { ...formData, id: Date.now(), studentCount: 0 }]);
        }
        setIsModalOpen(false);
    };

    // Stats
    const totalClasses = classes.length;
    const totalStudents = classes.reduce((acc, c) => acc + c.studentCount, 0);
    const avgClassSize = Math.round(totalStudents / totalClasses);

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-brown-900 flex items-center gap-3">
                        <div className="p-2 bg-cream-200 rounded-lg">
                            <BookOpen className="text-primary" size={28} />
                        </div>
                        Class Management
                    </h1>
                    <p className="text-brown-500 mt-1">Manage school classes and sections</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="bg-primary text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary-dark transition-all shadow-md hover:shadow-lg"
                >
                    <Plus size={20} />
                    Add Class
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-cream-50 rounded-xl p-4 border border-brown-200 shadow-sm">
                    <p className="text-sm text-brown-500 mb-1">Total Classes</p>
                    <p className="text-2xl font-bold text-brown-900">{totalClasses}</p>
                </div>
                <div className="bg-cream-50 rounded-xl p-4 border border-brown-200 shadow-sm">
                    <p className="text-sm text-brown-500 mb-1">Total Students</p>
                    <p className="text-2xl font-bold text-brown-900">{totalStudents}</p>
                </div>
                <div className="bg-cream-50 rounded-xl p-4 border border-brown-200 shadow-sm">
                    <p className="text-sm text-brown-500 mb-1">Avg Class Size</p>
                    <p className="text-2xl font-bold text-brown-900">{avgClassSize}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-brown-200 shadow-sm">
                <Table
                    columns={columns}
                    data={classes}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={currentClass ? "Edit Class" : "Add New Class"}
            >
                <form onSubmit={handleSave} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-brown-700 mb-1">Class Name</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g., Class 10-A"
                                className="w-full p-2.5 border border-brown-200 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brown-700 mb-1">Section</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g., A"
                                className="w-full p-2.5 border border-brown-200 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                value={formData.section}
                                onChange={e => setFormData({ ...formData, section: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-brown-700 mb-1">Grade Level</label>
                        <select
                            required
                            className="w-full p-2.5 border border-brown-200 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white"
                            value={formData.gradeLevel}
                            onChange={e => setFormData({ ...formData, gradeLevel: e.target.value })}
                        >
                            <option value="">Select Grade Level</option>
                            <option value="6th Grade">6th Grade</option>
                            <option value="7th Grade">7th Grade</option>
                            <option value="8th Grade">8th Grade</option>
                            <option value="9th Grade">9th Grade</option>
                            <option value="10th Grade">10th Grade</option>
                            <option value="11th Grade">11th Grade</option>
                            <option value="12th Grade">12th Grade</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-brown-700 mb-1">Class Teacher</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g., Mr. Anderson"
                            className="w-full p-2.5 border border-brown-200 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            value={formData.classTeacher}
                            onChange={e => setFormData({ ...formData, classTeacher: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-brown-700 mb-1">Room Number</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g., 101"
                            className="w-full p-2.5 border border-brown-200 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            value={formData.roomNumber}
                            onChange={e => setFormData({ ...formData, roomNumber: e.target.value })}
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
                            {currentClass ? 'Update' : 'Create'} Class
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ClassList;
