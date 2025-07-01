import DeleteButton from "../DeleteButton";
import Table from "./Table";
import { Link } from "@inertiajs/react";

const AdminTable = ({ admins, currentAdminId }) => {
    const headers = [
        { label: "Name", className: "w-1/6" },
        { label: "Email", className: "w-1/6" },
        
        { label: "Status", className: "w-1/12" },
        { label: "Actions", className: "w-1/12 text-right" },
    ];

    const renderDesktopRow = (admin) => (
        <>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-medium">
                            {admin.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                        </span>
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                            {admin.name}
                        </div>
                        <div className="text-sm text-gray-500">
                            {admin.role}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{admin.email}</div>
            </td>
            
            <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center space-x-2 justify-end">
                    <Link
                        href={`/dashboard/admin/manage-users/admins/${admin.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900"
                    >
                        <i className="fas fa-edit"></i>
                    </Link>
                    {currentAdminId !== admin.id && (
                        <DeleteButton
                            routeName="admin.manage-users.admins.destroy"
                            itemId={admin.id}
                            confirmText="Are you sure you want to delete this admin???"
                        >
                            <i className="fas fa-trash"></i>
                        </DeleteButton>
                    )}
                </div>
            </td>
        </>
    );

    const renderMobileCard = (admin) => (
        <div>
            <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-600 font-medium">
                        {admin.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                    </span>
                </div>
                <div>
                    <h3 className="text-lg font-medium text-gray-900">
                        {admin.name}
                    </h3>
                    <p className="text-sm text-gray-500">{admin.email}</p>
                </div>
            </div>

            <div className="mt-3 space-y-2">
                

                <div className="flex items-center justify-between pt-2">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                    </span>
                    <div className="flex space-x-3">
                        <Link
                            href={`/dashboard/admin/manage-users/admins/${admin.id}/edit`}
                            className="text-indigo-600 hover:text-indigo-900"
                        >
                            <i className="fas fa-edit"></i> Edit
                        </Link>
                        {currentAdminId !== admin.id && (
                            <DeleteButton
                                routeName="admin.manage-users.admins.destroy"
                                itemId={admin.id}
                                confirmText="Are you sure you want to delete this admin???"
                            >
                                <i className="fas fa-trash"></i>
                            </DeleteButton>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Table
            headers={headers}
            data={admins.data}
            emptyMessage="No admins found"
            renderDesktopRow={renderDesktopRow}
            renderMobileCard={renderMobileCard}
            className="shadow overflow-hidden sm:rounded-lg"
        />
    );
};

export default AdminTable;
