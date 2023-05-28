/** @type {import("next").NextConfig} */
const config = {
    reactStrictMode: true,
    webpack: (config) => {
        config.infrastructureLogging = {
            level: "error",
        };

        return config;
    },
};

module.exports = config
