import { Link } from "@inertiajs/react";
import { useState } from "react";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="flex items-center text-indigo-600 font-bold text-xl"
                        >
                            <span className="mr-2">LENDMARK</span>
                            <i className="fas fa-hand-holding-usd"></i>
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                        <Link
                            href={route("login")}
                            className="text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                        >
                            Sign In
                        </Link>
                        <Link
                            href={route("register")}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 shadow-sm"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile menu button (hidden by default) */}
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <i className="fas fa-bars"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu (hidden by default) */}
            <div
                className={`sm:hidden ${mobileMenuOpen ? "block" : "hidden"}`}
                id="mobile-menu"
            >
                <div className="pt-2 pb-3 space-y-1">
                    <Link
                        href={route("login")}
                        className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                    >
                        Sign In
                    </Link>
                    <Link
                        href={route("register")}
                        className="block px-3 py-2 text-base font-medium text-indigo-600 hover:bg-indigo-50"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
}
