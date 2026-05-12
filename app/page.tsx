export default function Home() {
    return (
        <div className="flex flex-col flex-1 items-center font-sans dark:bg-gray-800">
            {/* <div className="w-full max-w-4xl py-4 rounded-lg shadow-md shadow-gray-200 dark:bg-gray-800 dark:shadow-gray-700 fixed bg-white">
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
            </div> */}
            <div className="flex flex-col items-center justify-center w-full h-screen bg-cover bg-center rounded-lg">
                <div className="w-full">
                    <div className="flex flex-col items-center gap-6">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                            Welcome to Food Haven
                        </h1>
                        <p className="text-md text-gray-600 dark:text-gray-400 max-w-2xl text-center">
                            Discover the best restaurants in town. Whether you're craving a quick
                            bite or a gourmet meal, we've got you covered.
                        </p>
                        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                            Explore Now
                        </button>
                    </div>
                    <div className="flex flex-wrap justify-center mt-12 gap-8 w-full">
                        <div className="w-full sm:w-1/2 lg:w-2/5 bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mx-2">
                            <h2 className="text-lg text-center font-bold text-gray-800 dark:text-gray-200 mb-4">
                                Find Your Favorite Food
                            </h2>
                            <ul className="space-y-2 text-sm list-disc pl-5">
                                <li className="text-gray-600 dark:text-gray-400 hover:text-blue-500">
                                    Looking for a specific cuisine or restaurant? Use our search feature to find exactly what you're craving!
                                </li>
                                <li className="text-gray-600 dark:text-gray-400 hover:text-blue-500 cursor-pointer">
                                    Scan QR codes at participating restaurants to view menus, place orders, and enjoy contactless dining experiences.
                                </li>
                                <li className="text-gray-600 dark:text-gray-400 hover:text-blue-500 cursor-pointer">
                                    Rating and reviewing your dining experiences helps others make informed decisions. Share your thoughts and help the community!
                                </li>
                            </ul>
                        </div>
                        <div className="w-full sm:w-1/2 lg:w-2/5 bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mx-2">
                            <h2 className="text-lg text-center font-bold text-gray-800 dark:text-gray-200 mb-4">
                                Register Your Restaurant
                            </h2>
                            <ul className="space-y-2 text-sm list-disc pl-5">
                                <li className="text-gray-600 dark:text-gray-400 hover:text-blue-500">
                                    Add your restaurant to our platform and reach more customers.
                                </li>
                                <li className="text-gray-600 dark:text-gray-400 hover:text-blue-500 cursor-pointer">
                                    Share your menus with customers by generating QR codes for your restaurant.
                                </li>
                                <li className="text-gray-600 dark:text-gray-400 hover:text-blue-500 cursor-pointer">
                                    Recieve orders directly from customers and manage them efficiently through our restaurant dashboard.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-screen bg-cover bg-center rounded-lg dark:bg-gray-200">
                <div className="flex flex-wrap items-center justify-center mt-12 gap-8 w-full">
                    <div className="w-full sm:w-1/2 lg:w-2/5 bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mx-2">
                        <h2 className="text-lg text-center font-bold text-gray-800 dark:text-gray-200 mb-4">
                            Top Restaurants
                        </h2>
                        <ul className="space-y-2 text-sm">
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
                    <div className="w-full sm:w-1/2 lg:w-2/5 bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mx-2">
                        <h2 className="text-lg text-center font-bold text-gray-800 dark:text-gray-200 mb-4">
                            Top Rated
                        </h2>
                        <ul className="space-y-2 text-sm">
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
