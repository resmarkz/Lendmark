import DashboardLayout from "@/Layouts/DashboardLayout";
import { useForm, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";

const AdminManageAgentsEdit = ({ agent, departments, auth }) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: agent.name || "",
        email: agent.email || "",
        password: "",
        password_confirmation: "",
        department_id: agent.department_id || "",
        contact_number: agent.contact_number || "",
        date_of_birth: agent.date_of_birth || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("admin.manage-users.agents.update", agent.id), {
            preserveScroll: true,
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Edit Agent</h2>
                <div className="flex gap-3">
                    <Link
                        href={route("admin.manage-users.agents.index")}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <i className="fas fa-arrow-left mr-2"></i> Back to
                        Agents
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

                        {/* Password Field */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password{" "}
                                <span className="text-gray-400">
                                    (leave blank to keep current)
                                </span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                    errors.password
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                minLength="8"
                                autoComplete="new-password"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Password Confirmation */}
                        <div>
                            <label
                                htmlFor="password_confirmation"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border"
                                minLength="8"
                                autoComplete="new-password"
                            />
                        </div>

                        {/* Department Field */}
                        <div>
                            <label
                                htmlFor="department_id"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Department{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="department_id"
                                value={data.department_id}
                                onChange={(e) =>
                                    setData("department_id", e.target.value)
                                }
                                className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                    errors.department_id
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                required
                            >
                                <option value="">Select Department</option>
                                {departments?.map((dept) => (
                                    <option key={dept.id} value={dept.id}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                            {errors.department_id && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.department_id}
                                </p>
                            )}
                        </div>

                        {/* Contact Number */}
                        <div>
                            <label
                                htmlFor="contact_number"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Contact Number{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="contact_number"
                                value={data.contact_number}
                                onChange={(e) =>
                                    setData("contact_number", e.target.value)
                                }
                                className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                    errors.contact_number
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                required
                            />
                            {errors.contact_number && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.contact_number}
                                </p>
                            )}
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label
                                htmlFor="date_of_birth"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Date of Birth{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                id="date_of_birth"
                                value={data.date_of_birth}
                                onChange={(e) =>
                                    setData("date_of_birth", e.target.value)
                                }
                                className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                    errors.date_of_birth
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                required
                            />
                            {errors.date_of_birth && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.date_of_birth}
                                </p>
                            )}
                        </div>
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
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-save mr-2"></i>
                                    Update Agent
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

AdminManageAgentsEdit.layout = (page) => (
    <DashboardLayout children={page} auth={page.props.auth} />
);

export default AdminManageAgentsEdit;
