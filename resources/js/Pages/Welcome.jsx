export default function Welcome() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg overflow-hidden p-8 text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-indigo-600 p-4 rounded-full w-20 h-20 flex items-center justify-center">
                        <i className="fas fa-hand-holding-usd text-white text-3xl"></i>
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Welcome to <span className="text-indigo-600">Lendmark</span>
                </h1>

                <p className="text-lg text-gray-600 mb-8">
                    Simple, transparent lending solutions. Borrow what you need
                    or grow your money by lending to others.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center gap-2">
                        Get Started
                        <i className="fas fa-arrow-right"></i>
                    </button>
                    <button className="px-6 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition duration-300 flex items-center justify-center gap-2">
                        <i className="fas fa-info-circle"></i>
                        Learn More
                    </button>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                        Trusted by thousands of users worldwide. Fast, secure,
                        and easy to use.
                    </p>
                </div>
            </div>
        </div>
    );
}
