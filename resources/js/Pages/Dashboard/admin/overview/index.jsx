import DashboardLayout from "@/Layouts/DashboardLayout";
import DashboardCard from "@/components/DashboardCard";
import {
    faWallet,
    faMoneyBillWave,
    faHandHoldingUsd,
    faUsers,
    faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

// Color scheme for charts
const COLORS = ["#0088FE", "#FFBB28", "#00C49F", "#FF8042", "#8884D8"];

function AdminOverviewSubPage({ metrics }) {
    // Prepare chart data from backend metrics
    const paymentLoanData = metrics.monthly_data || [];
    const loanStatusData = metrics.loan_status || [];
    const collectorPerformance = metrics.collector_performance || [];

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">
                Dashboard Overview
            </h1>

            {/* Card Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <DashboardCard
                    icon={faWallet}
                    title="Total Balance"
                    bgColor="bg-blue-50"
                    iconBgColor="bg-blue-100"
                    iconColor="text-blue-600"
                    value={`${Number(metrics.total_balance).toLocaleString()}`}
                    trend="up"
                />
                <DashboardCard
                    icon={faMoneyBillWave}
                    title="Total Payments"
                    bgColor="bg-green-50"
                    iconBgColor="bg-green-100"
                    iconColor="text-green-600"
                    value={`${Number(metrics.total_paid).toLocaleString()}`}
                    trend="up"
                />
                <DashboardCard
                    icon={faHandHoldingUsd}
                    title="Total Loans"
                    bgColor="bg-indigo-50"
                    iconBgColor="bg-indigo-100"
                    iconColor="text-indigo-600"
                    value={Number(metrics.total_loans).toLocaleString()}
                />
                <DashboardCard
                    icon={faUsers}
                    title="Total Clients"
                    bgColor="bg-purple-50"
                    iconBgColor="bg-purple-100"
                    iconColor="text-purple-600"
                    value={Number(metrics.total_clients).toLocaleString()}
                />
                <DashboardCard
                    icon={faUserShield}
                    title="Total Collectors"
                    bgColor="bg-amber-50"
                    iconBgColor="bg-amber-100"
                    iconColor="text-amber-600"
                    value={Number(metrics.total_collectors).toLocaleString()}
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 gap-6 mt-8 lg:grid-cols-2">
                {/* Payments vs Loans Trend */}
                <div className="p-4 bg-white rounded-lg shadow">
                    <h3 className="mb-4 font-medium text-gray-700">
                        Monthly Payments & Loans
                    </h3>
                    <div className="h-[300px]">
                        {paymentLoanData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={paymentLoanData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="payments"
                                        stroke="#10B981"
                                        strokeWidth={2}
                                        activeDot={{ r: 8 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="loans"
                                        stroke="#3B82F6"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                No data available
                            </div>
                        )}
                    </div>
                </div>

                {/* Loan Status Pie Chart */}
                <div className="p-4 bg-white rounded-lg shadow">
                    <h3 className="mb-4 font-medium text-gray-700">
                        Loan Portfolio
                    </h3>
                    <div className="h-[300px]">
                        {loanStatusData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={loanStatusData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) =>
                                            `${name}: ${(percent * 100).toFixed(
                                                0
                                            )}%`
                                        }
                                    >
                                        {loanStatusData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    COLORS[
                                                        index % COLORS.length
                                                    ]
                                                }
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                No data available
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Collector Performance */}
            <div className="p-4 mt-6 bg-white rounded-lg shadow">
                <h3 className="mb-4 font-medium text-gray-700">
                    Collector Performance
                </h3>
                <div className="h-[300px]">
                    {collectorPerformance.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={collectorPerformance}
                                layout="vertical"
                                margin={{ left: 30 }} // Add space for longer names
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    width={80}
                                />
                                <Tooltip />
                                <Bar dataKey="collected" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            No collector data available
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

AdminOverviewSubPage.layout = (page) => (
    <DashboardLayout {...page.props}>{page}</DashboardLayout>
);

export default AdminOverviewSubPage;
