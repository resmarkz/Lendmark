import DashboardLayout from "@/Layouts/DashboardLayout";
import { useForm } from "@inertiajs/react";

const AdminLoanCreate = ({ clients, collectors }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        client_profile_id: "",
        collector_profile_id: "",
        amount: "",
        interest_rate: "",
        term_months: "",
        status: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.loans.store"), {
            onSuccess: () => reset(),
            preserveScroll: true,
        });
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Create Loan</h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white p-6 rounded-2xl shadow"
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Client
                    </label>
                    <select
                        value={data.client_profile_id}
                        onChange={(e) =>
                            setData("client_profile_id", e.target.value)
                        }
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select Client</option>
                        {clients.map((client) => (
                            <option key={client.id} value={client.id}>
                                {client.name}
                            </option>
                        ))}
                    </select>
                    {errors.client_profile_id && (
                        <p className="text-sm text-red-600 mt-1">
                            {errors.client_profile_id}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Collector
                    </label>
                    <select
                        value={data.collector_profile_id}
                        onChange={(e) =>
                            setData("collector_profile_id", e.target.value)
                        }
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select Collector</option>
                        {collectors.map((collector) => (
                            <option key={collector.id} value={collector.id}>
                                {collector.name}
                            </option>
                        ))}
                    </select>
                    {errors.collector_profile_id && (
                        <p className="text-sm text-red-600 mt-1">
                            {errors.collector_profile_id}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Amount
                    </label>
                    <input
                        type="number"
                        value={data.amount}
                        onChange={(e) => setData("amount", e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.amount && (
                        <p className="text-sm text-red-600 mt-1">
                            {errors.amount}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Interest Rate (%)
                    </label>
                    <input
                        type="number"
                        value={data.interest_rate}
                        onChange={(e) =>
                            setData("interest_rate", e.target.value)
                        }
                        step="0.01"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.interest_rate && (
                        <p className="text-sm text-red-600 mt-1">
                            {errors.interest_rate}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Term (months)
                    </label>
                    <input
                        type="number"
                        value={data.term_months}
                        onChange={(e) => setData("term_months", e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.term_months && (
                        <p className="text-sm text-red-600 mt-1">
                            {errors.term_months}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Status
                    </label>
                    <input
                        type="text"
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.status && (
                        <p className="text-sm text-red-600 mt-1">
                            {errors.status}
                        </p>
                    )}
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {processing ? "Creating..." : "Create Loan"}
                    </button>
                </div>
            </form>
        </div>
    );
};

AdminLoanCreate.layout = (page) => (
    <DashboardLayout children={page} auth={page.props.auth} />
);

export default AdminLoanCreate;
