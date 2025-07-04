import DashboardLayout from "@/Layouts/DashboardLayout";

const AdminLoanShow = ({ loan }) => {
    return (
        <div>
            <h1>Loan Show</h1>
        </div>
    );
};

AdminLoanShow.layout = (page) => (
    <DashboardLayout children={page} auth={page.props.auth} />
);

export default AdminLoanShow;
