import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Sign In to Lendmark" />

            <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden p-8">
                {/* Logo Header */}
                <div className="text-center mb-8">
                    <div className="mx-auto bg-indigo-600 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                        <i className="fas fa-hand-holding-usd text-white text-2xl"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Welcome back
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Sign in to your Lendmark account
                    </p>
                </div>

                {status && (
                    <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md text-sm">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <InputLabel
                            htmlFor="email"
                            value="Email address"
                            className="sr-only"
                        />
                        <div className="relative">
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full pl-10"
                                placeholder="Enter your email"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-envelope text-gray-400"></i>
                            </div>
                        </div>
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only"
                        />
                        <div className="relative">
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="block w-full pl-10"
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-lock text-gray-400"></i>
                            </div>
                        </div>
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                            />
                            <span className="ml-2 text-sm text-gray-600">
                                Remember me
                            </span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-sm text-indigo-600 hover:text-indigo-500"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>

                    <div>
                        <PrimaryButton
                            className="w-full justify-center py-3"
                            disabled={processing}
                        >
                            {processing ? (
                                <>
                                    <i className="fas fa-spinner fa-spin mr-2"></i>
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </PrimaryButton>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link
                            href={route("register")}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </GuestLayout>
    );
}
