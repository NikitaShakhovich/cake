export const server = (done) => {
    app.plugins.browsersync.init({
        server: {
            baseDir: `${app.path.build.html}`
        },
        notify: false, // Убераем сообщения в браузере
        port: 3000,
    });
}
