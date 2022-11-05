// Подключаем основной модуль
import gulp from "gulp";
// импорт путей
import { path } from "./cake/gulp/config/path.js";
// Импорт общих плагинов
import { plugins } from "./cake/gulp/config/plugins.js";

// Передаем значние в глобальную переменную
// process.argv которая хранит в себе флаг
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins

}

// Импорт задач
import { copy } from "./cake/gulp/tasks/copy.js";
import { reset } from "./cake/gulp/tasks/reset.js";
import { html } from "./cake/gulp/tasks/html.js";
import { server } from "./cake/gulp/tasks/server.js";
import { scss } from "./cake/gulp/tasks/scss.js";
import { js } from "./cake/gulp/tasks/js.js";
import { images } from "./cake/gulp/tasks/images.js";
import { otfToTft, ttfToWoff, fontsStyle } from "./cake/gulp/tasks/fonts.js";
import { svgSprit } from "./cake/gulp/tasks/svgSprit.js";
import { zip } from "./cake/gulp/tasks/zip.js";
import { ftp } from "./cake/gulp/tasks/ftp.js";


// Наблюдатель за изменениями в файлах
const watcher = () => {
    // для того чтобы при любом изменении в проекте, они (изменения) попадали сразу на ftp сервер
    // необходимо вместо:
    // copy, html, scss, js, images прописать gulp.series(copy, ftp) и т.д. для каждого
    gulp.watch(path.watch.files, {delay: 3000}, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

export { svgSprit }

// Последовательная обработка шрифтов
// series - последовательно
const fonts = gulp.series(otfToTft, ttfToWoff, fontsStyle);

// Основные задачи
// series - последовательно
// parallel - паралельное выполнение
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images))

// Построение сценариев выполнения задач
// parallel - паралельное выполнение
// series - последовательно
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, svgSprit, zip);
const deployFTP = gulp.series(reset, mainTasks, svgSprit, ftp);

// Экспорт сценариев чтобы их было видно из вне
export { dev }
export { build }
export { deployZIP }
export { deployFTP }

// Выполнение сценария по умолчанию
gulp.task('default', dev);
