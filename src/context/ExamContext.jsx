import React, { createContext, useContext, useState } from 'react';

const ExamContext = createContext();

export const ExamProvider = ({ children }) => {
    // Shared Mock Data for Exams
    const [exams, setExams] = useState([
        {
            id: 1, name: 'First Term Mathematics', subject: 'Mathematics', class: 'JSS 1',
            program: 'Western', date: '2025-11-20', status: 'Completed',
            type: 'CBT', duration: 40, visibility: 'immediate', published: true,
            questions: [
                { id: 1, text: '2+2?', options: ['3', '4', '5', '6'], correctAnswer: '4', type: 'mcq', marks: 5, status: 'approved' }
            ]
        },
        {
            id: 2, name: 'Mid-Term Arabic', subject: 'Arabic Studies', class: 'JSS 2',
            program: 'Arabic', date: '2025-12-05', status: 'Scheduled',
            type: 'Theory', duration: 120, visibility: 'delayed', published: false,
            questions: []
        },
    ]);

    const addExam = (newExam) => {
        setExams(prev => [...prev, { ...newExam, id: Date.now() }]);
    };

    const updateExam = (id, updatedData) => {
        setExams(prev => prev.map(exam => exam.id === id ? { ...exam, ...updatedData } : exam));
    };

    const deleteExam = (id) => {
        setExams(prev => prev.filter(exam => exam.id !== id));
    };

    return (
        <ExamContext.Provider value={{ exams, addExam, updateExam, deleteExam }}>
            {children}
        </ExamContext.Provider>
    );
};

export const useExams = () => useContext(ExamContext);
