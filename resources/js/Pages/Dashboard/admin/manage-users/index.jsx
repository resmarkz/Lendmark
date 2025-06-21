import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link } from "@inertiajs/react";

function AdminManageUsersSubpage({ users }) {
    const usersData = [
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            role: "admin",
            profile: {
                position: "System Administrator",
                permissions: ["users:manage", "loans:approve"],
            },
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            role: "agent",
            profile: {
                department: "Collections",
                contact_number: "+1234567890",
            },
        },
        {
            id: 3,
            name: "Client User",
            email: "client@example.com",
            role: "client",
            profile: {
                address: "123 Main St",
                contact_number: "+0987654321",
                source_of_income: "Employment",
            },
        },
    ];

    const getRoleBadge = (role) => {
        const roleClasses = {
            admin: "bg-purple-100 text-purple-800",
            agent: "bg-blue-100 text-blue-800",
            client: "bg-green-100 text-green-800",
            default: "bg-gray-100 text-gray-800",
        };

        return roleClasses[role] || roleClasses.default;
    };

    const renderProfileInfo = (user) => {
        switch (user.role) {
            case "admin":
                return (
                    <div className="text-xs text-gray-500 mt-1">
                        {user.profile?.position || "No position specified"}
                    </div>
                );
            case "agent":
                return (
                    <div className="text-xs text-gray-500 mt-1">
                        {user.profile?.department || "No department"} •
                        {user.profile?.contact_number || "No contact"}
                    </div>
                );
            case "client":
                return (
                    <div className="text-xs text-gray-500 mt-1">
                        {user.profile?.source_of_income || "No income source"}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">
                    User Management
                </h2>
                <Link
                    href="/dashboard/admin/users/create"
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                    <i className="fas fa-plus mr-2"></i>
                    Add User
                </Link>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                User
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Role
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Profile Info
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Status
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
                        {usersData.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <span className="text-indigo-600 font-medium">
                                                {user.name.charAt(0)}
                                            </span>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {user.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadge(
                                            user.role
                                        )}`}
                                    >
                                        {user.role.charAt(0).toUpperCase() +
                                            user.role.slice(1)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {renderProfileInfo(user)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        Active
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end space-x-2">
                                        <Link
                                            href={`/dashboard/admin/users/${user.id}/edit`}
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

            {/* Mobile Cards View */}
            <div className="md:hidden p-4 space-y-4">
                {usersData.map((user) => (
                    <div
                        key={user.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                                        <span className="text-indigo-600 font-medium text-sm">
                                            {user.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">
                                            {user.name}
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <span
                                        className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadge(
                                            user.role
                                        )}`}
                                    >
                                        {user.role.charAt(0).toUpperCase() +
                                            user.role.slice(1)}
                                    </span>
                                    <span className="ml-2 px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        Active
                                    </span>
                                </div>
                                {renderProfileInfo(user)}
                            </div>
                            <div className="flex space-x-2">
                                <Link
                                    href={`/dashboard/admin/users/${user.id}/edit`}
                                    className="text-indigo-600 hover:text-indigo-900 p-1"
                                    title="Edit"
                                >
                                    <i className="fas fa-edit"></i>
                                </Link>
                                <button
                                    className="text-red-600 hover:text-red-900 p-1"
                                    title="Delete"
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to{" "}
                    <span className="font-medium">3</span> of{" "}
                    <span className="font-medium">3</span> users
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

AdminManageUsersSubpage.layout = (page) => (
    <DashboardLayout {...page.props}>{page}</DashboardLayout>
);

export default AdminManageUsersSubpage;
