import svgSprite from "gulp-svg-sprite";

export const svgSprit = () => {
    return app.gulp.src(`${app.path.src.svgicons}`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SVG",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(svgSprite({
            mode: {
                stack: {
                    // Спрайт создастся в папке по адресу...
                    sprite: `../icons/icons.svg`,
                    // Создавать страницу с перечнм иконок
                    example: true
                }
            },
        }))
        .pipe(app.gulp.dest(`${app.path.build.images}`));
}
