import PropTypes from "prop-types";
import { Link } from "@inertiajs/react";

const Table = ({
    headers,
    data,
    emptyMessage,
    renderDesktopRow,
    renderMobileCard,
    className = "",
    headerClassName = "",
    rowClassName = "",
}) => {
    return (
        <div className={className}>
            {/* Desktop Table (hidden on mobile) */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className={`bg-gray-50 ${headerClassName}`}>
                        <tr>
                            {headers.map((header, index) => (
                                <th
                                    key={index}
                                    scope="col"
                                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                                        header.className || ""
                                    }`}
                                >
                                    {header.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.length > 0 ? (
                            data.map((item, index) => (
                                <tr
                                    key={`desktop-${index}`}
                                    className={`hover:bg-gray-50 ${rowClassName}`}
                                >
                                    {renderDesktopRow(item)}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={headers.length}
                                    className="px-6 py-4 text-center text-sm text-gray-500"
                                >
                                    {emptyMessage || "No data found"}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards (hidden on desktop) */}
            <div className="md:hidden space-y-3">
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <div
                            key={`mobile-${index}`}
                            className="bg-white p-4 rounded-lg shadow border border-gray-200"
                        >
                            {renderMobileCard(item)}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        {emptyMessage || "No data found"}
                    </div>
                )}
            </div>
        </div>
    );
};

Table.propTypes = {
    headers: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            className: PropTypes.string,
        })
    ).isRequired,
    data: PropTypes.array.isRequired,
    emptyMessage: PropTypes.string,
    renderDesktopRow: PropTypes.func.isRequired,
    renderMobileCard: PropTypes.func.isRequired,
    className: PropTypes.string,
    headerClassName: PropTypes.string,
    rowClassName: PropTypes.string,
};

export default Table;
