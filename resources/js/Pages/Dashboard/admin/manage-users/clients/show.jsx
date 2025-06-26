import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link } from "@inertiajs/react";

const AdminManageClientsEdit = ({ client, auth }) => {
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
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* Basic Info Section */}
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
                                <p className="mt-1 text-xs text-gray-500">
                                    {client.email_verified_at
                                        ? "Verified"
                                        : "Unverified"}
                                </p>
                            </div>
                        </div>

                        {/* Profile Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                                Profile Information
                            </h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Contact Number
                                </label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {client.client_profile?.contact_number ||
                                        "N/A"}
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

                        {/* Address Section */}
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

                        {/* Financial Info Section */}
                        <div className="space-y-4 sm:col-span-2">
                            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                                Financial Information
                            </h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Source of Income
                                </label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {client.client_profile?.source_of_income ||
                                        "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>

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
                </div>
            </div>
        </div>
    );
};

AdminManageClientsEdit.layout = (page) => (
    <DashboardLayout children={page} auth={page.props.auth} />
);

export default AdminManageClientsEdit;
