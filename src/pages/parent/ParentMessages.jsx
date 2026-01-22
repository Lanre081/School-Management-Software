import React, { useState } from 'react';
import { MessageSquare, Search, Send, User } from 'lucide-react';

const ParentMessages = () => {
    // Reusing the teacher messages layout but adapted for parent view (talking to teachers)
    const [teachers] = useState([
        { id: 1, name: 'Mr. Anderson', subject: 'Mathematics (Class 10-A)', role: 'Class Teacher', online: true },
        { id: 2, name: 'Mrs. Davis', subject: 'English', role: 'Teacher', online: false },
        { id: 3, name: 'Mr. Wilson', subject: 'Science', role: 'Teacher', online: false },
    ]);

    const [messages, setMessages] = useState({
        1: [
            { id: 1, text: 'Hello Mr. Anderson, I wanted to ask about Alex\'s recent absence.', sender: 'me', time: 'Yesterday 10:00 AM' },
            { id: 2, text: 'Hi Mr. Doe. No problem, please send the medical certificate when possible.', sender: 'them', time: 'Yesterday 10:30 AM' },
        ]
    });

    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [inputText, setInputText] = useState('');

    const handleSendMessage = () => {
        if (!inputText.trim() || !selectedTeacher) return;

        const newMsg = {
            id: Date.now(),
            text: inputText,
            sender: 'me',
            time: 'Just now'
        };

        setMessages(prev => ({
            ...prev,
            [selectedTeacher.id]: [...(prev[selectedTeacher.id] || []), newMsg]
        }));
        setInputText('');
    };

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col md:flex-row gap-6">
            {/* Contacts List */}
            <div className={`w-full md:w-1/3 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col ${selectedTeacher ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <MessageSquare className="text-indigo-600" size={24} />
                        Teachers
                    </h2>
                    <div className="relative mt-4">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search teachers..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-indigo-500 transition-all"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {teachers.map((teacher) => (
                        <div
                            key={teacher.id}
                            onClick={() => setSelectedTeacher(teacher)}
                            className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${selectedTeacher?.id === teacher.id ? 'bg-indigo-50 border-indigo-100' : ''}`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                                        {teacher.name.charAt(0)}
                                    </div>
                                    {teacher.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">{teacher.name}</h3>
                                    <p className="text-xs text-gray-500">{teacher.subject}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`w-full md:w-2/3 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col ${!selectedTeacher ? 'hidden md:flex' : 'flex'}`}>
                {selectedTeacher ? (
                    <>
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 rounded-t-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                                    {selectedTeacher.name.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="font-bold text-gray-800">{selectedTeacher.name}</h2>
                                    <p className="text-xs text-gray-500">{selectedTeacher.role}</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedTeacher(null)} className="md:hidden text-sm text-gray-500">Back</button>
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4">
                            {(messages[selectedTeacher.id] || []).map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[75%] p-3 rounded-xl ${msg.sender === 'me'
                                            ? 'bg-indigo-600 text-white rounded-br-none'
                                            : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                                        }`}>
                                        <p className="text-sm">{msg.text}</p>
                                        <p className={`text-[10px] mt-1 ${msg.sender === 'me' ? 'text-indigo-200' : 'text-gray-400'}`}>{msg.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-gray-100 bg-white rounded-b-xl">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type your message..."
                                    className="flex-1 px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                        <MessageSquare size={48} className="text-gray-200 mb-4" />
                        <p>Select a teacher to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ParentMessages;
