import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination/Pagination";
import LoanTable from "@/Components/Tables/LoanTable";

function AdminLoanSubpage({ loans }) {
    console.log(loans);
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    Loan Management
                </h2>
                <div className="flex gap-3">
                    <Link
                        href={route("admin.loans.create")}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <i className="fas fa-plus mr-2"></i> Create Loan
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-lg">
                <LoanTable loans={loans} />
                <Pagination links={loans.links} meta={loans.meta} />
            </div>
        </div>
    );
}

AdminLoanSubpage.layout = (page) => (
    <DashboardLayout children={page} auth={page.props.auth} />
);

export default AdminLoanSubpage;
