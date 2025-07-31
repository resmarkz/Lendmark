import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import DashboardLayout from "@/Layouts/DashboardLayout";
import DashboardCard from "@/Components/DashboardCard";
import {
    faUser,
    faKey,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";

function Edit({ mustVerifyEmail, status }) {
    return (
        <div>
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Update Profile Information */}
                        <DashboardCard
                            title="Profile Information"
                            icon={faUser}
                            iconBgColor="bg-blue-100"
                            iconColor="text-blue-600"
                        >
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                            />
                        </DashboardCard>

                        {/* Update Password */}
                        <DashboardCard
                            title="Update Password"
                            icon={faKey}
                            iconBgColor="bg-green-100"
                            iconColor="text-green-600"
                        >
                            <UpdatePasswordForm />
                        </DashboardCard>

                        {/* Delete Account */}
                        <DashboardCard
                            title="Delete Account"
                            icon={faTrash}
                            iconBgColor="bg-red-100"
                            iconColor="text-red-600"
                        >
                            <DeleteUserForm />
                        </DashboardCard>
                    </div>
                </div>
            </div>
        </div>
    );
}

Edit.layout = (page) => (
    <DashboardLayout children={page} auth={page.props.auth} />
);

export default Edit;
