import DashboardLayout from "@/Layouts/DashboardLayout";

const AdminPaymentSubpage = ({ payments }) => {
    return (
        <>
            <pre>{JSON.stringify(payments, null, 2)}</pre>
        </>
    );
};

AdminPaymentSubpage.layout = (page) => (
    <DashboardLayout children={page} auth={page.props.auth} />
);

export default AdminPaymentSubpage;
