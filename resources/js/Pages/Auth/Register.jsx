import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                {/* Logo Header */}
                <div className="text-center mb-8">
                    <div className="mx-auto bg-indigo-600 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                        <i className="fas fa-hand-holding-usd text-white text-2xl"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Create Account
                    </h2>
                    <p className="text-gray-600 mt-2">Join Lendmark today</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className="mb-4">
                        <InputLabel value="Full Name" />
                        <TextInput
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full"
                            placeholder="John Doe"
                            required
                        />
                        <InputError message={errors.name} className="mt-1" />
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <InputLabel value="Email Address" />
                        <TextInput
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="w-full"
                            placeholder="you@example.com"
                            required
                        />
                        <InputError message={errors.email} className="mt-1" />
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <InputLabel value="Password" />
                        <TextInput
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="w-full"
                            placeholder="••••••••"
                            required
                        />
                        <InputError
                            message={errors.password}
                            className="mt-1"
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-6">
                        <InputLabel value="Confirm Password" />
                        <TextInput
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            className="w-full"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <PrimaryButton
                        className="w-full justify-center"
                        disabled={processing}
                    >
                        {processing ? "Creating Account..." : "Create Account"}
                    </PrimaryButton>

                    <div className="mt-4 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link
                            href={route("login")}
                            className="text-indigo-600 hover:underline"
                        >
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
