import React, { useState } from 'react';
import { MessageSquare, Search, Send, User } from 'lucide-react';

const TeacherMessages = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            parent: 'Mr. John Doe',
            student: 'Alex Doe (Class 10-A)',
            subject: 'Regarding attendance',
            preview: 'Alex was sick yesterday, please excuse his absence.',
            time: '2 hours ago',
            unread: true,
        },
        {
            id: 2,
            parent: 'Mrs. Sarah Smith',
            student: 'Emma Smith (Class 9-B)',
            subject: 'Homework Query',
            preview: 'Emma is struggling with the latest math assignment, can she get extra help?',
            time: 'Yesterday',
            unread: false,
        },
        {
            id: 3,
            parent: 'Mr. Robert Johnson',
            student: 'Mike Johnson (Class 10-A)',
            subject: 'Meeting Request',
            preview: 'I would like to schedule a meeting to discuss Mike\'s progress.',
            time: '2 days ago',
            unread: false,
        },
    ]);

    const [selectedMessage, setSelectedMessage] = useState(null);
    const [replyText, setReplyText] = useState('');

    const handleSelectMessage = (msg) => {
        setSelectedMessage(msg);
        // Mark as read mock logic
        const updated = messages.map(m => m.id === msg.id ? { ...m, unread: false } : m);
        setMessages(updated);
    };

    const handleSendReply = () => {
        if (!replyText.trim()) return;
        alert(`Reply sent to ${selectedMessage.parent}: ${replyText}`);
        setReplyText('');
    };

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col md:flex-row gap-6">
            {/* Message List */}
            <div className={`w-full md:w-1/3 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col ${selectedMessage ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <MessageSquare className="text-indigo-600" size={24} />
                        Messages
                    </h2>
                    <div className="relative mt-4">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-indigo-500 transition-all"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            onClick={() => handleSelectMessage(msg)}
                            className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${selectedMessage?.id === msg.id ? 'bg-indigo-50 border-indigo-100' : ''} ${msg.unread ? 'bg-blue-50/30' : ''}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <h3 className={`font-semibold text-gray-800 ${msg.unread ? 'font-bold' : ''}`}>{msg.parent}</h3>
                                <span className="text-xs text-gray-500 whitespace-nowrap">{msg.time}</span>
                            </div>
                            <p className="text-xs text-indigo-600 font-medium mb-1">{msg.student}</p>
                            <p className="text-sm text-gray-600 line-clamp-1">{msg.preview}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Message Detail */}
            <div className={`w-full md:w-2/3 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col ${!selectedMessage ? 'hidden md:flex' : 'flex'}`}>
                {selectedMessage ? (
                    <>
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 rounded-t-xl">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-lg">
                                    {selectedMessage.parent.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-800">{selectedMessage.parent}</h2>
                                    <p className="text-sm text-indigo-600 font-medium">Re: {selectedMessage.student}</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedMessage(null)} className="md:hidden text-gray-500 text-sm">Back</button>
                        </div>

                        <div className="flex-1 p-6 overflow-y-auto bg-white">
                            <div className="bg-gray-50 p-4 rounded-lg rounded-tl-none border border-gray-100 max-w-[80%] mb-4">
                                <p className="font-semibold text-gray-800 mb-2">{selectedMessage.subject}</p>
                                <p className="text-gray-700 leading-relaxed">{selectedMessage.preview} {selectedMessage.preview} {selectedMessage.preview}</p>
                                <span className="text-xs text-gray-400 mt-2 block">{selectedMessage.time}</span>
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    placeholder="Type your reply..."
                                    className="flex-1 px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                                />
                                <button
                                    onClick={handleSendReply}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                                >
                                    <Send size={18} />
                                    Send
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <MessageSquare size={32} className="text-gray-300" />
                        </div>
                        <p className="text-lg font-medium">Select a message to view details</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeacherMessages;
