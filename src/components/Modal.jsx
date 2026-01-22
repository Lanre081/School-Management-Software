import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto animate-fadeIn">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-brown-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all w-full max-w-lg animate-slideUp border border-brown-200">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary to-primary-dark px-6 py-5 flex justify-between items-center">
                        <h3 className="text-xl font-bold leading-6 text-cream-100">
                            {title}
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-cream-200 hover:text-cream-50 transition-colors outline-none hover:bg-white/10 p-1.5 rounded-lg"
                        >
                            <X size={22} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="px-6 py-6 max-h-[70vh] overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
