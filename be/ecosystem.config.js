module.exports = {
    apps: [
        {
            name: 'nhatrang-api-5000',
            script: './dist/index.js',
            watch: true,
            restart_delay: 50000,
        },
    ],
};
