import PropTypes from "prop-types";
import { Link } from "@inertiajs/react";
import Table from "./Table";
import DeleteButton from "../DeleteButton";

import { formatCurrency } from "@/utils";

const LoanTable = ({ loans }) => {
    const getStatusBadge = (status) => {
        const statusClasses = {
            active: "bg-blue-100 text-blue-800",
            ongoing: "bg-blue-100 text-blue-800",
            pending: "bg-yellow-100 text-yellow-800",
            approved: "bg-green-100 text-green-800",
            rejected: "bg-red-100 text-red-800",
            paid: "bg-purple-100 text-purple-800",
            overdue: "bg-red-100 text-red-800",
            settled: "bg-emerald-100 text-emerald-800",
            cancelled: "bg-gray-100 text-gray-800",
            default: "bg-gray-100 text-gray-800",
        };
        return statusClasses[status] || statusClasses.default;
    };

    const headers = [
        { label: "Loan ID", className: "w-1/8" },
        { label: "Client", className: "w-1/6" },
        { label: "Collector", className: "w-1/6" },
        { label: "Amount", className: "w-1/8" },
        { label: "Interest", className: "w-1/8" },
        { label: "Term", className: "w-1/8" },
        { label: "Status", className: "w-1/8" },
        { label: "Disbursement Date", className: "w-1/6" },
        { label: "Actions", className: "w-1/8 text-right" },
    ];

    const renderDesktopRow = (loan) => (
        <>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                <Link
                    href={route("admin.loans.show", loan.id)}
                    className="hover:underline"
                >
                    {loan.marketing_id}
                </Link>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <Link href={route("admin.manage-users.clients.show", loan.client_id)} className="font-medium text-indigo-600 hover:text-indigo-900 hover:underline">
                    {loan.client_name || "N/A"}
                </Link>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {loan.collector_name || "N/A"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatCurrency(loan.amount)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {loan.interest_rate}%
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {loan.term}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span
                    className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                        loan.status
                    )}`}
                >
                    {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(loan.disbursement_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                    <Link
                        href={route("admin.loans.edit", loan.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Edit"
                    >
                        <i className="fas fa-edit"></i>
                    </Link>
                    <DeleteButton
                        routeName="admin.loans.destroy"
                        itemId={loan.id}
                        confirmText="Are you sure you want to delete this loan?"
                    >
                        <i className="fas fa-trash"></i>
                    </DeleteButton>
                </div>
            </td>
        </>
    );

    const renderMobileCard = (loan) => (
        <div className="p-4 bg-white border-b border-gray-200">
            <div className="flex justify-between items-start">
                <div>
                    <Link
                        href={route("admin.loans.show", loan.id)}
                        className="text-indigo-600 font-medium hover:underline text-sm"
                    >
                        {loan.marketing_id}
                    </Link>
                    <p className="text-xs text-gray-500 mt-1">
                        Client: {loan.client_name || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500">
                        Collector: {loan.collector_name || "N/A"}
                    </p>
                </div>
                <span
                    className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                        loan.status
                    )}`}
                >
                    {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                <div className="flex flex-col">
                    <span className="text-gray-500 font-medium">Amount</span>
                    <span>₱{parseInt(loan.amount).toLocaleString()}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-gray-500 font-medium">Interest</span>
                    <span>{loan.interest_rate}%</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-gray-500 font-medium">Term</span>
                    <span>{loan.term}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-gray-500 font-medium">Due Date</span>
                    <span>
                        {new Date(loan.disbursement_date).toLocaleDateString(
                            "en-US",
                            {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }
                        )}
                    </span>
                </div>
            </div>

            <div className="mt-3 flex justify-end space-x-3">
                <Link
                    href={route("admin.loans.edit", loan.id)}
                    className="text-indigo-600 hover:text-indigo-900"
                    title="Edit"
                >
                    <i className="fas fa-edit"></i>
                </Link>
                <DeleteButton
                    routeName="admin.loans.destroy"
                    itemId={loan.id}
                    confirmText="Are you sure you want to delete this loan?"
                >
                    <i className="fas fa-trash"></i>
                </DeleteButton>
            </div>
        </div>
    );

    return (
        <Table
            headers={headers}
            data={loans.data}
            emptyMessage="No loans found"
            renderDesktopRow={renderDesktopRow}
            renderMobileCard={renderMobileCard}
            className="shadow overflow-hidden sm:rounded-lg"
        />
    );
};

LoanTable.propTypes = {
    loans: PropTypes.object.isRequired,
};

export default LoanTable;
