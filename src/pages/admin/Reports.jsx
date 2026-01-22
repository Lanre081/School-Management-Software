import React, { useState } from 'react';
import {
    FileBarChart, Users, GraduationCap, Calendar,
    DollarSign, TrendingUp, Download, FileText, FileSpreadsheet
} from 'lucide-react';

const Reports = () => {
    const [dateRange, setDateRange] = useState({ from: '', to: '' });

    const reportTypes = [
        {
            id: 1,
            title: 'Student Report',
            description: 'Complete list of all students with their details and academic information',
            icon: Users,
            color: 'from-blue-500 to-blue-600',
            bg: 'bg-cream-200',
            lastGenerated: '2026-01-10',
            totalRecords: 1245
        },
        {
            id: 2,
            title: 'Teacher Report',
            description: 'Comprehensive teacher directory with qualifications and subject assignments',
            icon: GraduationCap,
            color: 'from-green-500 to-green-600',
            bg: 'bg-cream-200',
            lastGenerated: '2026-01-09',
            totalRecords: 84
        },
        {
            id: 3,
            title: 'Attendance Report',
            description: 'Daily attendance statistics with trend analysis and absent records',
            icon: Calendar,
            color: 'from-purple-500 to-purple-600',
            bg: 'bg-cream-200',
            lastGenerated: '2026-01-11',
            totalRecords: 15680
        },
        {
            id: 4,
            title: 'Fee Collection Report',
            description: 'Payment status, pending fees, and collection summary by class and date',
            icon: DollarSign,
            color: 'from-amber-500 to-amber-600',
            bg: 'bg-cream-200',
            lastGenerated: '2026-01-08',
            totalRecords: 1245
        },
        {
            id: 5,
            title: 'Academic Performance',
            description: 'Student grades, exam results, and performance analytics by subject',
            icon: TrendingUp,
            color: 'from-red-500 to-red-600',
            bg: 'bg-cream-200',
            lastGenerated: '2026-01-07',
            totalRecords: 3250
        },
    ];

    const handleExport = (reportTitle, format) => {
        console.log(`Exporting ${reportTitle} as ${format}...`);
        alert(`${reportTitle} will be exported as ${format} file.\n\nThis is a demo - in production, this would generate and download the actual file.`);
    };

    const ExportButton = ({ icon: Icon, format, reportTitle, color }) => (
        <button
            onClick={() => handleExport(reportTitle, format)}
            className={`flex items-center gap-2 px-4 py-2 ${color} text-white rounded-lg font-medium hover:shadow-md transition-all transform hover:-translate-y-0.5`}
        >
            <Icon size={16} />
            {format}
        </button>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-brown-900 flex items-center gap-3">
                        <FileBarChart className="text-primary" size={36} />
                        Reports & Exports
                    </h1>
                    <p className="text-brown-600 mt-1">Generate and download comprehensive reports</p>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl shadow-sm border border-primary/20 p-6">
                <h2 className="text-lg font-bold text-brown-900 mb-4">Report Summary</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-cream-50 rounded-lg p-4 shadow-sm border border-brown-100">
                        <p className="text-brown-500 text-sm font-medium">Total Reports</p>
                        <p className="text-3xl font-bold text-primary mt-1">{reportTypes.length}</p>
                    </div>
                    <div className="bg-cream-50 rounded-lg p-4 shadow-sm border border-brown-100">
                        <p className="text-brown-500 text-sm font-medium">Total Records</p>
                        <p className="text-3xl font-bold text-primary mt-1">
                            {reportTypes.reduce((sum, r) => sum + r.totalRecords, 0).toLocaleString()}
                        </p>
                    </div>
                    <div className="bg-cream-50 rounded-lg p-4 shadow-sm border border-brown-100">
                        <p className="text-brown-500 text-sm font-medium">Export Formats</p>
                        <p className="text-3xl font-bold text-primary mt-1">3</p>
                    </div>
                </div>
            </div>

            {/* Date Range Filter */}
            <div className="bg-white rounded-xl shadow-sm border border-brown-200 p-6">
                <h3 className="text-lg font-bold text-brown-900 mb-4">Date Range Filter (Optional)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-brown-700 mb-2">From Date</label>
                        <input
                            type="date"
                            className="w-full px-4 py-3 border-2 border-brown-200 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-brown-800"
                            value={dateRange.from}
                            onChange={e => setDateRange({ ...dateRange, from: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-brown-700 mb-2">To Date</label>
                        <input
                            type="date"
                            className="w-full px-4 py-3 border-2 border-brown-200 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-brown-800"
                            value={dateRange.to}
                            onChange={e => setDateRange({ ...dateRange, to: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            {/* Report Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {reportTypes.map((report) => (
                    <div
                        key={report.id}
                        className="bg-white rounded-xl shadow-sm border border-brown-200 p-6 hover:shadow-lg transition-all"
                    >
                        {/* Report Header */}
                        <div className="flex items-start gap-4 mb-4">
                            <div className={`w-14 h-14 ${report.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                <report.icon className="text-primary" size={28} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-brown-900 mb-1">{report.title}</h3>
                                <p className="text-brown-600 text-sm">{report.description}</p>
                            </div>
                        </div>

                        {/* Report Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-brown-100">
                            <div>
                                <p className="text-xs text-brown-500 font-medium">Last Generated</p>
                                <p className="text-sm font-bold text-brown-700 mt-1">{report.lastGenerated}</p>
                            </div>
                            <div>
                                <p className="text-xs text-brown-500 font-medium">Total Records</p>
                                <p className="text-sm font-bold text-brown-700 mt-1">{report.totalRecords.toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Export Buttons */}
                        <div className="space-y-2">
                            <p className="text-sm font-semibold text-brown-700 mb-3">Export As:</p>
                            <div className="flex flex-wrap gap-2">
                                <ExportButton
                                    icon={FileSpreadsheet}
                                    format="CSV"
                                    reportTitle={report.title}
                                    color="bg-green-600 hover:bg-green-700"
                                />
                                <ExportButton
                                    icon={FileText}
                                    format="PDF"
                                    reportTitle={report.title}
                                    color="bg-red-600 hover:bg-red-700"
                                />
                                <ExportButton
                                    icon={Download}
                                    format="Excel"
                                    reportTitle={report.title}
                                    color="bg-blue-600 hover:bg-blue-700"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Info Banner */}
            <div className="bg-cream-200 border border-brown-200 rounded-xl p-4">
                <div className="flex gap-3">
                    <FileBarChart className="text-primary flex-shrink-0" size={20} />
                    <div>
                        <p className="text-sm font-semibold text-brown-900">Export Information</p>
                        <p className="text-xs text-brown-700 mt-1">
                            Click any export button to download the report in your preferred format.
                            Date range filters (when provided) will be applied to applicable reports.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
