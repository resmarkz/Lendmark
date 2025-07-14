import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";

function DashboardLayout({ children, auth }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openDropdowns, setOpenDropdowns] = useState({});
    const { url } = usePage();
    const user = auth.user;

    const sidebarLinks = [
        {
            group: "Dashboard",
            links: [
                {
                    name: "Overview",
                    icon: "fas fa-tachometer-alt",
                    href: "/dashboard/admin/overview",
                },
            ],
        },
        {
            group: "Management",
            links: [
                {
                    name: "Manage Users",
                    icon: "fas fa-users",
                    href: "/dashboard/admin/manage-users",
                    subLinks: [
                        {
                            name: "Admins",
                            icon: "fas fa-user-shield",
                            href: "/dashboard/admin/manage-users/admins",
                        },
                        {
                            name: "Collectors",
                            icon: "fas fa-user-tie",
                            href: "/dashboard/admin/manage-users/collectors",
                        },
                        {
                            name: "Clients",
                            icon: "fas fa-user-friends",
                            href: "/dashboard/admin/manage-users/clients",
                        },
                    ],
                },
                {
                    name: "Loans",
                    icon: "fas fa-hand-holding-usd",
                    href: "/dashboard/admin/loans",
                },
                {
                    name: "Payments",
                    icon: "fas fa-money-bill-wave",
                    href: "/dashboard/admin/transactions",
                },
            ],
        },
        {
            group: "Account",
            links: [
                { name: "Profile", icon: "fas fa-user", href: "/profile" },
                { name: "Settings", icon: "fas fa-cog", href: "/settings" },
                {
                    name: "Sign out",
                    icon: "fas fa-sign-out-alt",
                    href: "/logout",
                    method: "post",
                    as: "button",
                },
            ],
        },
    ];

    const toggleDropdown = (name) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));
    };

    const isActiveLink = (href) => {
        return url.startsWith(href);
    };

    return (
        <div className="h-screen min-h-screen bg-gray-50 grid grid-cols-1 lg:grid-cols-[auto_1fr] grid-rows-[auto_1fr] overflow-hidden">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar - positioned first in DOM for mobile, but appears first visually on desktop */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 lg:col-start-1 lg:row-span-2`}
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

                <div className="h-[calc(100%-4rem)] overflow-y-auto py-4">
                    <nav className="space-y-6">
                        {sidebarLinks.map((group) => (
                            <div key={group.group} className="space-y-1">
                                <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    {group.group}
                                </h3>
                                <div className="mt-2 space-y-1">
                                    {group.links.map((link) => (
                                        <div key={link.name}>
                                            {link.subLinks ? (
                                                <div>
                                                    <button
                                                        onClick={() =>
                                                            toggleDropdown(
                                                                link.name
                                                            )
                                                        }
                                                        className={`flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium rounded-md ${
                                                            isActiveLink(
                                                                link.href
                                                            )
                                                                ? "bg-indigo-50 text-indigo-700"
                                                                : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                                                        }`}
                                                    >
                                                        <div className="flex items-center">
                                                            <i
                                                                className={`${
                                                                    link.icon
                                                                } mr-3 ${
                                                                    isActiveLink(
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
                                                                openDropdowns[
                                                                    link.name
                                                                ]
                                                                    ? "up"
                                                                    : "down"
                                                            } text-xs`}
                                                        ></i>
                                                    </button>

                                                    {openDropdowns[
                                                        link.name
                                                    ] && (
                                                        <div className="ml-10 mt-1 space-y-1 pl-2 border-l-2 border-gray-100">
                                                            {link.subLinks.map(
                                                                (subLink) => (
                                                                    <Link
                                                                        key={
                                                                            subLink.name
                                                                        }
                                                                        href={
                                                                            subLink.href
                                                                        }
                                                                        className={`flex items-center px-4 py-2 text-sm rounded-md ${
                                                                            isActiveLink(
                                                                                subLink.href
                                                                            )
                                                                                ? "bg-indigo-100 text-indigo-700"
                                                                                : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                                                                        }`}
                                                                    >
                                                                        <i
                                                                            className={`${subLink.icon} mr-3 text-gray-400`}
                                                                        ></i>
                                                                        {
                                                                            subLink.name
                                                                        }
                                                                    </Link>
                                                                )
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <Link
                                                    href={link.href}
                                                    method={link.method}
                                                    as={link.as}
                                                    className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md ${
                                                        isActiveLink(link.href)
                                                            ? "bg-indigo-50 text-indigo-700"
                                                            : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                                                    }`}
                                                >
                                                    <i
                                                        className={`${
                                                            link.icon
                                                        } mr-3 ${
                                                            isActiveLink(
                                                                link.href
                                                            )
                                                                ? "text-indigo-500"
                                                                : "text-gray-400"
                                                        }`}
                                                    ></i>
                                                    {link.name}
                                                </Link>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Header */}
            <header className="sticky top-0 h-16 bg-white shadow-sm flex items-center justify-between px-4 sm:px-6 lg:px-8 z-20 col-start-1 lg:col-start-2 col-span-1">
                <button
                    type="button"
                    className="text-gray-400 lg:hidden"
                    onClick={() => setSidebarOpen(true)}
                >
                    <i className="fas fa-bars"></i>
                </button>

                <div className="flex-1"></div>

                <div className="flex items-center space-x-4">
                    <button className="text-gray-500 hover:text-gray-700">
                        <i className="fas fa-bell"></i>
                    </button>
                    <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-indigo-600 font-medium">
                                {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()}
                            </span>
                        </div>
                        <span className="ml-2 text-gray-700">{user.name}</span>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="overflow-auto bg-white col-start-1 lg:col-start-2">
                <div className="py-6 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)]">
                    {children}
                </div>
            </main>
        </div>
    );
}

DashboardLayout.layout = (page) => page;
export default DashboardLayout;
