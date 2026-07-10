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
    discountStart?: Date;
    discountEnd?: Date;
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
        <div className="flex items-center justify-between p-2 shadow-lg cursor-pointer w-full">
            <div className="flex items-center flex-1 min-w-0">
                <div className="relative w-15 h-15 flex-shrink-0 flex items-center justify-center overflow-hidden rounded-lg">
                    <Image
                        className="w-full h-full object-cover"
                        src={image}
                        alt={name}
                        width={100}
                        height={100}
                        onLoad={() => setIsLoading(false)}
                        onError={() => setIsLoading(false)}
                    />
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-taupe-100 dark:bg-taupe-900">
                            <Loading loading={isLoading} />
                        </div>
                    )}
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
                    $ {price} Birr
                </span>
                {discount && (
                    <span className="font-bold text-sm text-taupe-200 block">
                        $ {price - price * (discount / 100)} Birr
                    </span>
                )}
            </div>
        </div>
    );
}
