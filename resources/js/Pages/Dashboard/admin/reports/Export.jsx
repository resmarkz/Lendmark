import DashboardLayout from "@/Layouts/DashboardLayout";
import { useState } from "react";

const ExportReportsPage = () => {
    const [filters, setFilters] = useState({
        start_date: "",
        end_date: "",
    });

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const getExportUrl = (baseRoute) => {
        const params = new URLSearchParams();
        if (filters.start_date) {
            params.append("start_date", filters.start_date);
        }
        if (filters.end_date) {
            params.append("end_date", filters.end_date);
        }
        const queryString = params.toString();
        return queryString
            ? `${route(baseRoute)}?${queryString}`
            : route(baseRoute);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Export Reports</h2>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Filter Reports
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Start Date
                        </label>
                        <input
                            type="date"
                            name="start_date"
                            value={filters.start_date}
                            onChange={handleFilterChange}
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            End Date
                        </label>
                        <input
                            type="date"
                            name="end_date"
                            value={filters.end_date}
                            onChange={handleFilterChange}
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Download CSV Reports
                </h3>
                {(filters.start_date || filters.end_date) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a
                            href={getExportUrl("admin.reports.export-loans")}
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <i className="fas fa-file-csv mr-2"></i> Export Loans
                            CSV
                        </a>
                        <a
                            href={getExportUrl("admin.reports.export-payments")}
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <i className="fas fa-file-csv mr-2"></i> Export Payments
                            CSV
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

ExportReportsPage.layout = (page) => (
    <DashboardLayout children={page} auth={page.props.auth} />
);

export default ExportReportsPage;
