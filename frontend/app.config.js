export default ({ config }) => ({
    ...config,
    extra: {
        ...config.extra,
        API_URL: process.env.API_URL ?? "http://10.0.2.2:8081/api",
    },
});