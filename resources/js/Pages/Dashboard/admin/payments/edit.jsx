import DashboardLayout from "@/Layouts/DashboardLayout";
import { useForm, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";

const AdminPaymentEdit = ({ payment, loans, auth }) => {
    const [selectedLoanDetails, setSelectedLoanDetails] = useState(null);

    useEffect(() => {
        if (payment.loan_id && loans) {
            const initialLoan = loans.find(
                (loan) => loan.id === payment.loan_id
            );
            setSelectedLoanDetails(initialLoan);
        }
    }, [payment.loan_id, loans]);

    const { data, setData, put, processing, errors, reset } = useForm({
        loan_id: payment.loan_id || "",
        amount_paid: payment.amount_paid || "",
        due_date: payment.due_date || "",
        paid_at: payment.paid_at || "",
        status: payment.status || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("admin.payments.update", payment.id), {
            onSuccess: () => reset(),
            preserveScroll: true,
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    Edit Payment #{payment.id}
                </h2>
                <div className="flex gap-3">
                    <Link
                        href={route("admin.payments.index")}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <i className="fas fa-arrow-left mr-2"></i> Back to Payments
                    </Link>
                </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="loan_id"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Loan <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="loan_id"
                                value={data.loan_id}
                                onChange={(e) => {
                                    setData("loan_id", e.target.value);
                                    const selectedLoan = loans.find(
                                        (loan) => loan.id == e.target.value
                                    );
                                    setSelectedLoanDetails(selectedLoan);
                                }}
                                className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                    errors.loan_id
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                required
                            >
                                <option value="">Select Loan</option>
                                {loans.map((loan) => (
                                    <option key={loan.id} value={loan.id}>
                                        {loan.id} - {loan.client_name}
                                    </option>
                                ))}
                            </select>
                            {errors.loan_id && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.loan_id}
                                </p>
                            )}
                            
                        </div>

                        <div>
                            <label
                                htmlFor="amount_paid"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Amount Paid <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="amount_paid"
                                value={data.amount_paid}
                                onChange={(e) =>
                                    setData("amount_paid", e.target.value)
                                }
                                className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                    errors.amount_paid
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                required
                                min="0"
                                step="0.01"
                            />
                            {errors.amount_paid && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.amount_paid}
                                </p>
                            )}
                        </div>

                        

                        <div>
                            <label
                                htmlFor="paid_at"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Paid At
                            </label>
                            <input
                                type="date"
                                id="paid_at"
                                value={data.paid_at}
                                onChange={(e) =>
                                    setData("paid_at", e.target.value)
                                }
                                className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                    errors.paid_at
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            {errors.paid_at && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.paid_at}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="status"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Status <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) =>
                                    setData("status", e.target.value)
                                }
                                className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                    errors.status
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                required
                            >
                                <option value="">Select Status</option>
                                <option value="unpaid">Unpaid</option>
                                <option value="partial">Partial</option>
                                <option value="paid">Paid</option>
                            </select>
                            {errors.status && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.status}
                                </p>
                            )}
                        </div>
                    </div>

                    {selectedLoanDetails && (
                        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Loan Overview</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <p className="text-base text-gray-700">
                                    <span className="font-semibold">Client Name:</span> {selectedLoanDetails.client_name}
                                </p>
                                <p className="text-base text-gray-700">
                                    <span className="font-semibold">Total Amount:</span> ${typeof selectedLoanDetails.amount === 'number' ? selectedLoanDetails.amount.toFixed(2) : 'N/A'}
                                </p>
                                <p className="text-base text-gray-700">
                                    <span className="font-semibold">Remaining Balance:</span> ${typeof selectedLoanDetails.remaining_balance === 'number' ? selectedLoanDetails.remaining_balance.toFixed(2) : 'N/A'}
                                </p>
                                <p className="text-base text-gray-700">
                                    <span className="font-semibold">Loan Term:</span> {selectedLoanDetails.loan_term} months
                                </p>
                                <p className="text-base text-gray-700">
                                    <span className="font-semibold">Interest Rate:</span> {selectedLoanDetails.interest_rate}%
                                </p>
                                <p className="text-base text-gray-700">
                                    <span className="font-semibold">Start Date:</span> {selectedLoanDetails.start_date}
                                </p>
                                <p className="text-base text-gray-700">
                                    <span className="font-semibold">End Date:</span> {selectedLoanDetails.end_date}
                                </p>
                                <p className="text-base text-gray-700">
                                    <span className="font-semibold">Status:</span> {selectedLoanDetails.status}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end pt-4 border-t border-gray-200">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? (
                                <>
                                    <i className="fas fa-spinner fa-spin mr-2"></i>
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-save mr-2"></i>
                                    Update Payment
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

AdminPaymentEdit.layout = (page) => (
    <DashboardLayout children={page} auth={page.props.auth} />
);

export default AdminPaymentEdit;