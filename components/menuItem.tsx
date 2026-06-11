import Image, { StaticImageData } from "next/image";

type MenuItemProps = {
    name: string;
    price: number;
    image: StaticImageData;
    categories: string;
};

export default function MenuItem({ name, price, image, categories }: MenuItemProps) {
    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex">
                <div>
                    <Image className="w-15 h-15 rounded-lg object-cover" src={image} alt={name} />
                </div>
                <div className="mx-2">
                    <h1 className="text-lg font-bold">{name}</h1>
                    <p className="text-sm">{categories}</p>
                </div>
            </div>
            <div>
                <span>${price}</span>
            </div>
        </div>
    );
}
