import DashboardLayout from "@/Layouts/DashboardLayout";

function AdminManageUsersSubpage() {
    return (
        <div className="p-6 bg-white rounded shadow">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Manage Users
                </h1>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Add User
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b text-left text-gray-600">
                                Name
                            </th>
                            <th className="px-4 py-2 border-b text-left text-gray-600">
                                Email
                            </th>
                            <th className="px-4 py-2 border-b text-left text-gray-600">
                                Role
                            </th>
                            <th className="px-4 py-2 border-b text-left text-gray-600">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Example row */}
                        <tr>
                            <td className="px-4 py-2 border-b">John Doe</td>
                            <td className="px-4 py-2 border-b">
                                john@example.com
                            </td>
                            <td className="px-4 py-2 border-b">Admin</td>
                            <td className="px-4 py-2 border-b">
                                <button className="text-blue-600 hover:underline mr-2">
                                    Edit
                                </button>
                                <button className="text-red-600 hover:underline">
                                    Delete
                                </button>
                            </td>
                        </tr>
                        {/* Add more rows as needed */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

AdminManageUsersSubpage.layout = (page) => (
    <DashboardLayout {...page.props}>{page}</DashboardLayout>
);

export default AdminManageUsersSubpage;
