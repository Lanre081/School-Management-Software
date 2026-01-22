import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard, Users, BookOpen, Calendar,
    FileText, Settings, DollarSign, Bell, FileBarChart,
    MessageSquare, Clock
} from 'lucide-react';
import clsx from 'clsx';

const Sidebar = () => {
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
        <aside className="w-64 bg-brown-900 border-r border-brown-800 h-[calc(100vh-64px)] overflow-y-auto hidden md:block shadow-xl">
            <div className="p-4">
                {/* Role Badge */}
                <div className="mb-6 p-3 bg-brown-800/50 rounded-xl border border-brown-700 backdrop-blur-sm">
                    <p className="text-xs font-semibold text-cream-300 uppercase tracking-wider mb-1">Current Role</p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                        <p className="text-lg font-bold text-white capitalize">{role}</p>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="flex flex-col gap-1.5">
                    {menuItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            end={item.path === `/${role}`}
                            className={({ isActive }) => clsx(
                                "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 font-medium group relative",
                                isActive
                                    ? "bg-cream-100 text-brown-900 shadow-lg shadow-black/10 translate-x-1"
                                    : "text-cream-200 hover:bg-brown-800 hover:text-white hover:pl-5"
                            )}
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon size={20} className={clsx(
                                        "transition-transform duration-300",
                                        isActive ? "scale-110 text-brown-600" : "group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                    )} />
                                    <span className="flex-1 tracking-wide text-sm">{item.label}</span>
                                    {isActive && (
                                        <div className="w-1.5 h-1.5 bg-brown-600 rounded-full"></div>
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
            </div>
        </aside>
    );
};
export default Sidebar;
