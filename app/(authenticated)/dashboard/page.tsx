"use client";

export default function Dashboard() {
    return (
        <div className="flex flex-col flex-1 items-center font-sans">
            <div className="flex flex-col w-full h-screen">
                <div className="flex justify-center pb-2">
                    <div className="flex items-center overflow-x-auto">
                        <div className="flex gap-2 justify-between w-fit">
                            <div className="h-30 w-70 bg-taupe-200 dark:bg-taupe-600 rounded-lg">
                                asdf
                            </div>
                            <div className="h-30 w-70 bg-taupe-200 dark:bg-taupe-600 rounded-lg">
                                asdf
                            </div>
                            <div className="h-30 w-70 bg-taupe-200 dark:bg-taupe-600 rounded-lg">
                                asdf
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center gap-2 w-full">
                    <div className="h-70 w-screen sm:w-2/7 bg-taupe-200 dark:bg-taupe-600 rounded-lg">
                        aasdfsdf
                    </div>
                    <div className="h-70 w-screen sm:w-2/7 bg-taupe-200 dark:bg-taupe-600 rounded-lg">
                        aasdfsdf
                    </div>
                    <div className="h-70 w-screen sm:w-2/7 bg-taupe-200 dark:bg-taupe-600 rounded-lg">
                        aasdfsdf
                    </div>
                </div>
            </div>
        </div>
    );
}
