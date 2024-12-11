/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        middlewarePrefetch: true, // Попробуйте отключить это, если ошибка сохраняется
      },
};

export default nextConfig;
