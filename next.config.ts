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
    allowedDevOrigins: ["192.168.232.77", "192.168.123.139"],
};

export default nextConfig;
