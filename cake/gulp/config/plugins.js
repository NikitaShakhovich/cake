import plumber from "gulp-plumber"; // Обработка ошибок
import notify from "gulp-notify"; // Сообщение (подсказки всплывающие)
import browsersync from "browser-sync"; // Локальный сервер
import newer from "gulp-newer" // Проверяет изменилась ли картинка
import  ifPlugin from "gulp-if" // Условное ветвление

// Экспортируем объекты
export  const plugins = {
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    if: ifPlugin
}

