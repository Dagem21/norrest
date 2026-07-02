import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "blqvo3efyxolm4lk.public.blob.vercel-storage.com",
                port: "",
                pathname: "/**",
                search: "",
            },
        ],
    },
    allowedDevOrigins: ["192.168.227.139"],
};

export default nextConfig;
