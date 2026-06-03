import Sidebar from "@/components/menu/sidebar";

export default function AuthenticatedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative min-h-full min-w-full">
            <Sidebar />
            {children}
        </div>
    );
}
