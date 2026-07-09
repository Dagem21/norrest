import { categoryTypes } from "@/assets/enums/enum";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import useApiFetch from "@/hooks/useAPIFetch";
import { ToastContext } from "@/providers/toastProvider";
import menuItemSchema from "@/yup/menu/menuItem";
import ratingSchema from "@/yup/menu/rating";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function RatingForm({ rating, onFinish }: { rating: any; onFinish: () => void }) {
    const params = useParams<{ id: string }>();
    const toaster = useContext(ToastContext);
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        reset,
        watch,
    } = useForm({
        resolver: yupResolver(ratingSchema),
        mode: "onChange",
        defaultValues: {
            branchID: params?.id,
            rating: rating?.rating,
            comment: rating?.comment,
        },
    });

    const {
        data,
        fetchData,
        isLoading,
        errors: errorsAdd,
    } = useApiFetch(
        {
            url: "/api/at/rating",
            method: "POST",
        },
        false,
    );

    useEffect(() => {
        if (!isLoading && data) {
            const toast = {
                message: "Rating submitted. Thank you!",
                type: "success",
            };
            toaster?.addToast(toast);
            onFinish();
            reset();
        } else if (!isLoading && errorsAdd?.details) {
            const toast = {
                message: errorsAdd?.details?.response?.data?.error || errorsAdd?.message,
                type: "error",
            };
            toaster?.addToast(toast);
        }
    }, [data, isLoading, errorsAdd]);

    const currentRating = watch("rating");

    const handleRegister = (data: any) => {
        fetchData({
            data: { rating: data },
        });
    };

    return (
        <form
            onSubmit={handleSubmit(handleRegister)}
            className="max-w-md mx-auto flex flex-col gap-4"
        >
            <div>
                <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((starIdx) => {
                            const isActive = starIdx <= currentRating;

                            return (
                                <button
                                    key={starIdx}
                                    type="button"
                                    onClick={() =>
                                        setValue("rating", starIdx, { shouldValidate: true })
                                    }
                                    className="focus:outline-none transition-colors duration-150"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        fill={isActive ? "orange" : "white"}
                                    >
                                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                    </svg>
                                </button>
                            );
                        })}
                    </div>

                    {errors.rating && (
                        <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label htmlFor="comment" className="block mb-2 text-xs">
                    Comment
                </label>
                <textarea
                    className="w-full p-2 outline-none rounded-md accent-taupe-900 border border-gray-400 rounded-md transition duration-300 ease shadow-sm 
                        hover:border-slate-300 focus-within:border-slate-400 focus-within:shadow"
                    {...register("comment")}
                    rows={4}
                />
            </div>

            <Button type="submit" text="Submit rating" isLoading={isLoading} disabled={isLoading} />
        </form>
    );
}
