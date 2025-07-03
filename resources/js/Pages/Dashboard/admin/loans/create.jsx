import DashboardLayout from "@/Layouts/DashboardLayout";
import { useForm, Link } from "@inertiajs/react";

const AdminLoanCreate = ({ clients, collectors, auth }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        client_profile_id: "",
        collector_profile_id: "",
        amount: "",
        interest_rate: "",
        term: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.loans.store"), {
            onSuccess: () => reset(),
            preserveScroll: true,
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    Create New Loan
                </h2>
                <div className="flex gap-3">
                    <Link
                        href={route("admin.loans.index")}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <i className="fas fa-arrow-left mr-2"></i> Back to Loans
                    </Link>
                </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="client_profile_id"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Client <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="client_profile_id"
                                value={data.client_profile_id}
                                onChange={(e) =>
                                    setData("client_profile_id", e.target.value)
                                }
                                className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                    errors.client_profile_id
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                required
                            >
                                <option value="">Select Client</option>
                                {clients.map((client) => (
                                    <option key={client.id} value={client.id}>
                                        {client.name} ({client.id})
                                    </option>
                                ))}
                            </select>
                            {errors.client_profile_id && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.client_profile_id}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="collector_profile_id"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Collector{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="collector_profile_id"
                                value={data.collector_profile_id}
                                onChange={(e) =>
                                    setData(
                                        "collector_profile_id",
                                        e.target.value
                                    )
                                }
                                className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                    errors.collector_profile_id
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                required
                            >
                                <option value="">Select Collector</option>
                                {collectors.map((collector) => (
                                    <option
                                        key={collector.id}
                                        value={collector.id}
                                    >
                                        {collector.name} ({collector.id})
                                    </option>
                                ))}
                            </select>
                            {errors.collector_profile_id && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.collector_profile_id}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="amount"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Amount <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="amount"
                                value={data.amount}
                                onChange={(e) =>
                                    setData("amount", e.target.value)
                                }
                                className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                    errors.amount
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                required
                                min="0"
                                step="0.01"
                            />
                            {errors.amount && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.amount}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="interest_rate"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Interest Rate (%){" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="interest_rate"
                                value={data.interest_rate}
                                onChange={(e) =>
                                    setData("interest_rate", e.target.value)
                                }
                                className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                    errors.interest_rate
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                required
                            >
                                <option value="">Select Interest Rate</option>
                                <option value="2">2%</option>
                                <option value="3">3%</option>
                                <option value="5">5%</option>
                                <option value="7">7%</option>
                                <option value="10">10%</option>
                                <option value="12">12%</option>
                                <option value="15">15%</option>
                                <option value="20">20%</option>
                            </select>
                            {errors.interest_rate && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.interest_rate}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="term"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Term <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="term"
                                value={data.term}
                                onChange={(e) =>
                                    setData("term", e.target.value)
                                }
                                className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                    errors.term
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                required
                            >
                                <option value="">Select Term</option>
                                <option value="6">6 months</option>
                                <option value="7">7 months</option>
                                <option value="8">8 months</option>
                                <option value="9">9 months</option>
                                <option value="10">10 months</option>
                                <option value="11">11 months</option>
                                <option value="12">1 year</option>
                            </select>
                            {errors.term && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.term}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-gray-200">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? (
                                <>
                                    <i className="fas fa-spinner fa-spin mr-2"></i>
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-save mr-2"></i>
                                    Create Loan
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

AdminLoanCreate.layout = (page) => (
    <DashboardLayout children={page} auth={page.props.auth} />
);

export default AdminLoanCreate;
