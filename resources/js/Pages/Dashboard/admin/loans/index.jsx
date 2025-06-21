import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link } from "@inertiajs/react";

function AdminLoanSubpage({ loans }) {
    console.log(loans);
    const loansData = [
        {
            id: "LN-2023-001",
            amount: 1500,
            interest: "5%",
            term: "12 months",
            status: "active",
            dueDate: "Jun 15, 2023",
            client: "John Doe",
        },
        {
            id: "LN-2023-002",
            amount: 2300,
            interest: "7%",
            term: "6 months",
            status: "pending",
            dueDate: "Jun 20, 2023",
            client: "Jane Smith",
        },
        {
            id: "LN-2023-003",
            amount: 5000,
            interest: "6%",
            term: "24 months",
            status: "completed",
            dueDate: "May 10, 2023",
            client: "Robert Johnson",
        },
        {
            id: "LN-2023-004",
            amount: 3200,
            interest: "8%",
            term: "18 months",
            status: "overdue",
            dueDate: "Apr 5, 2023",
            client: "Sarah Williams",
        },
    ];

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

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">
                    Loan Management
                </h2>
            </div>

            {/* Responsive table container */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Loan ID
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Client
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Amount
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Interest
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Term
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Status
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Due Date
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loans.map((loan) => (
                            <tr key={loan.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                                    <Link
                                        href={`/dashboard/admin/loans/${loan.marketing_id}`}
                                        className="hover:underline"
                                    >
                                        {loan.marketing_id}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    Client Name
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
                                        {loan.status.charAt(0).toUpperCase() +
                                            loan.status.slice(1)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(loan.due_date).toLocaleDateString(
                                        "en-US",
                                        {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        }
                                    )}
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards View (shows on small screens) */}
            <div className="lg:hidden p-4 space-y-4">
                {loans.map((loan) => (
                    <div
                        key={loan.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <Link
                                    href={`/dashboard/admin/loans/${loan.id}`}
                                    className="text-indigo-600 font-medium hover:underline"
                                >
                                    {loan.marketing_id}
                                </Link>
                                <p className="text-sm text-gray-500 mt-1">
                                    Client Name
                                </p>
                            </div>
                            <span
                                className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                                    loan.status
                                )}`}
                            >
                                {loan.status.charAt(0).toUpperCase() +
                                    loan.status.slice(1)}
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
                                    {new Date(loan.due_date).toLocaleDateString(
                                        "en-US",
                                        {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        }
                                    )}
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
                ))}
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to{" "}
                    <span className="font-medium">4</span> of{" "}
                    <span className="font-medium">4</span> results
                </div>
                <div className="flex space-x-2">
                    <button className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        Previous
                    </button>
                    <button className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

AdminLoanSubpage.layout = (page) => (
    <DashboardLayout {...page.props}>{page}</DashboardLayout>
);

export default AdminLoanSubpage;
