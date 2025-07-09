// components/DashboardCard.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardCard = ({
    icon,
    title,
    value,
    trend,
    bgColor = "bg-white",
    iconBgColor = "bg-gray-100",
    iconColor = "text-gray-600",
    className = "",
}) => {
    return (
        <div
            className={`${bgColor} p-4 rounded-xl shadow-sm flex flex-col h-full ${className}`}
        >
            <div className="flex items-center">
                <div
                    className={`p-3 rounded-lg ${iconBgColor} ${iconColor} flex-shrink-0`}
                >
                    <FontAwesomeIcon icon={icon} className="text-lg" />
                </div>
                <div className="ml-4 flex-grow min-w-0">
                    <p className="text-sm font-medium text-gray-500 truncate">
                        {title}
                    </p>
                    <p className="text-xl sm:text-2xl font-semibold text-gray-800 truncate">
                        {value}
                    </p>
                </div>
                {trend && (
                    <span
                        className={`ml-2 flex-shrink-0 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            trend === "up"
                                ? "bg-green-100 text-green-800"
                                : trend === "down"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                        }`}
                    >
                        {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}
                    </span>
                )}
            </div>
        </div>
    );
};

export default DashboardCard;
