import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import Loading from "./loadingComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "./ui/button";

type OrderItemProps = {
    id: string;
    name: string;
    price: number;
    image: StaticImageData;
    description?: string;
    categories: string;
    discount?: number;
    quantity: number;
    removeFromCart: (id: string) => void;
};

export default function OrderItem({
    id,
    name,
    price,
    image,
    description,
    categories,
    discount,
    quantity,
    removeFromCart,
}: OrderItemProps) {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <div className="flex items-center justify-between p-2 shadow-lg cursor-pointer w-full">
            <div className="flex items-center flex-1 min-w-0">
                <div className="flex-shrink-0">
                    <Image
                        className="w-15 h-15 rounded-lg object-cover"
                        src={image}
                        alt={name}
                        width={100}
                        height={100}
                        onLoad={() => {
                            setIsLoading(false);
                        }}
                    />
                    <Loading loading={isLoading} />
                </div>

                <div className="mx-2 tracking-wide flex-1 min-w-0">
                    <h1 className="text-sm font-bold truncate">{name}</h1>
                    <p className="text-xs truncate text-taupe-300">{description}</p>
                    <p className="text-xs truncate text-taupe-300">{categories}</p>
                </div>
            </div>

            <div className="flex-shrink-0 text-sm font-semibold whitespace-nowrap pl-2 text-right">
                <span
                    className={`flex flex-col ${discount ? "line-through text-xs text-taupe-400" : "font-bold text-sm text-taupe-200"}`}
                >
                    {!discount && `${quantity} x`} $ {price} Birr
                </span>
                {discount && (
                    <span className="font-bold text-sm text-taupe-200 block">
                        {quantity} x $ {price - price * discount} Birr
                    </span>
                )}
            </div>

            <div className="ml-2">
                <Button style="secondary" icon={<FontAwesomeIcon icon={faTrash} color="red" />}
                    onClick={() => { removeFromCart(id) }} />
            </div>
        </div>
    );
}
