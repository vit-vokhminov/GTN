import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// дока
// https://www.robinwieruch.de/react-internationalization

let lang = "";
if (localStorage.getItem("i18nextLng")) {
    lang = localStorage.getItem("i18nextLng");
} else {
    lang = "en";
}

i18n
    // Подключение бэкенда i18next
    .use(Backend)
    // Автоматическое определение языка
    .use(LanguageDetector)
    // модуль инициализации
    .use(initReactI18next)
    .init({
        // Стандартный язык
        react: {
            useSuspense: false,
        },
        fallbackLng: lang,
        debug: false,
        // Распознавание и кэширование языковых кук
        detection: {
            order: ["queryString", "cookie"],
            cache: ["cookie"],
        },
        interpolation: {
            escapeValue: true,
        },
    });

export default i18n;
