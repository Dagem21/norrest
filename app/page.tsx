export default function Home() {
    return (
        <div className="flex flex-col flex-1 items-center font-sans dark:bg-gray-800">
            <div className="mt-4 py-2 rounded-lg w-full max-w-4xl shadow-xl shadow-gray-200 dark:bg-gray-800 dark:shadow-gray-700 sticky top-5 bg-white">
                <ul className="flex items-center justify-evenly gap-8 w-full max-w-4xl">
                    <li className="text-md font-bold text-blue-500 dark:text-gray-200 cursor-pointer">
                        Home
                    </li>
                    <li className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 cursor-pointer">
                        Restaurants
                    </li>
                    <li className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 cursor-pointer">
                        Services
                    </li>
                    <li className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 cursor-pointer">
                        Contact
                    </li>
                </ul>
            </div>
            <div className="flex flex-col items-center w-full h-screen bg-cover bg-center mt-8 rounded-lg">
                <div className="flex flex-col items-center mt-12 gap-6">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                        Welcome to Food Haven
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl text-center">
                        Discover the best restaurants in town. Whether you're craving a quick bite
                        or a gourmet meal, we've got you covered.
                    </p>
                    <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                        Explore Now
                    </button>
                </div>
                <div className="flex items-center justify-center mt-12 w-full max-w-4xl">
                    <div className="flex flex-col items-center p-16 border flex-1 rounded-lg">
                        hello world
                    </div>
                    <div className="flex flex-col items-center p-16 border flex-1 rounded-lg">
                        hello again
                    </div>
                </div>
            </div>
            <div className="w-full h-screen bg-cover bg-center mt-8 rounded-lg">
                <div className="flex flex-wrap justify-center mt-12 gap-8 w-full max-w-4xl">
                    <div className="w-full sm:w-1/2 lg:w-1/3 bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                            Top Restaurants
                        </h2>
                        <ul className="space-y-4">
                            <li className="text-gray-600 dark:text-gray-400 hover:text-blue-500 cursor-pointer">
                                The Gourmet Kitchen
                            </li>
                            <li className="text-gray-600 dark:text-gray-400 hover:text-blue-500 cursor-pointer">
                                Pizza Paradise
                            </li>
                            <li className="text-gray-600 dark:text-gray-400 hover:text-blue-500 cursor-pointer">
                                Sushi World
                            </li>
                        </ul>
                    </div>
                    <div className="w-full sm:w-1/2 lg:w-1/3 bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                            Popular Services
                        </h2>
                        <ul className="space-y-4">
                            <li className="text-gray-600 dark:text-gray-400 hover:text-blue-500 cursor-pointer">
                                Food Delivery
                            </li>
                            <li className="text-gray-600 dark:text-gray-400 hover:text-blue-500 cursor-pointer">
                                Table Reservations
                            </li>
                            <li className="text-gray-600 dark:text-gray-400 hover:text-blue-500 cursor-pointer">
                                Catering Services
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
