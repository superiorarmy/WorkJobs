/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        GOOGLE_MAPS_API_KEY: "AIzaSyDJay-e5_SameorjN6-Z0_yuGWtmXDpW8Y",
        MONGODB_URI:
            "mongodb+srv://debugger:debugger@cluster0.ezjbt6b.mongodb.net/?retryWrites=true&w=majority",
        GOOGLE_CLIENT_ID:
            "299919476468-m588ob5295eu2frdveqrgan8s7ia8a7g.apps.googleusercontent.com",
        GOOGLE_CLIENT_SECRET: "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",
    },
    images: {
        domains: [
            '"https://flowbite.s3.amazonaws.com',
            "lh3.googleusercontent.com",
        ],
    },
}

module.exports = nextConfig
