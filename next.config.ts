import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/signup",
        destination: "https://app.sigilix.ai",
        permanent: false,
      },
      {
        source: "/signup/:path*",
        destination: "https://app.sigilix.ai/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
