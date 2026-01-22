import React, { useState } from 'react';
import { Settings as SettingsIcon, School, Calendar, Bell, Shield, Save } from 'lucide-react';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('school');
    const [saved, setSaved] = useState(false);

    const [schoolInfo, setSchoolInfo] = useState({
        name: 'Springfield High School',
        address: '123 Education Lane, Springfield, IL 62701',
        phone: '(555) 123-4567',
        email: 'info@springfieldhigh.edu',
        website: 'www.springfieldhigh.edu',
        principal: 'Dr. Robert Williams'
    });

    const [academicSettings, setAcademicSettings] = useState({
        currentYear: '2024-2025',
        termStart: '2024-08-15',
        termEnd: '2025-05-30',
        gradingScale: 'Letter (A-F)'
    });

    const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

    const tabs = [
        { id: 'school', label: 'School Profile', icon: School },
        { id: 'academic', label: 'Academic Year', icon: Calendar },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
    ];

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-brown-800 flex items-center gap-3">
                    <div className="p-2 bg-cream-200 rounded-lg"><SettingsIcon className="text-primary" size={28} /></div>
                    Settings
                </h1>
                <p className="text-brown-500 mt-1">Manage system configuration</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-64 flex-shrink-0">
                    <div className="bg-white rounded-xl border border-brown-200 shadow-sm p-2">
                        {tabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-md' : 'text-brown-600 hover:bg-cream-100 hover:text-brown-800'}`}>
                                <tab.icon size={20} />{tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1">
                    <div className="bg-white rounded-xl border border-brown-200 shadow-sm p-6">
                        {activeTab === 'school' && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-brown-800 mb-4">School Profile</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div><label className="block text-sm font-medium text-brown-700 mb-1">School Name</label><input type="text" className="w-full p-2.5 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" value={schoolInfo.name} onChange={e => setSchoolInfo({ ...schoolInfo, name: e.target.value })} /></div>
                                    <div><label className="block text-sm font-medium text-brown-700 mb-1">Principal</label><input type="text" className="w-full p-2.5 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" value={schoolInfo.principal} onChange={e => setSchoolInfo({ ...schoolInfo, principal: e.target.value })} /></div>
                                    <div className="md:col-span-2"><label className="block text-sm font-medium text-brown-700 mb-1">Address</label><input type="text" className="w-full p-2.5 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" value={schoolInfo.address} onChange={e => setSchoolInfo({ ...schoolInfo, address: e.target.value })} /></div>
                                    <div><label className="block text-sm font-medium text-brown-700 mb-1">Phone</label><input type="text" className="w-full p-2.5 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" value={schoolInfo.phone} onChange={e => setSchoolInfo({ ...schoolInfo, phone: e.target.value })} /></div>
                                    <div><label className="block text-sm font-medium text-brown-700 mb-1">Email</label><input type="email" className="w-full p-2.5 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" value={schoolInfo.email} onChange={e => setSchoolInfo({ ...schoolInfo, email: e.target.value })} /></div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'academic' && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-brown-800 mb-4">Academic Year</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div><label className="block text-sm font-medium text-brown-700 mb-1">Current Year</label><input type="text" className="w-full p-2.5 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" value={academicSettings.currentYear} onChange={e => setAcademicSettings({ ...academicSettings, currentYear: e.target.value })} /></div>
                                    <div>
                                        <label className="block text-sm font-medium text-brown-700 mb-1">Grading Scale</label>
                                        <select className="w-full p-2.5 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-white" value={academicSettings.gradingScale} onChange={e => setAcademicSettings({ ...academicSettings, gradingScale: e.target.value })}>
                                            <option>Letter (A-F)</option>
                                            <option>Percentage</option>
                                            <option>GPA (4.0)</option>
                                        </select>
                                    </div>
                                    <div><label className="block text-sm font-medium text-brown-700 mb-1">Term Start</label><input type="date" className="w-full p-2.5 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" value={academicSettings.termStart} onChange={e => setAcademicSettings({ ...academicSettings, termStart: e.target.value })} /></div>
                                    <div><label className="block text-sm font-medium text-brown-700 mb-1">Term End</label><input type="date" className="w-full p-2.5 border border-brown-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" value={academicSettings.termEnd} onChange={e => setAcademicSettings({ ...academicSettings, termEnd: e.target.value })} /></div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div><h2 className="text-xl font-bold text-brown-800 mb-4">Notification Settings</h2><p className="text-brown-500">Notification preferences coming soon.</p></div>
                        )}

                        {activeTab === 'security' && (
                            <div><h2 className="text-xl font-bold text-brown-800 mb-4">Security Settings</h2><p className="text-brown-500">Security configuration coming soon.</p></div>
                        )}

                        <div className="flex justify-end mt-6 pt-4 border-t border-brown-100">
                            <button onClick={handleSave} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all shadow-md ${saved ? 'bg-green-600 text-white' : 'bg-primary text-white hover:bg-primary-dark'}`}>
                                <Save size={18} />{saved ? 'Saved!' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
