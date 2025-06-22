import { Link } from "@inertiajs/react";

export default function PaginationLink({ link, only }) {
    return (
        <Link
            href={link.url || "#"}
            preserveScroll
            only={only}
            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                link.active
                    ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
            } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
            dangerouslySetInnerHTML={{ __html: link.label }}
        />
    );
}
