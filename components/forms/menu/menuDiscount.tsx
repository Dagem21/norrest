import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import useApiFetch from "@/hooks/useAPIFetch";
import { ToastContext } from "@/providers/toastProvider";
import menuItemUpdateSchema from "@/yup/menu/menuItemUpdate";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function DiscountMenuItemForm({
    order,
    onFinish,
}: {
    order: any;
    onFinish: () => void;
}) {
    const toaster = useContext(ToastContext);
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        resolver: yupResolver(menuItemUpdateSchema),
        mode: "onChange",
        defaultValues: {
            _id: order?._id,
            discount: order?.discount,
            discountStart:
                order?.discountStart?.slice(0, 16) || new Date().toISOString().slice(0, 16),
            discountEnd: order?.discountEnd?.slice(0, 16),
        },
    });

    const {
        data,
        fetchData,
        isLoading,
        errors: errorsUpdate,
    } = useApiFetch(
        {
            url: "/api/at/menu",
            method: "PUT",
        },
        false,
    );

    const handleRegister = (data: any) => {
        const formData = new FormData();
        formData.append("id", data?._id);
        formData.append("discount", data?.discount);
        formData.append("discountStart", new Date(data?.discountStart).toISOString());
        formData.append("discountEnd", new Date(data?.discountEnd).toISOString());

        fetchData({ data: formData });
    };

    useEffect(() => {
        if (!isLoading && data) {
            const toast = {
                message: "Discount added to menu.",
                type: "success",
            };
            toaster?.addToast(toast);
            onFinish();
            reset();
        } else if (!isLoading && errorsUpdate?.details) {
            const toast = {
                message: errorsUpdate?.details?.response?.data?.error || errorsUpdate?.message,
                type: "error",
            };
            toaster?.addToast(toast);
        }
    }, [data, isLoading, errorsUpdate]);

    return (
        <form
            onSubmit={handleSubmit(handleRegister)}
            className="max-w-md mx-auto flex flex-col gap-4"
        >
            <div>
                <label htmlFor="price" className="block mb-2 text-xs">
                    Discount
                </label>
                <Input
                    type="number"
                    placeholder="1 - 100"
                    {...register("discount")}
                    error={errors?.discount}
                    start="%"
                    min={1}
                    max={100}
                />
            </div>

            <div>
                <label htmlFor="price" className="block mb-2 text-xs">
                    Start Date
                </label>
                <Input
                    type="datetime-local"
                    placeholder="Type here..."
                    {...register("discountStart")}
                    error={errors?.discountStart}
                />
            </div>

            <div>
                <label htmlFor="price" className="block mb-2 text-xs">
                    End Date
                </label>
                <Input
                    type="datetime-local"
                    placeholder="Type here..."
                    {...register("discountEnd")}
                    error={errors?.discountEnd}
                />
            </div>

            <Button type="submit" text="Set discount" isLoading={isLoading} />
        </form>
    );
}
