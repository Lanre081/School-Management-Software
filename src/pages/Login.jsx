import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { User, Lock, ChevronRight, GraduationCap } from 'lucide-react';

const Login = () => {
    const [role, setRole] = useState('admin');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ username, role });

        if (role === 'admin') navigate('/admin');
        else if (role === 'teacher') navigate('/teacher');
        else if (role === 'student') navigate('/student');
        else if (role === 'parent') navigate('/parent');
        else navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cream-100 via-white to-brown-50 flex flex-col font-sans">
            <Navbar />

            <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-md">
                    {/* Decorative Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-full shadow-lg mb-4">
                            <GraduationCap className="text-cream-100" size={40} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-brown-900 mb-2">Welcome Back</h2>
                        <p className="text-brown-600">Sign in to access your dashboard</p>
                    </div>

                    {/* Login Card */}
                    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-brown-200 transform transition-all hover:shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Role Selector */}
                            <div>
                                <label className="block text-sm font-semibold text-brown-800 mb-2">Select Role</label>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-brown-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all bg-white text-brown-900 font-medium"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="teacher">Teacher</option>
                                    <option value="student">Student</option>
                                    <option value="parent">Parent</option>
                                </select>
                            </div>

                            {/* Username */}
                            <div>
                                <label className="block text-sm font-semibold text-brown-800 mb-2">Username / Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="text-brown-400" size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter your username"
                                        className="w-full pl-12 pr-4 py-3 border-2 border-brown-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-brown-900 placeholder-brown-300"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-semibold text-brown-800 mb-2">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="text-brown-400" size={20} />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full pl-12 pr-4 py-3 border-2 border-brown-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-brown-900 placeholder-brown-300"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Remember & Forgot */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center text-brown-600 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="mr-2 w-4 h-4 text-primary focus:ring-primary border-brown-300 rounded cursor-pointer"
                                    />
                                    <span className="group-hover:text-primary transition-colors">Remember me</span>
                                </label>
                                <button type="button" className="text-primary hover:text-primary-light font-medium transition-colors">
                                    Forgot Password?
                                </button>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-primary to-primary-dark text-cream-100 py-3.5 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                Login <ChevronRight size={20} />
                            </button>
                        </form>

                        {/* Mock Mode Notice */}
                        <div className="mt-6 p-4 bg-cream-50 rounded-lg border border-primary/20">
                            <p className="text-center text-sm text-brown-600">
                                <span className="font-semibold text-primary">Demo Mode:</span> Use any credentials to login
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
