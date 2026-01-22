import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Mock Login Function
    const login = (userData) => {
        // In a real app, you would validate credentials here.
        // For mock, we simply set the user based on the role selected.
        // Mock user object structure: { id, name, role, email, avatar }
        const mockUser = {
            id: Date.now(),
            name: userData.username || 'Test User',
            email: userData.email || 'test@school.com',
            role: userData.role, // 'admin', 'teacher', 'student', 'parent'
            avatar: `https://ui-avatars.com/api/?name=${userData.username || 'Test+User'}&background=random`
        };

        setUser(mockUser);
        localStorage.setItem('sms_user', JSON.stringify(mockUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('sms_user');
    };

    // Restore session on load
    useEffect(() => {
        const storedUser = localStorage.getItem('sms_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
