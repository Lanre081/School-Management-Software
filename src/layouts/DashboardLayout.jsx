import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="min-h-screen bg-cream-100 flex flex-col font-sans">
            {/* Top Navbar */}
            <Navbar onMenuClick={toggleSidebar} />

            <div className="flex flex-1 overflow-hidden relative">
                {/* Sidebar */}
                <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
