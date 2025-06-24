import DashboardLayout from "@/Layouts/DashboardLayout";
import { useForm, Link, Head } from "@inertiajs/react";
import { useState, useEffect } from "react";

const AdminManageAdminEdit = ({ admin, availablePermissions, auth }) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: admin.name || "",
        email: admin.email || "",
        position: admin.position || "",
        permissions: (admin.permissions || []).filter((p) => p),
    });

    const [selectedPermissions, setSelectedPermissions] = useState(
        (admin.permissions || []).filter((p) => p)
    );

    useEffect(() => {
        setData("permissions", selectedPermissions);
    }, [selectedPermissions]);

    const handlePermissionToggle = (permission) => {
        if (!permission) return;

        setSelectedPermissions((prev) =>
            prev.includes(permission)
                ? prev.filter((p) => p !== permission)
                : [...prev, permission]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const cleanData = {
            ...data,
            permissions: data.permissions.filter((p) => p),
        };

        put(route("admin.manage-users.admins.update", admin.id), {
            data: cleanData,
            preserveScroll: true,
        });
    };

    return (
        <div className="space-y-6">
            <Head title={`Edit Admin - ${admin.name}`} />

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    Edit Admin: {admin.name}
                </h2>
                <div className="flex gap-3">
                    <Link
                        href={route("admin.manage-users.admins.index")}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <i className="fas fa-arrow-left mr-2"></i> Back to
                        Admins
                    </Link>
                </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* Name Field */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Full Name{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                    errors.name
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                required
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email Address{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                    errors.email
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                required
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Position Field */}
                        <div>
                            <label
                                htmlFor="position"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Position
                            </label>
                            <input
                                type="text"
                                id="position"
                                value={data.position}
                                onChange={(e) =>
                                    setData("position", e.target.value)
                                }
                                className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                    errors.position
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            {errors.position && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.position}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Permissions Section */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">
                            Permissions
                        </h3>
                        {availablePermissions?.filter((p) => p)?.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                {availablePermissions
                                    .filter((p) => p)
                                    .map((permission) => (
                                        <div
                                            key={permission}
                                            className="flex items-center"
                                        >
                                            <input
                                                type="checkbox"
                                                id={`permission-${permission}`}
                                                checked={selectedPermissions.includes(
                                                    permission
                                                )}
                                                onChange={() =>
                                                    handlePermissionToggle(
                                                        permission
                                                    )
                                                }
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <label
                                                htmlFor={`permission-${permission}`}
                                                className="ml-2 block text-sm text-gray-700"
                                            >
                                                {permission
                                                    .split("_")
                                                    .map(
                                                        (word) =>
                                                            word
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                            word.slice(1)
                                                    )
                                                    .join(" ")}
                                            </label>
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">
                                No permissions available
                            </p>
                        )}
                        {errors.permissions && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.permissions}
                            </p>
                        )}
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end pt-4 border-t border-gray-200">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? (
                                <>
                                    <i className="fas fa-spinner fa-spin mr-2"></i>
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-save mr-2"></i>
                                    Update Admin
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

AdminManageAdminEdit.layout = (page) => (
    <DashboardLayout children={page} auth={page.props.auth} />
);

export default AdminManageAdminEdit;
