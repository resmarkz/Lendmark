import PropTypes from "prop-types";
import { Link } from "@inertiajs/react";
import Table from "./Table";

const LoanTable = ({ loans }) => {
    const getStatusBadge = (status) => {
        const statusClasses = {
            active: "bg-green-100 text-green-800",
            pending: "bg-yellow-100 text-yellow-800",
            completed: "bg-blue-100 text-blue-800",
            overdue: "bg-red-100 text-red-800",
            default: "bg-gray-100 text-gray-800",
        };
        return statusClasses[status] || statusClasses.default;
    };

    const headers = [
        { label: "Loan ID", className: "w-1/8" },
        { label: "Client", className: "w-1/6" },
        { label: "Amount", className: "w-1/8" },
        { label: "Interest", className: "w-1/8" },
        { label: "Term", className: "w-1/8" },
        { label: "Status", className: "w-1/8" },
        { label: "Due Date", className: "w-1/6" },
        { label: "Actions", className: "w-1/8 text-right" },
    ];

    const renderDesktopRow = (loan) => (
        <>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                <Link
                    href={`/dashboard/admin/loans/${loan.marketing_id}`}
                    className="hover:underline"
                >
                    {loan.marketing_id}
                </Link>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {loan.client?.name || "N/A"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ₱{parseInt(loan.amount).toLocaleString()}
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
                {new Date(loan.due_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                })}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                    <Link
                        href={`/dashboard/admin/loans/${loan.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Edit"
                    >
                        <i className="fas fa-edit"></i>
                    </Link>
                    <button
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </>
    );

    const renderMobileCard = (loan) => (
        <div>
            <div className="flex justify-between items-start">
                <div>
                    <Link
                        href={`/dashboard/admin/loans/${loan.id}`}
                        className="text-indigo-600 font-medium hover:underline"
                    >
                        {loan.marketing_id}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">
                        {loan.client?.name || "N/A"}
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

            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                    <p className="text-gray-500">Amount</p>
                    <p>₱{parseInt(loan.amount).toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-gray-500">Interest</p>
                    <p>{loan.interest_rate}%</p>
                </div>
                <div>
                    <p className="text-gray-500">Term</p>
                    <p>{loan.term}</p>
                </div>
                <div>
                    <p className="text-gray-500">Due Date</p>
                    <p>
                        {new Date(loan.due_date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </p>
                </div>
            </div>

            <div className="mt-3 flex justify-end space-x-2">
                <Link
                    href={`/dashboard/admin/loans/${loan.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-900 p-2"
                    title="Edit"
                >
                    <i className="fas fa-edit"></i>
                </Link>
                <button
                    className="text-red-600 hover:text-red-900 p-2"
                    title="Delete"
                >
                    <i className="fas fa-trash"></i>
                </button>
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
