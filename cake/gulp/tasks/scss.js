import dartSass from 'sass'; // кампилятор
import gulpSass from 'gulp-sass'; // плагин гауп-сасс
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; // Сжатие CSs файла
import webpcss from 'gulp-webpcss'; // Вывод WEBP изображений. Для корректной работы требуется установить webp-converter@2.2.3
import autoprefixer from 'gulp-autoprefixer'; // Добавление вендорных префиксов (кросбраузерность)
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Групировка медиа запросов в css
const sass = gulpSass(dartSass);


export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })))
        .pipe(
            sass({
            outputStyle: 'expanded' // изначальный стиль готового файла
        }))
        .pipe(
            app.plugins.if(
                app.isBuild,
                groupCssMediaQueries() // Групировка медиа запросов
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpcss({
                    webpClass: ".webp", //если браузер поддерживает webp то будет добавляться класс .webp
                    noWebpClass: ".no-webp"
                 })
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoprefixer({
                    grid: true, // включаем поддержку grid
                    overrideBrowserslist: ["last 3 versions"], // указываем версию браузера (три версии назад);
                    cascade: true
                })
            )
        )
        // Раскоментировать если нужен не сжатый дубль файла стилей
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleanCss()
            )
        )
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream())
}
