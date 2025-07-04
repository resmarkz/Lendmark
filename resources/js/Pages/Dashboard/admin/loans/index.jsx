import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination/Pagination";
import LoanTable from "@/Components/Tables/LoanTable";
import { useState } from "react";

function AdminLoanSubpage({ loans }) {
    const [filters, setFilters] = useState({
        search: "",
        status: "all",
        amount_min: "",
        amount_max: "",
        date_from: "",
        date_to: "",
        collector: "all",
        term: "all",
    });

    // Frontend filtering
    const filteredLoans = {
        ...loans,
        data: loans.data.filter((loan) => {
            // Text search
            const matchesSearch =
                loan.client_name
                    ?.toLowerCase()
                    .includes(filters.search.toLowerCase()) ||
                loan.marketing_id
                    ?.toLowerCase()
                    .includes(filters.search.toLowerCase());

            // Status filter
            const matchesStatus =
                filters.status === "all" || loan.status === filters.status;

            // Amount range
            const amount = parseFloat(loan.amount);
            const matchesMinAmount =
                !filters.amount_min || amount >= parseFloat(filters.amount_min);
            const matchesMaxAmount =
                !filters.amount_max || amount <= parseFloat(filters.amount_max);

            // Date range
            const loanDate = new Date(loan.created_at);
            const fromDate = filters.date_from
                ? new Date(filters.date_from)
                : null;
            const toDate = filters.date_to ? new Date(filters.date_to) : null;
            const matchesDateFrom = !fromDate || loanDate >= fromDate;
            const matchesDateTo = !toDate || loanDate <= toDate;

            // Collector filter
            const matchesCollector =
                filters.collector === "all" ||
                loan.collector_id?.toString() === filters.collector;

            // Term filter
            const matchesTerm =
                filters.term === "all" ||
                loan.term?.toString() === filters.term;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesMinAmount &&
                matchesMaxAmount &&
                matchesDateFrom &&
                matchesDateTo &&
                matchesCollector &&
                matchesTerm
            );
        }),
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    // Get unique collectors for filter dropdown
    const uniqueCollectors = [
        ...new Set(loans.data.map((loan) => loan.collector_id)),
    ];

    return (
        <div className="space-y-6">
            {/* Header with create button */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    Loan Management
                </h2>
                <Link
                    href={route("admin.loans.create")}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <i className="fas fa-plus mr-2"></i> Create Loan
                </Link>
            </div>

            {/* Comprehensive filter panel */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Filter Loans
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Search */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Search (Client/Loan ID)
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

                    {/* Status */}
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
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="settled">Settled</option>
                            <option value="overdue">Overdue</option>
                        </select>
                    </div>

                    {/* Amount Range */}
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

                    {/* Date Range */}
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

                    {/* Collector */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Collector
                        </label>
                        <select
                            name="collector"
                            value={filters.collector}
                            onChange={handleFilterChange}
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="all">All Collectors</option>
                            {uniqueCollectors.map((collectorId) => (
                                <option key={collectorId} value={collectorId}>
                                    {loans.data.find(
                                        (l) => l.collector_id === collectorId
                                    )?.collector_name ||
                                        `Collector ${collectorId}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Term */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Term
                        </label>
                        <select
                            name="term"
                            value={filters.term}
                            onChange={handleFilterChange}
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="all">All Terms</option>
                            <option value="7">7 days</option>
                            <option value="14">14 days</option>
                            <option value="30">30 days</option>
                            <option value="60">60 days</option>
                            <option value="90">90 days</option>
                        </select>
                    </div>
                </div>

                {/* Reset button */}
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={() =>
                            setFilters({
                                search: "",
                                status: "all",
                                amount_min: "",
                                amount_max: "",
                                date_from: "",
                                date_to: "",
                                collector: "all",
                                term: "all",
                            })
                        }
                        className="text-sm text-indigo-600 hover:text-indigo-800"
                    >
                        Reset All Filters
                    </button>
                </div>
            </div>

            {/* Results table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <LoanTable loans={filteredLoans} />
                <Pagination links={loans.links} meta={loans.meta} />
            </div>
        </div>
    );
}

AdminLoanSubpage.layout = (page) => (
    <DashboardLayout children={page} auth={page.props.auth} />
);

export default AdminLoanSubpage;
