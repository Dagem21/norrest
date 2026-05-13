import Image from "next/image";
import profile from "../assets/images/radblu.jpg";

export default function Home() {
    return (
        <div className="flex flex-col flex-1 items-center font-sans dark:bg-gray-800">
            <div className="flex flex-col items-center justify-center w-full h-screen bg-cover bg-center bg-white dark:bg-gray-800 rounded-lg">
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
                                    Looking for a specific cuisine or restaurant? Use our search
                                    feature to find exactly what you're craving!
                                </li>
                                <li className="text-gray-600 dark:text-gray-400 hover:text-blue-500 cursor-pointer">
                                    Scan QR codes at participating restaurants to view menus, place
                                    orders, and enjoy contactless dining experiences.
                                </li>
                                <li className="text-gray-600 dark:text-gray-400 hover:text-blue-500 cursor-pointer">
                                    Rating and reviewing your dining experiences helps others make
                                    informed decisions. Share your thoughts and help the community!
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
                                    Share your menus with customers by generating QR codes for your
                                    restaurant.
                                </li>
                                <li className="text-gray-600 dark:text-gray-400 hover:text-blue-500 cursor-pointer">
                                    Recieve orders directly from customers and manage them
                                    efficiently through our restaurant dashboard.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-screen bg-cover bg-center rounded-lg dark:bg-gray-200">
                <div className="flex flex-wrap items-center justify-center w-full h-full pt-6">
                    <div className="w-full h-full rounded-lg">
                        <h2 className="text-lg text-center font-bold text-gray-200 dark:text-gray-800 mb-4">
                            Top Rated Restaurants
                        </h2>
                        <ul className="flex flex-wrap justify-center space-y-1 text-sm w-full rounded-lg px-2 gap-2">
                            <li className="text-gray-600 dark:text-gray-400 hover:text-blue-500 cursor-pointer w-full md:basis-[calc(50%-1rem)] lg:basis-[calc(33.333%-1rem)]">
                                <div className="flex items-center gap-2 rounded-lg py-5 ps-5 pe-10 bg-gray-200 dark:bg-gray-800 shadow-md shadow-gray-400 dark:shadow-gray-600">
                                    <Image
                                        src={profile}
                                        alt="Picture of the author"
                                        className="w-15 h-15 rounded-full object-cover"
                                    />
                                    <div className="px-3">
                                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                                            The Gourmet Kitchen
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Italian Cuisine
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="text-gray-600 dark:text-gray-400 hover:text-blue-500 cursor-pointer w-full md:basis-[calc(50%-1rem)] lg:basis-[calc(33.333%-1rem)]">
                                <div className="flex items-center gap-2 rounded-lg py-5 ps-5 pe-10 bg-gray-200 dark:bg-gray-800 shadow-md shadow-gray-400 dark:shadow-gray-600">
                                    <Image
                                        src={profile}
                                        alt="Picture of the author"
                                        className="w-15 h-15 rounded-full object-cover"
                                    />
                                    <div className="px-3">
                                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                                            Pizza Paradise
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Italian Cuisine
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="text-gray-600 dark:text-gray-400 hover:text-blue-500 cursor-pointer w-full md:basis-[calc(50%-1rem)] lg:basis-[calc(33.333%-1rem)]">
                                <div className="flex items-center gap-2 rounded-lg py-5 ps-5 pe-10 bg-gray-200 dark:bg-gray-800 shadow-md shadow-gray-400 dark:shadow-gray-600">
                                    <Image
                                        src={profile}
                                        alt="Picture of the author"
                                        className="w-15 h-15 rounded-full object-cover"
                                    />
                                    <div className="px-3">
                                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                                            Sushi World
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Japanese Cuisine
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
