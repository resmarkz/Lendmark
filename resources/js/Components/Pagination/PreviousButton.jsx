import { Link } from "@inertiajs/react";

export default function PreviousButton({ links }) {
    return (
        <Link
            href={links[0].url || "#"}
            preserveScroll
            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                !links[0].url ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
            <span className="sr-only">Previous</span>
            <i className="fas fa-chevron-left"></i>
        </Link>
    );
}
