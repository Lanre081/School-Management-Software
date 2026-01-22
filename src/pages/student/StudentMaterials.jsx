import React, { useState } from 'react';
import { Folder, Download, Search, FileText, Image, Film, File } from 'lucide-react';

const StudentMaterials = () => {
    const subjects = ['All', 'Mathematics', 'Science', 'English', 'History', 'Computer Science'];
    const [selectedSubject, setSelectedSubject] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const materials = [
        { id: 1, title: 'Algebra Formula Sheet', subject: 'Mathematics', type: 'PDF', size: '2.4 MB', date: '2026-01-10' },
        { id: 2, title: 'Chapter 4: Photosynthesis Notes', subject: 'Science', type: 'DOCX', size: '1.1 MB', date: '2026-01-08' },
        { id: 3, title: 'Shakespeare Analysis', subject: 'English', type: 'PDF', size: '3.5 MB', date: '2026-01-05' },
        { id: 4, title: 'World War II Timeline', subject: 'History', type: 'Image', size: '4.2 MB', date: '2026-01-03' },
        { id: 5, title: 'Intro to Python Code Samples', subject: 'Computer Science', type: 'ZIP', size: '8.5 MB', date: '2026-01-02' },
        { id: 6, title: 'Geometry Practice Problems', subject: 'Mathematics', type: 'PDF', size: '1.8 MB', date: '2026-01-11' },
    ];

    const getFileIcon = (type) => {
        switch (type.toLowerCase()) {
            case 'pdf': return <FileText className="text-red-500" size={24} />;
            case 'image': return <Image className="text-purple-500" size={24} />;
            case 'video': return <Film className="text-pink-500" size={24} />;
            case 'zip': return <Folder className="text-yellow-500" size={24} />;
            default: return <File className="text-blue-500" size={24} />;
        }
    };

    const filteredMaterials = materials.filter(item => {
        const matchesSubject = selectedSubject === 'All' || item.subject === selectedSubject;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSubject && matchesSearch;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Download className="text-blue-600" size={28} />
                        </div>
                        Study Materials
                    </h1>
                    <p className="text-gray-600 mt-1">Access course resources and downloads</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                    {subjects.map(sub => (
                        <button
                            key={sub}
                            onClick={() => setSelectedSubject(sub)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedSubject === sub
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {sub}
                        </button>
                    ))}
                </div>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search materials..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMaterials.map(item => (
                    <div key={item.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                                {getFileIcon(item.type)}
                            </div>
                            <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">{item.type}</span>
                        </div>
                        <h3 className="font-bold text-gray-800 mb-1 line-clamp-1">{item.title}</h3>
                        <p className="text-sm text-gray-500 mb-4">{item.subject}</p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                            <span className="text-xs text-gray-400">{item.size} • {item.date}</span>
                            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
                                <Download size={16} />
                                Download
                            </button>
                        </div>
                    </div>
                ))}

                {filteredMaterials.length === 0 && (
                    <div className="col-span-full py-12 text-center text-gray-500">
                        <Folder className="mx-auto text-gray-300 mb-3" size={48} />
                        <p>No materials found matching your criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentMaterials;
