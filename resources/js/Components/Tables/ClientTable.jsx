import DeleteButton from "../DeleteButton";
import Table from "./Table";
import { Link } from "@inertiajs/react";

const ClientTable = ({ clients }) => {
    const headers = [
        { label: "Name", className: "w-1/4" },
        { label: "Email", className: "w-1/4" },
        { label: "Contact Info", className: "w-1/4" },
        { label: "Details", className: "w-1/4" },
        { label: "Actions", className: "w-1/8 text-right" },
    ];

    const renderDesktopRow = (client) => (
        <>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-medium">
                            {client.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                        </span>
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                            {client.name}
                        </div>
                        <div className="text-sm text-gray-500">
                            {client.role}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{client.email}</div>
                <div className="text-sm text-gray-500">
                    {client.email_verified_at ? "Verified" : "Unverified"}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                    {client.client_profile?.contact_number || "N/A"}
                </div>
                <div className="text-sm text-gray-500">
                    {client.client_profile?.address || "No address"}
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                    <span className="font-medium">DOB:</span>{" "}
                    {client.client_profile?.date_of_birth || "N/A"}
                </div>
                <div className="text-sm text-gray-500">
                    <span className="font-medium">Income:</span>{" "}
                    {client.client_profile?.source_of_income || "N/A"}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center space-x-2 justify-end">
                    <Link
                        href={`/dashboard/admin/manage-users/clients/${client.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="View Details"
                    >
                        <i className="fas fa-eye"></i>
                    </Link>
                    <Link
                        href={`/dashboard/admin/manage-users/clients/${client.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Edit"
                    >
                        <i className="fas fa-edit"></i>
                    </Link>
                    <DeleteButton
                        routeName="admin.manage-users.clients.destroy"
                        itemId={client.id}
                        confirmText="Are you sure you want to delete this client?"
                        title="Delete"
                    >
                        <i className="fas fa-trash"></i>
                    </DeleteButton>
                </div>
            </td>
        </>
    );

    const renderMobileCard = (client) => (
        <div>
            <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-600 font-medium">
                        {client.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                    </span>
                </div>
                <div>
                    <h3 className="text-lg font-medium text-gray-900">
                        {client.name}
                    </h3>
                    <p className="text-sm text-gray-500">{client.email}</p>
                    <p className="text-sm text-gray-500">
                        {client.email_verified_at ? "Verified" : "Unverified"}
                    </p>
                </div>
            </div>

            <div className="mt-3 space-y-2">
                <div>
                    <span className="text-sm font-medium text-gray-500">
                        Contact:
                    </span>
                    <p className="text-sm">
                        {client.client_profile?.contact_number || "N/A"}
                    </p>
                </div>

                <div>
                    <span className="text-sm font-medium text-gray-500">
                        Address:
                    </span>
                    <p className="text-sm">
                        {client.client_profile?.address || "No address"}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <span className="text-sm font-medium text-gray-500">
                            DOB:
                        </span>
                        <p className="text-sm">
                            {client.client_profile?.date_of_birth || "N/A"}
                        </p>
                    </div>
                    <div>
                        <span className="text-sm font-medium text-gray-500">
                            Income:
                        </span>
                        <p className="text-sm">
                            {client.client_profile?.source_of_income || "N/A"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex space-x-3">
                        <Link
                            href={`/dashboard/admin/manage-users/clients/${client.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                        >
                            <i className="fas fa-eye mr-1"></i> View
                        </Link>
                        <Link
                            href={`/dashboard/admin/manage-users/clients/${client.id}/edit`}
                            className="text-indigo-600 hover:text-indigo-900"
                        >
                            <i className="fas fa-edit mr-1"></i> Edit
                        </Link>
                        <DeleteButton
                            routeName="admin.manage-users.clients.destroy"
                            itemId={client.id}
                            confirmText="Are you sure you want to delete this client?"
                        >
                            <i className="fas fa-trash mr-1"></i> Delete
                        </DeleteButton>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Table
            headers={headers}
            data={clients.data}
            emptyMessage="No clients found"
            renderDesktopRow={renderDesktopRow}
            renderMobileCard={renderMobileCard}
            className="shadow overflow-hidden sm:rounded-lg"
        />
    );
};

export default ClientTable;
