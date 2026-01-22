import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar />

            <main className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-primary/5 to-transparent">
                <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
                    Excellence in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-600">Education</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mb-10">
                    Streamline school management, enhance learning experiences, and connect the entire educational community with our platform.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/login" className="bg-primary text-secondary px-8 py-3 rounded-md font-bold text-lg shadow-lg hover:bg-primary-light transition-transform hover:-translate-y-1">
                        Get Started
                    </Link>
                    <button className="bg-white text-primary border border-primary px-8 py-3 rounded-md font-bold text-lg shadow-sm hover:bg-gray-50 transition-colors">
                        Learn More
                    </button>
                </div>
            </main>

            <footer className="bg-primary-dark text-white p-6 text-center">
                <p>© 2024 School Management System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
