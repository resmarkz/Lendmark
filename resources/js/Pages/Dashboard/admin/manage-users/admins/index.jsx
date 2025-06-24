import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination/Pagination";
import AdminTable from "@/Components/Tables/AdminTable";
import { usePage } from "@inertiajs/react";

const AdminManageAdminsSubpage = ({ admins }) => {
    const { props } = usePage();
    const currentAdminId = props.auth.user.id;
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    Manage Admins
                </h2>
                <div className="flex gap-3">
                    <Link
                        href="/dashboard/admin/manage-users/admins/create"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <i className="fas fa-plus mr-2"></i> Add Admin
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-lg">
                <AdminTable admins={admins} currentAdminId={currentAdminId} />
                <Pagination links={admins.links} meta={admins.meta} />
            </div>
        </div>
    );
};

AdminManageAdminsSubpage.layout = (page) => (
    <DashboardLayout children={page} auth={page.props.auth} />
);

export default AdminManageAdminsSubpage;
