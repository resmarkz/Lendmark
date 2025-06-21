import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";

function DashboardLayout({ children, auth }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [showUserTypes, setShowUserTypes] = useState(false);
    const { url } = usePage();
    const user = auth.user;

    const sidebarLinks = [
        {
            name: "Overview",
            icon: "fas fa-tachometer-alt",
            href: "/dashboard/admin/overview",
        },
        {
            name: "Manage Users",
            icon: "fas fa-users",
            href: "/dashboard/admin/manage-users",
        },
        {
            name: "Loans",
            icon: "fas fa-hand-holding-usd",
            href: "/dashboard/admin/loans",
        },
        {
            name: "Transactions",
            icon: "fas fa-exchange-alt",
            href: "/dashboard/admin/transactions",
        },
    ];

    const accountLinks = [
        { name: "Profile", icon: "fas fa-user", href: "/profile" },
        { name: "Settings", icon: "fas fa-cog", href: "/settings" },
        { name: "Sign out", icon: "fas fa-sign-out-alt", href: "/logout" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 lg:static lg:inset-0`}
            >
                <div className="h-16 px-4 flex items-center justify-between border-b border-gray-200">
                    <span className="text-indigo-600 font-bold text-xl">
                        LENDMARK
                    </span>
                    <button
                        className="text-gray-400 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className="h-full overflow-y-auto py-4 space-y-6">
                    <nav className="px-4 space-y-1">
                        {sidebarLinks.map((link) => (
                            <div key={link.name}>
                                {link.name === "Manage Users" ? (
                                    <div>
                                        <button
                                            onClick={() =>
                                                setShowUserTypes(!showUserTypes)
                                            }
                                            className={`flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md ${
                                                url.startsWith(link.href)
                                                    ? "bg-indigo-50 text-indigo-700"
                                                    : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                                            }`}
                                        >
                                            <div className="flex items-center">
                                                <i
                                                    className={`${
                                                        link.icon
                                                    } mr-3 ${
                                                        url.startsWith(
                                                            link.href
                                                        )
                                                            ? "text-indigo-500"
                                                            : "text-gray-400"
                                                    }`}
                                                ></i>
                                                {link.name}
                                            </div>
                                            <i
                                                className={`fas fa-chevron-${
                                                    showUserTypes
                                                        ? "up"
                                                        : "down"
                                                } text-xs`}
                                            ></i>
                                        </button>

                                        {showUserTypes && (
                                            <div className="ml-8 mt-1 space-y-1">
                                                <Link
                                                    href="/dashboard/admin/manage-users/admins"
                                                    className={`flex items-center px-3 py-2 text-sm rounded-md ${
                                                        url.includes("/admins")
                                                            ? "bg-indigo-100 text-indigo-700"
                                                            : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                                                    }`}
                                                >
                                                    <i className="fas fa-user-shield mr-3"></i>
                                                    Admins
                                                </Link>
                                                <Link
                                                    href="/dashboard/admin/manage-users/clients"
                                                    className={`flex items-center px-3 py-2 text-sm rounded-md ${
                                                        url.includes("/clients")
                                                            ? "bg-indigo-100 text-indigo-700"
                                                            : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                                                    }`}
                                                >
                                                    <i className="fas fa-user-tie mr-3"></i>
                                                    Clients
                                                </Link>
                                                <Link
                                                    href="/dashboard/admin/manage-users/agents"
                                                    className={`flex items-center px-3 py-2 text-sm rounded-md ${
                                                        url.includes("/agents")
                                                            ? "bg-indigo-100 text-indigo-700"
                                                            : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                                                    }`}
                                                >
                                                    <i className="fas fa-user-cog mr-3"></i>
                                                    Agents
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                                            url.startsWith(link.href)
                                                ? "bg-indigo-50 text-indigo-700"
                                                : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                                        }`}
                                    >
                                        <i
                                            className={`${link.icon} mr-3 ${
                                                url.startsWith(link.href)
                                                    ? "text-indigo-500"
                                                    : "text-gray-400"
                                            }`}
                                        ></i>
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>

                    <div className="px-4">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Account
                        </h3>
                        <div className="mt-1 space-y-1">
                            {accountLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                                        url.startsWith(link.href)
                                            ? "bg-indigo-50 text-indigo-700"
                                            : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                                    }`}
                                >
                                    <i
                                        className={`${link.icon} mr-3 ${
                                            url.startsWith(link.href)
                                                ? "text-indigo-500"
                                                : "text-gray-400"
                                        }`}
                                    ></i>
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Top Navbar */}
                <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Sidebar Toggle Button */}
                    <button
                        type="button"
                        className="text-gray-400 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <i className="fas fa-bars"></i>
                    </button>

                    {/* App Name (Center) */}
                    <div className="text-indigo-600 font-bold text-xl lg:hidden">
                        LENDMARK
                    </div>

                    {/* User Info */}
                    <div className="relative">
                        <button
                            onClick={() =>
                                setUserDropdownOpen(!userDropdownOpen)
                            }
                            className="flex items-center text-sm rounded-full focus:outline-none"
                        >
                            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                <span className="text-indigo-600 font-medium">
                                    {user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .toUpperCase()}
                                </span>
                            </div>
                            <span className="ml-2 text-gray-700 hidden sm:inline">
                                {user.name}
                            </span>
                            <i
                                className={`fas fa-chevron-${
                                    userDropdownOpen ? "up" : "down"
                                } ml-1 text-gray-400`}
                            ></i>
                        </button>

                        {userDropdownOpen && (
                            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white z-50">
                                {accountLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        method={
                                            link.name === "Sign out"
                                                ? "post"
                                                : undefined
                                        }
                                        as={
                                            link.name === "Sign out"
                                                ? "button"
                                                : undefined
                                        }
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <i className={`${link.icon} mr-3`}></i>
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
                    <div className="container max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <div className="bg-white p-6 rounded-lg shadow">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

DashboardLayout.layout = (page) => page;
export default DashboardLayout;
