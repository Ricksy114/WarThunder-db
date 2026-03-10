/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Local images from /public are always allowed — no extra config needed.
    // This entry is here as a reminder; remove or extend if you add remote URLs.
    remotePatterns: [],
  },
};

export default nextConfig;
