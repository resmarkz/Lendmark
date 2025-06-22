import { Link } from "@inertiajs/react";

export default function NextButton({ links }) {
    return (
        <Link
            href={links[links.length - 1].url || "#"}
            preserveScroll
            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                !links[links.length - 1].url
                    ? "opacity-50 cursor-not-allowed"
                    : ""
            }`}
        >
            <span className="sr-only">Next</span>
            <i className="fas fa-chevron-right"></i>
        </Link>
    );
}
