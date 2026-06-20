import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import Loading from "./loadingComponent";

type MenuItemProps = {
    name: string;
    price: number;
    image: StaticImageData;
    description?: string;
    categories: string;
    discount?: number;
};

export default function MenuItem({
    name,
    price,
    image,
    description,
    categories,
    discount,
}: MenuItemProps) {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <div className="flex items-center justify-between p-2 shadow-lg cursor-pointer">
            <div className="flex items-center">
                <div>
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
                <div className="mx-2 tracking-wide">
                    <h1 className="text-sm font-bold">{name}</h1>
                    <p className="text-xs">{description}</p>
                    <p className="text-xs">{categories}</p>
                </div>
            </div>
            <div>
                <span
                    className={`flex flex-col ${discount ? "text line-through text-xs text-taupe-400" : "font-bold text-sm text-taupe-200"}`}
                >
                    $ {price} Birr
                </span>
                {discount && (
                    <span className="font-bold text-sm text-taupe-200">
                        $ {price - price * discount} Birr
                    </span>
                )}
            </div>
        </div>
    );
}
