import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardCard = ({
    icon,
    title,
    value,
    trend,
    children,
    bgColor = "bg-white",
    iconBgColor = "bg-gray-100",
    iconColor = "text-gray-600",
    className = "",
}) => {
    return (
        <div
            className={`${bgColor} rounded-xl shadow-lg overflow-hidden ${className}`}
        >
            <div className="p-5 sm:p-6">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <div
                            className={`flex items-center justify-center h-12 w-12 rounded-full ${iconBgColor}`}
                        >
                            <FontAwesomeIcon
                                icon={icon}
                                className={`text-xl ${iconColor}`}
                            />
                        </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 truncate">
                            {title}
                        </h3>
                        {children ? (
                            <div className="mt-4 text-sm text-gray-600">
                                {children}
                            </div>
                        ) : (
                            <div className="mt-1 flex items-baseline">
                                <p className="text-2xl font-bold text-gray-900">
                                    {value}
                                </p>
                                {trend && (
                                    <span
                                        className={`ml-2 flex items-baseline text-sm font-semibold ${
                                            trend === "up"
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {trend === "up" ? "↑" : "↓"}
                                        <span className="sr-only">
                                            {trend === "up"
                                                ? "Increased"
                                                : "Decreased"}
                                        </span>
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardCard;
