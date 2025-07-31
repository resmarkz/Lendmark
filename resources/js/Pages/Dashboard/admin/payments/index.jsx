import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination/Pagination";
import PaymentTable from "@/Components/Tables/PaymentTable";
import { useState } from "react";

function AdminPaymentSubpage({ payments, filters: initialFilters }) {
    const [filters, setFilters] = useState({
        search: initialFilters.search || "",
        status: initialFilters.status || "all",
        amount_min: initialFilters.amount_min || "",
        amount_max: initialFilters.amount_max || "",
        date_from: initialFilters.date_from || "",
        date_to: initialFilters.date_to || "",
    });

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const applyFilters = () => {
        const activeFilters = Object.fromEntries(
            Object.entries(filters).filter(([key, value]) => {
                if (
                    key === "search" ||
                    key === "amount_min" ||
                    key === "amount_max" ||
                    key === "date_from" ||
                    key === "date_to"
                ) {
                    return value !== "";
                }
                return value !== "all";
            })
        );

        router.get(route("admin.payments.index"), activeFilters, {
            preserveState: true,
            replace: true,
        });
    };

    const handleResetFilters = () => {
        const resetFilters = {
            search: "",
            status: "all",
            amount_min: "",
            amount_max: "",
            date_from: "",
            date_to: "",
        };
        setFilters(resetFilters);
        router.get(
            route("admin.payments.index"),
            {},
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    Payment Management
                </h2>
                <Link
                    href={route("admin.payments.create")}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <i className="fas fa-plus mr-2"></i> Create Payment
                </Link>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Filter Payments
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Search (Client/Payment ID)
                        </label>
                        <input
                            type="text"
                            name="search"
                            value={filters.search}
                            onChange={handleFilterChange}
                            placeholder="Search..."
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="all">All Statuses</option>
                            <option value="unpaid">Unpaid</option>
                            <option value="partial">Partial</option>
                            <option value="paid">Paid</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Min Amount
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">
                                        ₱
                                    </span>
                                </div>
                                <input
                                    type="number"
                                    name="amount_min"
                                    value={filters.amount_min}
                                    onChange={handleFilterChange}
                                    placeholder="0"
                                    className="block w-full pl-7 pr-12 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Max Amount
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">
                                        ₱
                                    </span>
                                </div>
                                <input
                                    type="number"
                                    name="amount_max"
                                    value={filters.amount_max}
                                    onChange={handleFilterChange}
                                    placeholder="Any"
                                    className="block w-full pl-7 pr-12 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                From Date
                            </label>
                            <input
                                type="date"
                                name="date_from"
                                value={filters.date_from}
                                onChange={handleFilterChange}
                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                To Date
                            </label>
                            <input
                                type="date"
                                name="date_to"
                                value={filters.date_to}
                                onChange={handleFilterChange}
                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex justify-between">
                    <button
                        onClick={handleResetFilters}
                        className="text-sm text-indigo-600 hover:text-indigo-800"
                    >
                        Reset All Filters
                    </button>
                    <button
                        onClick={applyFilters}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <PaymentTable payments={payments} />
                <Pagination links={payments.links} meta={payments.meta} />
            </div>
        </div>
    );
}

AdminPaymentSubpage.layout = (page) => (
    <DashboardLayout children={page} auth={page.props.auth} />
);

export default AdminPaymentSubpage;