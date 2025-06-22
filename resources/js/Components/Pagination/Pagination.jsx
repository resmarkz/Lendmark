import { Link } from "@inertiajs/react";
import PaginationLink from "./PaginationLink";
import PreviousButton from "./PreviousButton";
import NextButton from "./NextButton";

export default function Pagination({ links, meta, only = [] }) {
    if (links.length <= 3) return null;

    return (
        <div className="flex items-center justify-between mt-6">
            {/* Mobile pagination */}
            <div className="flex-1 flex justify-between sm:hidden">
                <PreviousButton links={links} />
                <NextButton links={links} />
            </div>

            {/* Desktop pagination */}
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{meta.from}</span>{" "}
                        to <span className="font-medium">{meta.to}</span> of{" "}
                        <span className="font-medium">{meta.total}</span>{" "}
                        results
                    </p>
                </div>
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        <PreviousButton links={links} />
                        {links.map((link, index) => {
                            if (index === 0 || index === links.length - 1)
                                return null;
                            return (
                                <PaginationLink
                                    key={index}
                                    link={link}
                                    only={only}
                                />
                            );
                        })}
                        <NextButton links={links} />
                    </nav>
                </div>
            </div>
        </div>
    );
}
