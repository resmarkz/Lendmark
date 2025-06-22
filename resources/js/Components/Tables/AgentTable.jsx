import Table from "./Table";
import { Link } from "@inertiajs/react";

const AgentTable = ({ agents }) => {
    const headers = [
        { label: "Name", className: "w-1/4" },
        { label: "Email", className: "w-1/4" },
        { label: "Contact Info", className: "w-1/4" },
        { label: "Details", className: "w-1/4" },
        { label: "Actions", className: "w-1/8 text-right" },
    ];

    const renderDesktopRow = (agent) => (
        <>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-medium">
                            {agent.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                        </span>
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                            {agent.name}
                        </div>
                        <div className="text-sm text-gray-500">
                            {agent.role}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{agent.email}</div>
                <div className="text-sm text-gray-500">
                    {agent.email_verified_at ? "Verified" : "Unverified"}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                    {agent.agent_profile?.contact_number || "N/A"}
                </div>
                <div className="text-sm text-gray-500">
                    Department: {agent.agent_profile?.department?.name || "N/A"}
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                    <span className="font-medium">DOB:</span>{" "}
                    {agent.agent_profile?.date_of_birth || "N/A"}
                </div>
                <div className="text-sm text-gray-500">
                    <span className="font-medium">Member Since:</span>{" "}
                    {new Date(agent.created_at).toLocaleDateString()}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center space-x-2 justify-end">
                    <Link
                        href={`/dashboard/admin/manage-users/agents/${agent.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900"
                    >
                        <i className="fas fa-edit"></i>
                    </Link>
                    <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() =>
                            confirm(
                                "Are you sure you want to delete this agent?"
                            )
                        }
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </>
    );

    const renderMobileCard = (agent) => (
        <div>
            <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-600 font-medium">
                        {agent.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                    </span>
                </div>
                <div>
                    <h3 className="text-lg font-medium text-gray-900">
                        {agent.name}
                    </h3>
                    <p className="text-sm text-gray-500">{agent.email}</p>
                    <p className="text-sm text-gray-500">
                        {agent.email_verified_at ? "Verified" : "Unverified"}
                    </p>
                </div>
            </div>

            <div className="mt-3 space-y-2">
                <div>
                    <span className="text-sm font-medium text-gray-500">
                        Contact:
                    </span>
                    <p className="text-sm">
                        {agent.agent_profile?.contact_number || "N/A"}
                    </p>
                </div>

                <div>
                    <span className="text-sm font-medium text-gray-500">
                        Department:
                    </span>
                    <p className="text-sm">
                        {agent.agent_profile?.department?.name || "N/A"}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <span className="text-sm font-medium text-gray-500">
                            DOB:
                        </span>
                        <p className="text-sm">
                            {agent.agent_profile?.date_of_birth || "N/A"}
                        </p>
                    </div>
                    <div>
                        <span className="text-sm font-medium text-gray-500">
                            Member Since:
                        </span>
                        <p className="text-sm">
                            {new Date(agent.created_at).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex space-x-3">
                        <Link
                            href={`/dashboard/admin/manage-users/agents/${agent.id}/edit`}
                            className="text-indigo-600 hover:text-indigo-900"
                        >
                            <i className="fas fa-edit"></i> Edit
                        </Link>
                        <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() =>
                                confirm(
                                    "Are you sure you want to delete this agent?"
                                )
                            }
                        >
                            <i className="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Table
            headers={headers}
            data={agents.data}
            emptyMessage="No agents found"
            renderDesktopRow={renderDesktopRow}
            renderMobileCard={renderMobileCard}
            className="shadow overflow-hidden sm:rounded-lg"
        />
    );
};

export default AgentTable;
