import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link } from "@inertiajs/react";

import { formatCurrency } from "@/utils";

const AdminManageClientsShow = ({ client, auth }) => {
    const allPayments =
        client.client_profile?.loans?.flatMap((loan) => loan.payments) || [];
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    Client Details
                </h2>
                <div className="flex gap-3">
                    <Link
                        href={route("admin.manage-users.clients.index")}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <i className="fas fa-arrow-left mr-2"></i> Back to
                        Clients
                    </Link>
                </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-6 py-5">
                    <>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                                    Basic Information
                                </h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">
                                        Full Name
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {client.name}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">
                                        Email Address
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {client.email}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                                    Profile Information
                                </h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">
                                        Contact Number
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {client.client_profile
                                            ?.contact_number || "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">
                                        Date of Birth
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {client.client_profile?.date_of_birth ||
                                            "N/A"}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4 sm:col-span-2">
                                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                                    Address Information
                                </h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">
                                        Full Address
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {client.client_profile?.address ||
                                            "No address provided"}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4 sm:col-span-2">
                                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                                    Financial Information
                                </h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">
                                        Source of Income
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {client.client_profile
                                            ?.source_of_income || "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {client.client_profile?.loans &&
                            client.client_profile.loans.length > 0 && (
                                <div className="space-y-4 sm:col-span-2 mt-6">
                                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                                        Loans
                                    </h3>
                                    <div className="overflow-x-auto">
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
                                                        Amount
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Remaining Balance
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
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {client.client_profile.loans.map(
                                                    (loan) => (
                                                        <tr key={loan.id}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                                                                <Link
                                                                    href={route(
                                                                        "admin.loans.show",
                                                                        loan.id
                                                                    )}
                                                                    className="hover:underline"
                                                                >
                                                                    {
                                                                        loan.marketing_id
                                                                    }
                                                                </Link>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {formatCurrency(loan.amount)}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {formatCurrency(loan.remaining_balance)}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {loan.status}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {new Date(
                                                                    loan.disbursement_date
                                                                ).toLocaleDateString()}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                        {allPayments.length > 0 && (
                            <div className="space-y-4 sm:col-span-2 mt-6">
                                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                                    Payments
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Payment ID
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Amount Paid
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Paid At
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {allPayments.map((payment) => (
                                                <tr key={payment.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                                                        <Link href={route("admin.payments.show", payment.id)} className="hover:underline">
                                                            {payment.id}
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {formatCurrency(payment.amount_paid)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(
                                                            payment.paid_at
                                                        ).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {payment.status}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end pt-4 border-t border-gray-200 mt-6">
                            <Link
                                href={route(
                                    "admin.manage-users.clients.edit",
                                    client.id
                                )}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <i className="fas fa-edit mr-2"></i>
                                Edit Client
                            </Link>
                        </div>
                    </>
                </div>
            </div>
        </div>
    );
};

AdminManageClientsShow.layout = (page) => (
    <DashboardLayout children={page} auth={page.props.auth} />
);

export default AdminManageClientsShow;
