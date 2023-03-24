import i18n from "i18next";
// import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationAR from "../src/assets/tranlations/ar.json";
import translationEN from "../src/assets/tranlations/en.json";

const fallbackLng = ["ar"];
const availableLanguages = ["en", "ar"];

const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAR,
  },
};

i18n
//   .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",

    detection: {
      checkWhitelist: true,
    },

    debug: false,

    whitelist: availableLanguages,

    interpolation: {
      escapeValue: true,
    },
  });

export default i18n;
