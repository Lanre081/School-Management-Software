import React from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';

const Table = ({ columns, data, onEdit, onDelete, onView, actions = true }) => {
    return (
        <div className="bg-cream-50 rounded-xl shadow-sm border border-brown-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-brown-200/50">
                    <thead className="bg-brown-100/50">
                        <tr>
                            {columns.map((col, idx) => (
                                <th
                                    key={idx}
                                    className="px-6 py-4 text-left text-xs font-bold text-brown-800 uppercase tracking-wider"
                                >
                                    {col.header}
                                </th>
                            ))}
                            {actions && (
                                <th className="px-6 py-4 text-right text-xs font-bold text-brown-800 uppercase tracking-wider">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-brown-100">
                        {data.length > 0 ? (
                            data.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className="hover:bg-brown-50 transition-colors group even:bg-cream-50/50"
                                >
                                    {columns.map((col, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className="px-6 py-4 whitespace-nowrap text-sm text-brown-900 font-medium"
                                        >
                                            {col.render ? col.render(row) : row[col.accessor]}
                                        </td>
                                    ))}
                                    {actions && (
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {onView && (
                                                    <button
                                                        onClick={() => onView(row)}
                                                        className="p-2 text-brown-600 hover:bg-brown-100 rounded-lg transition-all hover:shadow-sm"
                                                        title="View"
                                                    >
                                                        <Eye size={18} />
                                                    </button>
                                                )}
                                                {onEdit && (
                                                    <button
                                                        onClick={() => onEdit(row)}
                                                        className="p-2 text-primary hover:bg-brown-100 rounded-lg transition-all hover:shadow-sm"
                                                        title="Edit"
                                                    >
                                                        <Edit size={18} />
                                                    </button>
                                                )}
                                                {onDelete && (
                                                    <button
                                                        onClick={() => onDelete(row)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all hover:shadow-sm"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-12 text-center">
                                    <div className="flex flex-col items-center justify-center text-gray-400">
                                        <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                        </svg>
                                        <p className="font-medium">No data available</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
