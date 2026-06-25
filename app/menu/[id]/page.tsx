"use client";

import MenuItem from "@/components/menuItem";
import { MenuContext } from "@/providers/menu";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import ViewMenuItem from "@/components/forms/menu/viewMenuItem";
import Button from "@/components/ui/button";
import profile from "../../../assets/images/radblu.jpg";
import food from "../../../assets/images/fi3.png";
import ViewOrder from "@/components/forms/order/viewOrder";
import { useParams } from "next/navigation";
import useApiFetch from "@/hooks/useAPIFetch";
import Loading from "@/components/loadingComponent";
import { categoryTypes } from "@/assets/enums/enum";
import PageNavigator from "@/components/pageNavigator";
import { ToastContext } from "@/providers/toastProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { useCartStore } from "@/hooks/useCartStore";

export default function Menu() {
    const params = useParams<{ id: string }>();
    const menuContext = useContext(MenuContext);
    const toaster = useContext(ToastContext);

    const {
        carts,
        activeCartId,
        addToActiveCart,
        createNewCart,
        deleteCart,
        removeFromActiveCart,
        setActiveCart,
    } = useCartStore();

    const [isModalOpen, setModalOpen] = useState(false);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [menu, setMenu] = useState<Array<any>>([]);
    const [selectedItem, setSelectedItem] = useState<any>();
    const [selectedCatagory, setSelectedCategory] = useState<string | null>();
    const [pageLimit, setPageLimit] = useState({
        page: 1,
        limit: 10,
    });

    const { data, isLoading, errors } = useApiFetch(
        {
            url: `/api/menu?branchID=${params?.id}`,
            method: "GET",
        },
        true,
    );

    useEffect(() => {
        if (!isLoading && data && !selectedCatagory) {
            setMenu(data?.items);
        } else if (!isLoading && errors?.details) {
            const toast = {
                message: errors?.details?.response?.data?.error,
                type: "error",
            };
            toaster?.addToast(toast);
        }
    }, [isLoading, data, errors]);

    useEffect(() => {
        menuContext?.setTitle(`${data?.branch?.companyID?.name}, ${data?.branch?.name}`);
    }, [data]);

    const handlePageChange = (page: number) => {
        setPageLimit((prev) => ({ ...prev, page }));
    };
    const handleLimitChange = (limit: number) => {
        setPageLimit((prev) => ({ ...prev, limit }));
    };

    useEffect(() => {
        if (!isLoading && selectedCatagory && data) {
            const items = data?.items?.filter((item: any) =>
                item?.category?.includes(selectedCatagory),
            );
            setMenu(items);
        }
    }, [selectedCatagory, isLoading, data]);

    const handleAddCart = (item: any, quantity: number) => {
        createNewCart(params.id, `${data?.branch?.companyID?.name}, ${data?.branch?.name}`)
        setActiveCart(params.id);
        addToActiveCart({
            item, quantity
        })
    }

    return (
        <div className="flex flex-col flex-1 items-center bg-taupe-100 dark:bg-taupe-900 p-2">
            <div className="fixed bottom-0 right-0 m-6">
                <button
                    className="rounded-full bg-taupe-400 dark:bg-taupe-600 p-3 shadow-lg"
                    onClick={() => setIsOrderModalOpen(true)}
                >
                    <FontAwesomeIcon icon={faUtensils} size="lg" />
                </button>
            </div>
            <div className="flex flex-col w-full">
                <div className="flex flex-wrap justify-center gap-2 w-full px-2">
                    {!isLoading && data && (
                        <div className="relative flex flex-col gap-2 h-fit w-full sm:w-4/7">
                            <div className="bg-taupe-200 dark:bg-taupe-600 p-2 rounded-lg flex flex-col items-center">
                                <Image
                                    className="w-15 h-15 object-cover"
                                    src={profile}
                                    alt={"Company profile"}
                                />
                                <h1 className="text-sm font-bold mt-2">{`${data?.branch?.companyID?.name}, ${data?.branch?.name}`}</h1>
                            </div>
                            <div className="p-2 bg-taupe-200 dark:bg-taupe-600 rounded-lg">
                                <div>
                                    <h1 className="flex-1 text-sm font-semibold text-center text-taupe-700 dark:text-taupe-300">
                                        Menu
                                    </h1>
                                </div>
                                <div className="container flex px-2 py-2 border-taupe-500 dark:border-taupe-400 [&::-webkit-scrollbar]:hidden">
                                    <ul className="flex gap-2 overflow-x-auto text-xs py-2">
                                        {Object.values(categoryTypes).map((category) => (
                                            <li
                                                className={`rounded shadow-lg px-3 py-2 cursor-pointer whitespace-nowrap ${selectedCatagory === category ? "bg-taupe-900" : ""}`}
                                                key={category}
                                                onClick={() => {
                                                    setSelectedCategory(category);
                                                }}
                                            >
                                                {category}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {menu?.length > 0 &&
                                        menu
                                            .slice(
                                                (pageLimit.page - 1) * pageLimit.limit,
                                                pageLimit.page * pageLimit.limit,
                                            )
                                            ?.map((item: any) => (
                                                <div
                                                    onClick={() => {
                                                        setSelectedItem(item);
                                                        setModalOpen(true);
                                                    }}
                                                    key={item?._id}
                                                >
                                                    <MenuItem
                                                        price={item?.price}
                                                        name={item?.name}
                                                        categories={item?.category?.join(", ")}
                                                        description={item?.ingredients}
                                                        image={item?.picture?.[0]}
                                                    />
                                                </div>
                                            ))}
                                </div>
                                {menu?.length === 0 && (
                                    <div className="pb-2">
                                        <h1 className="text-sm text-center text-taupe-600 dark:text-taupe-200">
                                            No items in menu.
                                        </h1>
                                    </div>
                                )}

                                <PageNavigator
                                    page={pageLimit.page}
                                    limit={pageLimit.limit}
                                    totalDocs={menu.length}
                                    totalPages={Math.ceil((menu.length ?? 0) / pageLimit.limit)}
                                    onPageChange={handlePageChange}
                                    onLimitChange={handleLimitChange}
                                />
                            </div>
                        </div>
                    )}
                    <Loading loading={isLoading} />
                </div>
            </div>
            <ViewMenuItem isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <div className="flex flex-col p-2 cursor-pointer">
                    <div className="flex items-center flex-wrap shadow-lg">
                        <div>
                            <Image
                                className="max-w-sm rounded-lg object-cover"
                                src={selectedItem?.picture?.[1]}
                                alt={selectedItem?.name}
                                width={1000}
                                height={1000}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col justify-between my-2">
                        <div className="flex items-center justify-between tracking-wide">
                            <h1 className="text-md font-bold">{selectedItem?.name}</h1>
                            <div className="flex items-center gap-2">
                                <span
                                    className={`${selectedItem?.discount ? "text line-through text-xs text-taupe-400" : "font-bold text-sm text-taupe-200"}`}
                                >
                                    $ {selectedItem?.price} Birr
                                </span>
                                {selectedItem?.discount && (
                                    <span className="font-bold text-sm text-taupe-200">
                                        ${" "}
                                        {selectedItem?.price -
                                            selectedItem?.price * selectedItem?.discount}{" "}
                                        Birr
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col text-taupe-300 my-2">
                            <p className="text-xs">{selectedItem?.ingredients}</p>
                            <p className="text-xs">{selectedItem?.category?.join(",")}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 my-2">
                        <Button text="Order Now" />
                        <Button text="Add to Orders" style="secondary" onClick={() => { handleAddCart(selectedItem, 1) }} />
                    </div>
                </div>
            </ViewMenuItem>

            <ViewOrder isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />
        </div>
    );
}
