import DashboardLayout from "@/Layouts/DashboardLayout";

const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    paid: "bg-green-100 text-green-800",
    overdue: "bg-red-100 text-red-800",
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

const AdminPaymentShow = ({ payment }) => {
    return (
        <div className="space-y-6">
            <InfoCard title="Payment Details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <InfoItem label="Payment ID" value={payment.id} />
                        <InfoItem label="Loan ID" value={payment.loan_id} />
                        <InfoItem
                            label="Amount Paid"
                            value={formatCurrency(payment.amount_paid)}
                        />
                        <div className="flex items-baseline gap-2">
                            <span className="font-medium text-gray-700">
                                Status:
                            </span>
                            <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                    statusColors[payment.status] ||
                                    statusColors.default
                                }`}
                            >
                                {payment.status}
                            </span>
                        </div>
                        <InfoItem
                            label="Due Date"
                            value={formatDate(payment.due_date)}
                        />
                        <InfoItem
                            label="Paid At"
                            value={payment.paid_at ? formatDate(payment.paid_at) : 'N/A'}
                        />
                    </div>

                    <div className="space-y-3">
                        <InfoItem
                            label="Created At"
                            value={formatDateTime(payment.created_at)}
                        />
                        <InfoItem
                            label="Last Updated"
                            value={formatDateTime(payment.updated_at)}
                        />
                    </div>
                </div>
            </InfoCard>

            <InfoCard title="Client Information">
                <InfoItem
                    label="Name"
                    value={payment.loan?.client_profile?.user?.name || 'N/A'}
                />
                <InfoItem
                    label="Email"
                    value={payment.loan?.client_profile?.user?.email || 'N/A'}
                />
                <InfoItem
                    label="Contact"
                    value={payment.loan?.client_profile?.contact_number || 'N/A'}
                />
                <InfoItem
                    label="Address"
                    value={payment.loan?.client_profile?.address || 'N/A'}
                />
            </InfoCard>
        </div>
    );
};

AdminPaymentShow.layout = (page) => (
    <DashboardLayout children={page} auth={page.props.auth} />
);

export default AdminPaymentShow;