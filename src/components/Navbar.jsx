import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, GraduationCap } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-brown-900 text-cream-100 px-4 sm:px-6 lg:px-8 py-4 shadow-lg sticky top-0 z-50 backdrop-blur-md border-b border-brown-800">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all group-hover:scale-110">
                        <GraduationCap className="text-primary" size={24} />
                    </div>
                    <span className="text-2xl font-bold tracking-wide hidden sm:block group-hover:text-cream transition-colors">
                        Eduservice
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-4 sm:gap-6">
                    <Link
                        to="/"
                        className="text-sm sm:text-base font-medium hover:text-cream transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className="hidden md:block text-sm sm:text-base font-medium hover:text-cream transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
                    >
                        About
                    </Link>
                    <Link
                        to="/contact"
                        className="hidden md:block text-sm sm:text-base font-medium hover:text-cream transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
                    >
                        Contact
                    </Link>
                    <Link
                        to="/help"
                        className="hidden lg:block text-sm sm:text-base font-medium hover:text-cream transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
                    >
                        Help
                    </Link>

                    {/* User Section */}
                    {user && (
                        <div className="flex items-center gap-3 ml-2 pl-4 border-l border-cream/30">
                            <div className="hidden sm:flex items-center gap-2">
                                <div className="w-9 h-9 rounded-full bg-cream text-primary flex items-center justify-center font-bold shadow-md">
                                    {user.name.charAt(0)}
                                </div>
                                <div className="hidden md:block">
                                    <p className="text-sm font-semibold">{user.name}</p>
                                    <p className="text-xs text-cream/80 capitalize">{user.role}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 sm:px-4 py-2 rounded-lg transition-all text-sm font-medium shadow-sm hover:shadow-md"
                            >
                                <LogOut size={16} />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    )}

                    {!user && (
                        <Link
                            to="/login"
                            className="bg-cream text-primary px-4 sm:px-6 py-2 rounded-lg font-bold hover:bg-white transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm sm:text-base"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
