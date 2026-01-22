import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard, Users, BookOpen, Calendar,
    FileText, Settings, DollarSign, Bell, FileBarChart,
    MessageSquare, Clock, X
} from 'lucide-react';
import clsx from 'clsx';

const Sidebar = ({ isOpen, onClose }) => {
    const { user } = useAuth();

    if (!user) return null;

    const role = user.role;

    const getMenuItems = () => {
        switch (role) {
            case 'admin':
                return [
                    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
                    { icon: Users, label: 'Students', path: '/admin/students' },
                    { icon: Users, label: 'Teachers', path: '/admin/teachers' },
                    { icon: Users, label: 'Parents', path: '/admin/parents' },
                    { icon: BookOpen, label: 'Classes', path: '/admin/classes' },
                    { icon: BookOpen, label: 'Subjects', path: '/admin/subjects' },
                    { icon: Calendar, label: 'Attendance', path: '/admin/attendance' },
                    { icon: FileText, label: 'Exams & Grades', path: '/admin/exams' },
                    { icon: DollarSign, label: 'Fees', path: '/admin/fees' },
                    { icon: Bell, label: 'Announcements', path: '/admin/announcements' },
                    { icon: FileBarChart, label: 'Reports', path: '/admin/reports' },
                    { icon: Settings, label: 'Settings', path: '/admin/settings' },
                ];
            case 'teacher':
                return [
                    { icon: LayoutDashboard, label: 'Dashboard', path: '/teacher' },
                    { icon: BookOpen, label: 'My Classes', path: '/teacher/classes' },
                    { icon: Calendar, label: 'Attendance', path: '/teacher/attendance' },
                    { icon: Clock, label: 'Timetable', path: '/teacher/timetable' },
                    { icon: FileText, label: 'Exams & Grades', path: '/teacher/grades' },
                    { icon: FileText, label: 'Assignments', path: '/teacher/assignments' },
                    { icon: MessageSquare, label: 'Messages', path: '/teacher/messages' },
                    { icon: Bell, label: 'Announcements', path: '/teacher/announcements' },
                ];
            case 'student':
                return [
                    { icon: LayoutDashboard, label: 'Dashboard', path: '/student' },
                    { icon: FileText, label: 'My Grades', path: '/student/grades' },
                    { icon: Calendar, label: 'Attendance', path: '/student/attendance' },
                    { icon: Clock, label: 'Timetable', path: '/student/timetable' },
                    { icon: FileText, label: 'Assignments', path: '/student/assignments' },
                    { icon: BookOpen, label: 'Materials', path: '/student/materials' },
                    { icon: Bell, label: 'Announcements', path: '/student/announcements' },
                    { icon: FileBarChart, label: 'Report Cards', path: '/student/reports' },
                ];
            case 'parent':
                return [
                    { icon: LayoutDashboard, label: 'Child Overview', path: '/parent' },
                    { icon: DollarSign, label: 'Fees & Invoices', path: '/parent/fees' },
                    { icon: MessageSquare, label: 'Messages', path: '/parent/messages' },
                    { icon: Bell, label: 'Announcements', path: '/parent/announcements' },
                    { icon: Calendar, label: 'School Calendar', path: '/parent/calendar' },
                ];
            default:
                return [];
        }
    };

    const menuItems = getMenuItems();

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden transition-opacity"
                    onClick={onClose}
                />
            )}

            <aside className={clsx(
                "fixed md:sticky top-[64px] left-0 md:top-0 z-[70] md:z-auto w-64 bg-brown-900 border-r border-brown-800 h-[calc(100vh-64px)] overflow-y-auto transition-transform duration-300 md:translate-x-0 md:block shadow-xl shrink-0",
                isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            )}>
                <div className="p-4">
                    {/* Role Badge with Close Button on Mobile */}
                    <div className="mb-6 p-4 bg-brown-800/50 rounded-2xl border border-brown-700 backdrop-blur-sm relative group overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-primary/20 transition-all"></div>

                        <div className="flex justify-between items-start mb-2 relative z-10">
                            <div>
                                <p className="text-[10px] font-bold text-cream-300 uppercase tracking-[0.2em] mb-1 opacity-80">Access Level</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></div>
                                    <p className="text-xl font-black text-white capitalize leading-tight">{role}</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="md:hidden p-1.5 hover:bg-white/10 rounded-lg text-cream-200 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="flex flex-col gap-2">
                        {menuItems.map((item, index) => (
                            <NavLink
                                key={index}
                                to={item.path}
                                onClick={() => { if (window.innerWidth < 768) onClose(); }}
                                end={item.path === `/${role}`}
                                className={({ isActive }) => clsx(
                                    "flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold group relative overflow-hidden",
                                    isActive
                                        ? "bg-cream-100 text-brown-900 shadow-xl shadow-black/20 translate-x-1"
                                        : "text-cream-200/70 hover:bg-brown-800/80 hover:text-white hover:translate-x-1"
                                )}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && (
                                            <div className="absolute inset-y-2 left-0 w-1 bg-primary rounded-r-full"></div>
                                        )}
                                        <item.icon size={20} className={clsx(
                                            "transition-all duration-300",
                                            isActive ? "scale-110 text-primary drop-shadow-sm" : "group-hover:scale-110 opacity-60 group-hover:opacity-100"
                                        )} />
                                        <span className="flex-1 tracking-wide text-sm">{item.label}</span>
                                        {isActive && (
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary-rgb),0.4)]"></div>
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
