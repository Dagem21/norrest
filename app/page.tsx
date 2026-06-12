import Image from "next/image";
import profile from "../assets/images/radblu.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown";
import {
    faBook,
    faMailBulk,
    faMapLocation,
    faPhone,
    faShippingFast,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faTelegram, faTiktok, faTwitter } from "@fortawesome/free-brands-svg-icons";
import Button from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col flex-1 items-center font-sans bg-taupe-100 dark:bg-taupe-900">
            <div id="home" className="flex flex-col items-center justify-center w-full min-h-screen bg-taupe-200 dark:bg-taupe-900 rounded-lg">
                <div className="w-full">
                    <div className="flex flex-col items-center gap-6">
                        <h1 className="text-3xl font-bold">Welcome to Food Haven</h1>
                        <p className="text-md max-w-2xl text-center">
                            Discover the best restaurants in town. Whether you're craving a quick
                            bite or a gourmet meal, we've got you covered.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center mt-12 gap-4 w-full">
                        <div className="w-full sm:w-1/2 lg:w-2/5 bg-taupe-400 dark:bg-taupe-600 rounded-lg shadow-md p-6 mx-2">
                            <h2 className="text-lg text-center font-bold mb-4">
                                Find Your Favorite Food
                            </h2>
                            <ul className="space-y-2 text-sm list-disc pl-5">
                                <li className="hover:text-taupe-900">
                                    Looking for a specific cuisine or restaurant? Use our search
                                    feature to find exactly what you're craving!
                                </li>
                                <li className="hover:text-taupe-900 cursor-pointer">
                                    Scan QR codes at participating restaurants to view menus, place
                                    orders, and enjoy contactless dining experiences.
                                </li>
                                <li className="hover:text-taupe-900 cursor-pointer">
                                    Rating and reviewing your dining experiences helps others make
                                    informed decisions. Share your thoughts and help the community!
                                </li>
                            </ul>
                            <div className="flex flex-col items-center mt-2">
                                <a href="#explore-restaurants"
                                    className={`bg-taupe-600 dark:bg-taupe-800 mx-2 hover:bg-taupe-500 text-white font-bold py-2 px-4 rounded-lg`}>Explore</a>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 lg:w-2/5 bg-taupe-400 dark:bg-taupe-600 rounded-lg shadow-md p-6 mx-2">
                            <h2 className="text-lg text-center font-bold mb-4">
                                Register Your Restaurant
                            </h2>
                            <ul className="space-y-2 text-sm list-disc pl-5">
                                <li className="hover:text-taupe-900">
                                    Add your restaurant to our platform and reach more customers.
                                </li>
                                <li className="hover:text-taupe-900 cursor-pointer">
                                    Share your menus with customers by generating QR codes for your
                                    restaurant.
                                </li>
                                <li className="hover:text-taupe-900 cursor-pointer">
                                    Recieve orders directly from customers and manage them
                                    efficiently through our restaurant dashboard.
                                </li>
                            </ul>
                            <div className="flex flex-col items-center mt-2">
                                <Link href="/register"
                                    className={`border border-taupe-600 dark:border-taupe-800 mx-2 hover:bg-taupe-500 text-white font-bold py-2 px-4 rounded-lg`}>
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="explore-restaurants" className="flex flex-col items-center justify-center w-full min-h-screen bg-taupe-200 dark:bg-taupe-900 overflow-y-auto">
                <div className="flex flex-wrap items-center justify-center w-full h-full">
                    <div className="w-full rounded-lg">
                        <h2 className="text-taupe-900 dark:text-taupe-200 text-lg text-center font-bold mb-4">
                            Top Rated Restaurants
                        </h2>
                        <ul className="flex flex-wrap justify-center space-y-1 text-sm w-full rounded-lg px-2 gap-2">
                            <li className="text-taupe-900 dark:text-taupe-200 cursor-pointer w-full md:basis-[calc(50%-1rem)] lg:basis-[calc(30%-1rem)]">
                                <Link
                                    href={`/menu`}
                                    className="flex items-center gap-2 rounded-lg py-5 ps-5 pe-10 bg-taupe-400 dark:bg-taupe-600"
                                >
                                    <Image
                                        src={profile}
                                        alt="Picture of the author"
                                        className="w-15 h-15 rounded-full object-cover"
                                    />
                                    <div className="px-3">
                                        <p className="text-sm font-bold">The Gourmet Kitchen</p>
                                        <p className="text-xs">Italian Cuisine</p>
                                    </div>
                                </Link>
                            </li>
                            <li className="text-taupe-900 dark:text-taupe-200 cursor-pointer w-full md:basis-[calc(50%-1rem)] lg:basis-[calc(30%-1rem)]">
                                <Link
                                    href={`/menu`}
                                    className="flex items-center gap-2 rounded-lg py-5 ps-5 pe-10 bg-taupe-400 dark:bg-taupe-600"
                                >
                                    <Image
                                        src={profile}
                                        alt="Picture of the author"
                                        className="w-15 h-15 rounded-full object-cover"
                                    />
                                    <div className="px-3">
                                        <p className="text-sm font-bold">Pizza Paradise</p>
                                        <p className="text-xs">Italian Cuisine</p>
                                    </div>
                                </Link>
                            </li>
                            <li className="text-taupe-900 dark:text-taupe-200 cursor-pointer w-full md:basis-[calc(50%-1rem)] lg:basis-[calc(30%-1rem)]">
                                <Link
                                    href={`/menu`}
                                    className="flex items-center gap-2 rounded-lg py-5 ps-5 pe-10 bg-taupe-400 dark:bg-taupe-600"
                                >
                                    <Image
                                        src={profile}
                                        alt="Picture of the author"
                                        className="w-15 h-15 rounded-full object-cover"
                                    />
                                    <div className="px-3">
                                        <p className="text-sm font-bold">Sushi World</p>
                                        <p className="text-xs">Japanese Cuisine</p>
                                    </div>
                                </Link>
                            </li>
                            <li className="text-taupe-900 dark:text-taupe-200 cursor-pointer w-full md:basis-[calc(50%-1rem)] lg:basis-[calc(30%-1rem)]">
                                <Link
                                    href={`/menu`}
                                    className="flex items-center gap-2 rounded-lg py-5 ps-5 pe-10 bg-taupe-400 dark:bg-taupe-600"
                                >
                                    <Image
                                        src={profile}
                                        alt="Picture of the author"
                                        className="w-15 h-15 rounded-full object-cover"
                                    />
                                    <div className="px-3">
                                        <p className="text-sm font-bold">The Gourmet Kitchen</p>
                                        <p className="text-xs">Italian Cuisine</p>
                                    </div>
                                </Link>
                            </li>
                            <li className="text-taupe-900 dark:text-taupe-200 cursor-pointer w-full md:basis-[calc(50%-1rem)] lg:basis-[calc(30%-1rem)]">
                                <Link
                                    href={`/menu`}
                                    className="flex items-center gap-2 rounded-lg py-5 ps-5 pe-10 bg-taupe-400 dark:bg-taupe-600"
                                >
                                    <Image
                                        src={profile}
                                        alt="Picture of the author"
                                        className="w-15 h-15 rounded-full object-cover"
                                    />
                                    <div className="px-3">
                                        <p className="text-sm font-bold">Pizza Paradise</p>
                                        <p className="text-xs">Italian Cuisine</p>
                                    </div>
                                </Link>
                            </li>
                            <li className="text-taupe-900 dark:text-taupe-200 cursor-pointer w-full md:basis-[calc(50%-1rem)] lg:basis-[calc(30%-1rem)]">
                                <Link
                                    href={`/menu`}
                                    className="flex items-center gap-2 rounded-lg py-5 ps-5 pe-10 bg-taupe-400 dark:bg-taupe-600"
                                >
                                    <Image
                                        src={profile}
                                        alt="Picture of the author"
                                        className="w-15 h-15 rounded-full object-cover"
                                    />
                                    <div className="px-3">
                                        <p className="text-sm font-bold">Sushi World</p>
                                        <p className="text-xs">Japanese Cuisine</p>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                        <div className="mt-2 flex items-center justify-center">
                            <h2 className="text-sm font-bold text-center mb-4 cursor-pointer">
                                see more <FontAwesomeIcon icon={faAngleDown} />
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            <div id="explore-services" className="flex flex-col w-full min-h-screen bg-taupe-400 dark:bg-taupe-200">
                <div className="flex flex-col w-full h-screen">
                    <div className="flex flex-col justify-center w-full rounded-lg mb-6 grow-1">
                        <h2 className="text-lg text-center font-bold mb-4">Services</h2>
                        <ul className="flex flex-wrap justify-center space-y-1 text-sm w-full rounded-lg px-2 gap-2">
                            <li className="hover:text-taupe-500 cursor-pointer w-full md:basis-[calc(50%-1rem)] lg:basis-[calc(30%-1rem)]">
                                <div className="flex items-center gap-2 rounded-lg py-5 ps-5 pe-10 bg-taupe-200 dark:bg-taupe-900 shadow-md shadow-taupe-500 dark:shadow-taupe-600">
                                    <FontAwesomeIcon
                                        icon={faMapLocation}
                                        className="w-15 h-15 rounded-full object-cover"
                                    />
                                    <div className="px-3">
                                        <p className="text-sm font-bold">Find places near you</p>
                                    </div>
                                </div>
                            </li>
                            <li className="hover:text-taupe-500 cursor-pointer w-full md:basis-[calc(50%-1rem)] lg:basis-[calc(30%-1rem)]">
                                <div className="flex items-center gap-2 rounded-lg py-5 ps-5 pe-10 bg-taupe-200 dark:bg-taupe-900 shadow-md shadow-taupe-500 dark:shadow-taupe-600">
                                    <FontAwesomeIcon
                                        icon={faShippingFast}
                                        className="w-15 h-15 rounded-full object-cover"
                                    />
                                    <div className="px-3">
                                        <p className="text-sm font-bold">Order from your home</p>
                                    </div>
                                </div>
                            </li>
                            <li className="hover:text-taupe-500 cursor-pointer w-full md:basis-[calc(50%-1rem)] lg:basis-[calc(30%-1rem)]">
                                <div className="flex items-center gap-2 rounded-lg py-5 ps-5 pe-10 bg-taupe-200 dark:bg-taupe-900 shadow-md shadow-taupe-500 dark:shadow-taupe-600">
                                    <FontAwesomeIcon
                                        icon={faInstagram}
                                        className="w-15 h-15 rounded-full object-cover"
                                    />
                                    <div className="px-3">
                                        <p className="text-sm font-bold">Find places near you</p>
                                    </div>
                                </div>
                            </li>
                            <li className="hover:text-taupe-500 cursor-pointer w-full md:basis-[calc(50%-1rem)] lg:basis-[calc(30%-1rem)]">
                                <div className="flex items-center gap-2 rounded-lg py-5 ps-5 pe-10 bg-taupe-200 dark:bg-taupe-900 shadow-md shadow-taupe-500 dark:shadow-taupe-600">
                                    <FontAwesomeIcon
                                        icon={faBook}
                                        className="w-15 h-15 rounded-full object-cover"
                                    />
                                    <div className="px-3">
                                        <p className="text-sm font-bold">Manage your buisness</p>
                                    </div>
                                </div>
                            </li>
                            <li className="hover:text-taupe-500 cursor-pointer w-full md:basis-[calc(50%-1rem)] lg:basis-[calc(30%-1rem)]">
                                <div className="flex items-center gap-2 rounded-lg py-5 ps-5 pe-10 bg-taupe-200 dark:bg-taupe-900 shadow-md shadow-taupe-500 dark:shadow-taupe-600">
                                    <FontAwesomeIcon
                                        icon={faInstagram}
                                        className="w-15 h-15 rounded-full object-cover"
                                    />
                                    <div className="px-3">
                                        <p className="text-sm font-bold">Find places near you</p>
                                    </div>
                                </div>
                            </li>
                            <li className="hover:text-taupe-500 cursor-pointer w-full md:basis-[calc(50%-1rem)] lg:basis-[calc(30%-1rem)]">
                                <div className="flex items-center gap-2 rounded-lg py-5 ps-5 pe-10 bg-taupe-200 dark:bg-taupe-900 shadow-md shadow-taupe-500 dark:shadow-taupe-600">
                                    <FontAwesomeIcon
                                        icon={faInstagram}
                                        className="w-15 h-15 rounded-full object-cover"
                                    />
                                    <div className="px-3">
                                        <p className="text-sm font-bold">Find places near you</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 w-full bg-taupe-200 dark:bg-taupe-900 rounded-t-lg py-6">
                        <div className="w-full sm:w-1/3 lg:w-2/7 bg-taupe-400 dark:bg-taupe-600 rounded-lg shadow-md p-6 mx-2">
                            <h2 className="text-lg text-center font-bold mb-4">Contact</h2>
                            <ul className="space-y-2 text-sm pl-5">
                                <li className="hover:text-taupe-900">
                                    <FontAwesomeIcon icon={faPhone} className="me-2" />
                                    Call us at +215-912-345-678
                                </li>
                                <li className="hover:text-taupe-900">
                                    <FontAwesomeIcon icon={faMailBulk} className="me-2" />
                                    contact@gmail.com
                                </li>
                                <li className="text-center">
                                    <div className="flex flex-wrap justify-center gap-4 p-2">
                                        <div className="hover:text-taupe-900">
                                            <FontAwesomeIcon icon={faTwitter} />
                                        </div>
                                        <div className="hover:text-taupe-900">
                                            <FontAwesomeIcon icon={faInstagram} />
                                        </div>
                                        <div className="hover:text-taupe-900">
                                            <FontAwesomeIcon icon={faTiktok} />
                                        </div>
                                        <div className="hover:text-taupe-900">
                                            <FontAwesomeIcon icon={faTelegram} />
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="w-full sm:w-1/3 lg:w-2/7 bg-taupe-400 dark:bg-taupe-600 rounded-lg shadow-md p-6 mx-2">
                            <h2 className="text-lg text-center font-bold mb-4">
                                Register Your Restaurant
                            </h2>
                            <ul className="space-y-2 text-sm list-disc pl-5">
                                <li className="hover:text-taupe-900">
                                    Add your restaurant to our platform and reach more customers.
                                </li>
                                <li className="hover:text-taupe-900 cursor-pointer">
                                    Share your menus with customers by generating QR codes for your
                                    restaurant.
                                </li>
                                <li className="hover:text-taupe-900 cursor-pointer">
                                    Recieve orders directly from customers and manage them
                                    efficiently through our restaurant dashboard.
                                </li>
                            </ul>
                        </div>
                        <div className="w-full sm:w-1/3 lg:w-2/7 bg-taupe-400 dark:bg-taupe-600 rounded-lg shadow-md p-6 mx-2">
                            <h2 className="text-lg text-center font-bold mb-4">FAQ</h2>
                            <ul className="space-y-2 text-sm list-disc pl-5">
                                <li className="hover:text-taupe-900 cursor-pointer">
                                    How do I register my restaurant on Food Haven?
                                </li>
                                <li className="hover:text-taupe-900 cursor-pointer">
                                    How can I generate QR codes for my restaurant's menu?
                                </li>
                                <li className="hover:text-taupe-900 cursor-pointer">
                                    How do I place an order through Food Haven?
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
