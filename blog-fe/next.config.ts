import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "buffbasket-us.backendless.app"},
      { protocol: "https", hostname: "media.istockphoto.com"}
    ]
  }
};

export default nextConfig;
