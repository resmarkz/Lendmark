import PropTypes from "prop-types";
import { Link } from "@inertiajs/react";
import Table from "./Table";
import DeleteButton from "../DeleteButton";

const PaymentTable = ({ payments }) => {
    const getStatusBadge = (status) => {
        const statusColors = {
            unpaid: "bg-red-100 text-red-800",
            partial: "bg-yellow-100 text-yellow-800",
            paid: "bg-green-100 text-green-800",
            default: "bg-gray-100 text-gray-800",
        };
        return statusColors[status] || statusColors.default;
    };

    const headers = [
        { label: "Payment ID", className: "w-1/8" },
        { label: "Loan ID", className: "w-1/8" },
        { label: "Client", className: "w-1/6" },
        { label: "Amount Paid", className: "w-1/8" },
        { label: "Status", className: "w-1/8" },
        { label: "Due Date", className: "w-1/6" },
        { label: "Paid At", className: "w-1/6" },
        { label: "Actions", className: "w-1/8 text-right" },
    ];

    const renderDesktopRow = (payment) => (
        <>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                <Link
                    href={route("admin.payments.show", payment.id)}
                    className="hover:underline"
                >
                    {payment.id}
                </Link>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {payment.loan_id || "N/A"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {payment.client_name || "N/A"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ₱{parseInt(payment.amount_paid).toLocaleString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span
                    className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                        payment.status
                    )}`}
                >
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(payment.due_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                })}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {payment.paid_at ? new Date(payment.paid_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                }) : 'N/A'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                    <Link
                        href={route("admin.payments.edit", payment.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Edit"
                    >
                        <i className="fas fa-edit"></i>
                    </Link>
                    <DeleteButton
                        routeName="admin.payments.destroy"
                        itemId={payment.id}
                        confirmText="Are you sure you want to delete this payment?"
                    >
                        <i className="fas fa-trash"></i>
                    </DeleteButton>
                </div>
            </td>
        </>
    );

    const renderMobileCard = (payment) => (
        <div className="p-4 bg-white border-b border-gray-200">
            <div className="flex justify-between items-start">
                <div>
                    <Link
                        href={route("admin.payments.show", payment.id)}
                        className="text-indigo-600 font-medium hover:underline text-sm"
                    >
                        {payment.id}
                    </Link>
                    <p className="text-xs text-gray-500 mt-1">
                        Client: {payment.client_name || "N/A"}
                    </p>
                </div>
                <span
                    className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                        payment.status
                    )}`}
                >
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                <div className="flex flex-col">
                    <span className="text-gray-500 font-medium">Amount Paid</span>
                    <span>₱{typeof payment.amount_paid === 'number' ? payment.amount_paid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : (parseFloat(payment.amount_paid) || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-gray-500 font-medium">Due Date</span>
                    <span>
                        {new Date(payment.due_date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-gray-500 font-medium">Paid At</span>
                    <span>
                        {payment.paid_at ? new Date(payment.paid_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        }) : 'N/A'}
                    </span>
                </div>
            </div>

            <div className="mt-3 flex justify-end space-x-3">
                <Link
                    href={route("admin.payments.edit", payment.id)}
                    className="text-indigo-600 hover:text-indigo-900"
                    title="Edit"
                >
                    <i className="fas fa-edit"></i>
                </Link>
                <DeleteButton
                    routeName="admin.payments.destroy"
                    itemId={payment.id}
                    confirmText="Are you sure you want to delete this payment?"
                >
                    <i className="fas fa-trash"></i>
                </DeleteButton>
            </div>
        </div>
    );

    return (
        <Table
            headers={headers}
            data={payments.data}
            emptyMessage="No payments found"
            renderDesktopRow={renderDesktopRow}
            renderMobileCard={renderMobileCard}
            className="shadow overflow-hidden sm:rounded-lg"
        />
    );
};

PaymentTable.propTypes = {
    payments: PropTypes.object.isRequired,
};

export default PaymentTable;