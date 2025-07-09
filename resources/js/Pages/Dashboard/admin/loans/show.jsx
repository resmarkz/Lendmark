import DashboardLayout from "@/Layouts/DashboardLayout";

const statusColors = {
    active: "bg-blue-100 text-blue-800",
    ongoing: "bg-blue-100 text-blue-800",
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    paid: "bg-purple-100 text-purple-800",
    overdue: "bg-red-100 text-red-800",
    settled: "bg-emerald-100 text-emerald-800",
    cancelled: "bg-gray-100 text-gray-800",
    default: "bg-gray-100 text-gray-800",
};

const InfoCard = ({ title, children, className = "" }) => (
    <div className={`bg-white shadow rounded-lg p-6 ${className}`}>
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
            {title}
        </h2>
        <div className="space-y-3">{children}</div>
    </div>
);

const InfoItem = ({ label, value, className = "" }) => (
    <div className={`flex items-baseline gap-2 ${className}`}>
        <span className="font-medium text-gray-700">{label}:</span>
        <span className="bg-gray-50 px-2 py-1 rounded text-gray-800">
            {value}
        </span>
    </div>
);

const formatCurrency = (amount) => `₱${parseFloat(amount).toLocaleString()}`;
const formatDate = (dateString) => new Date(dateString).toLocaleDateString();
const formatDateTime = (dateString) => new Date(dateString).toLocaleString();

const AdminLoanShow = ({ loan }) => {
    return (
        <div className="space-y-6">
            <InfoCard title="Loan Details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <InfoItem label="Loan ID" value={loan.marketing_id} />
                        <InfoItem
                            label="Amount"
                            value={formatCurrency(loan.amount)}
                        />
                        <InfoItem label="Term" value={`${loan.term} months`} />
                        <InfoItem
                            label="Interest Rate"
                            value={`${loan.interest_rate}%`}
                        />
                        <div className="flex items-baseline gap-2">
                            <span className="font-medium text-gray-700">
                                Status:
                            </span>
                            <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                    statusColors[loan.status] ||
                                    statusColors.default
                                }`}
                            >
                                {loan.status}
                            </span>
                        </div>
                        <InfoItem
                            label="Due Date"
                            value={formatDate(loan.due_date)}
                        />
                    </div>

                    <div className="space-y-3">
                        <InfoItem
                            label="Created At"
                            value={formatDateTime(loan.created_at)}
                        />
                        <InfoItem
                            label="Last Updated"
                            value={formatDateTime(loan.updated_at)}
                        />
                    </div>
                </div>
            </InfoCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoCard title="Client Information">
                    <InfoItem
                        label="Name"
                        value={loan.client_profile.user.name}
                    />
                    <InfoItem
                        label="Email"
                        value={loan.client_profile.user.email}
                    />
                    <InfoItem
                        label="Contact"
                        value={loan.client_profile.contact_number}
                    />
                    <InfoItem
                        label="Address"
                        value={loan.client_profile.address}
                    />
                    <InfoItem
                        label="Date of Birth"
                        value={formatDate(loan.client_profile.date_of_birth)}
                    />
                    <InfoItem
                        label="Income Source"
                        value={loan.client_profile.source_of_income}
                    />
                </InfoCard>

                <InfoCard title="Collector Information">
                    <InfoItem
                        label="Name"
                        value={loan.collector_profile.user.name}
                    />
                    <InfoItem
                        label="Contact"
                        value={loan.collector_profile.contact_number}
                    />
                </InfoCard>
            </div>
        </div>
    );
};

AdminLoanShow.layout = (page) => (
    <DashboardLayout children={page} auth={page.props.auth} />
);

export default AdminLoanShow;
