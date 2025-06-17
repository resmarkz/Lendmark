import DashboardLayout from "@/Layouts/DashboardLayout";

function AdminOverviewSubPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Dashboard Overview
            </h1>

            {/* Sample Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-indigo-50 p-4 rounded-lg">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                            <i className="fas fa-wallet"></i>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">
                                Total Balance
                            </p>
                            <p className="text-2xl font-semibold text-gray-800">
                                $12,345
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-100 text-green-600">
                            <i className="fas fa-arrow-up"></i>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">
                                Active Loans
                            </p>
                            <p className="text-2xl font-semibold text-gray-800">
                                8
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                            <i className="fas fa-exchange-alt"></i>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">
                                Transactions
                            </p>
                            <p className="text-2xl font-semibold text-gray-800">
                                24
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

AdminOverviewSubPage.layout = (page) => (
    <DashboardLayout {...page.props}>{page}</DashboardLayout>
);

export default AdminOverviewSubPage;
