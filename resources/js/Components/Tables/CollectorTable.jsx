import DeleteButton from "../DeleteButton";
import Table from "./Table";
import { Link } from "@inertiajs/react";

const CollectorTable = ({ collectors }) => {
    const headers = [
        { label: "Name", className: "w-1/4" },
        { label: "Email", className: "w-1/4" },
        { label: "Contact Info", className: "w-1/4" },
        { label: "Details", className: "w-1/4" },
        { label: "Actions", className: "w-1/8 text-right" },
    ];

    const renderDesktopRow = (collector) => (
        <>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-medium">
                            {collector.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                        </span>
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                            {collector.name}
                        </div>
                        <div className="text-sm text-gray-500">
                            {collector.role}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{collector.email}</div>
                <div className="text-sm text-gray-500">
                    {collector.email_verified_at ? "Verified" : "Unverified"}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                    {collector.collector_profile?.contact_number || "N/A"}
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                    <span className="font-medium">DOB:</span>{" "}
                    {collector.collector_profile?.date_of_birth || "N/A"}
                </div>
                <div className="text-sm text-gray-500">
                    <span className="font-medium">Member Since:</span>{" "}
                    {new Date(collector.created_at).toLocaleDateString()}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center space-x-2 justify-end">
                    <Link
                        href={`/dashboard/admin/manage-users/collectors/${collector.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900"
                    >
                        <i className="fas fa-edit"></i>
                    </Link>
                    <DeleteButton
                        routeName="admin.manage-users.collectors.destroy"
                        itemId={collector.id}
                        confirmText="Are you sure you want to delete this collector?"
                    >
                        <i className="fas fa-trash"></i>
                    </DeleteButton>
                </div>
            </td>
        </>
    );

    const renderMobileCard = (collector) => (
        <div>
            <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-600 font-medium">
                        {collector.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                    </span>
                </div>
                <div>
                    <h3 className="text-lg font-medium text-gray-900">
                        {collector.name}
                    </h3>
                    <p className="text-sm text-gray-500">{collector.email}</p>
                    <p className="text-sm text-gray-500">
                        {collector.email_verified_at ? "Verified" : "Unverified"}
                    </p>
                </div>
            </div>

            <div className="mt-3 space-y-2">
                <div>
                    <span className="text-sm font-medium text-gray-500">
                        Contact:
                    </span>
                    <p className="text-sm">
                        {collector.collector_profile?.contact_number || "N/A"}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <span className="text-sm font-medium text-gray-500">
                            DOB:
                        </span>
                        <p className="text-sm">
                            {collector.collector_profile?.date_of_birth || "N/A"}
                        </p>
                    </div>
                    <div>
                        <span className="text-sm font-medium text-gray-500">
                            Member Since:
                        </span>
                        <p className="text-sm">
                            {new Date(collector.created_at).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex space-x-3">
                        <Link
                            href={`/dashboard/admin/manage-users/collectors/${collector.id}/edit`}
                            className="text-indigo-600 hover:text-indigo-900"
                        >
                            <i className="fas fa-edit"></i> Edit
                        </Link>
                        <DeleteButton
                            routeName="admin.manage-users.collectors.destroy"
                            itemId={collector.id}
                            confirmText="Are you sure you want to delete this collector?"
                        >
                            <i className="fas fa-trash"></i>
                        </DeleteButton>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Table
            headers={headers}
            data={collectors.data}
            emptyMessage="No collectors found"
            renderDesktopRow={renderDesktopRow}
            renderMobileCard={renderMobileCard}
            className="shadow overflow-hidden sm:rounded-lg"
        />
    );
};

export default CollectorTable;