import { useState } from "react";

function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Mock user data
    const user = {
        name: "John Doe",
        email: "john@lendmark.com",
        avatar: "JD",
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Left side - Logo and mobile menu button */}
                        <div className="flex items-center">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 lg:hidden"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <span className="sr-only">Open sidebar</span>
                                <i className="fas fa-bars"></i>
                            </button>
                            <div className="flex items-center text-indigo-600 font-bold text-xl">
                                <span className="mr-2">LENDMARK</span>
                                <i className="fas fa-hand-holding-usd"></i>
                            </div>
                        </div>

                        {/* Right side - Navigation */}
                        <div className="flex items-center">
                            <div className="hidden lg:flex lg:items-center lg:space-x-4">
                                <button className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600">
                                    Dashboard
                                </button>
                                <button className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600">
                                    Loans
                                </button>

                                {/* User dropdown */}
                                <div className="relative ml-4">
                                    <button
                                        onClick={() =>
                                            setUserDropdownOpen(
                                                !userDropdownOpen
                                            )
                                        }
                                        className="flex items-center text-sm rounded-full focus:outline-none"
                                    >
                                        <span className="sr-only">
                                            Open user menu
                                        </span>
                                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <span className="text-indigo-600 font-medium">
                                                {user.avatar}
                                            </span>
                                        </div>
                                        <span className="ml-2 text-gray-700">
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
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Your Profile
                                            </a>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Settings
                                            </a>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Sign out
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Mobile menu button */}
                            <button
                                type="button"
                                className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                            >
                                <span className="sr-only">Open main menu</span>
                                <i
                                    className={`fas ${
                                        mobileMenuOpen ? "fa-times" : "fa-bars"
                                    }`}
                                ></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden">
                        <div className="pt-2 pb-3 space-y-1">
                            <a
                                href="#"
                                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                            >
                                Dashboard
                            </a>
                            <a
                                href="#"
                                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                            >
                                Loans
                            </a>
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-200">
                            <div className="flex items-center px-4">
                                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                    <span className="text-indigo-600 font-medium">
                                        {user.avatar}
                                    </span>
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-gray-800">
                                        {user.name}
                                    </div>
                                    <div className="text-sm font-medium text-gray-500">
                                        {user.email}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 space-y-1">
                                <a
                                    href="#"
                                    className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                                >
                                    Your Profile
                                </a>
                                <a
                                    href="#"
                                    className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                                >
                                    Sign out
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Sidebar + Main Content */}
            <div className="flex">
                {/* Sidebar */}
                <div
                    className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-md transform ${
                        sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0 transition-transform duration-200 ease-in-out`}
                >
                    <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
                        <span className="text-indigo-600 font-bold text-xl">
                            LENDMARK
                        </span>
                    </div>
                    <div className="h-full overflow-y-auto py-4">
                        <nav>
                            <div className="px-4 space-y-1">
                                <a
                                    href="#"
                                    className="group flex items-center px-3 py-2 text-sm font-medium rounded-md bg-indigo-50 text-indigo-700"
                                >
                                    <i className="fas fa-tachometer-alt mr-3 text-indigo-500"></i>
                                    Dashboard
                                </a>
                                <a
                                    href="#"
                                    className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                                >
                                    <i className="fas fa-hand-holding-usd mr-3 text-gray-400 group-hover:text-indigo-500"></i>
                                    Loans
                                </a>
                                <a
                                    href="#"
                                    className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                                >
                                    <i className="fas fa-exchange-alt mr-3 text-gray-400 group-hover:text-indigo-500"></i>
                                    Transactions
                                </a>
                            </div>

                            <div className="mt-8 px-4">
                                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Account
                                </h3>
                                <div className="mt-1 space-y-1">
                                    <a
                                        href="#"
                                        className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                                    >
                                        <i className="fas fa-user mr-3 text-gray-400 group-hover:text-indigo-500"></i>
                                        Profile
                                    </a>
                                    <a
                                        href="#"
                                        className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                                    >
                                        <i className="fas fa-cog mr-3 text-gray-400 group-hover:text-indigo-500"></i>
                                        Settings
                                    </a>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>

                {/* Overlay for mobile sidebar */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                )}

                {/* Main content */}
                <main className="flex-1 lg:ml-64">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                                Dashboard Overview
                            </h1>

                            {/* Sample Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <div className="bg-indigo-50 p-4 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                                            <i className="fas fa-wallet"></i>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-500">
                                                Total Balance
                                            </p>
                                            <p className="text-2xl font-semibold text-gray-800">
                                                $12,345
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="p-3 rounded-full bg-green-100 text-green-600">
                                            <i className="fas fa-arrow-up"></i>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-500">
                                                Active Loans
                                            </p>
                                            <p className="text-2xl font-semibold text-gray-800">
                                                8
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                            <i className="fas fa-exchange-alt"></i>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-500">
                                                Transactions
                                            </p>
                                            <p className="text-2xl font-semibold text-gray-800">
                                                24
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sample Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Loan ID
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Amount
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Due Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                LN-2023-001
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                $1,500
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    Active
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                Jun 15, 2023
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                LN-2023-002
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                $2,300
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                    Pending
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                Jun 20, 2023
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

Dashboard.layout = (page) => page;

export default Dashboard;
