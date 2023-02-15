import i18n from "i18next";
// import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";

import translationEn from './translation.en';
import translationKo from './translation.ko';
// import translationJa from './translation.ja';
// import translationCh from "./translation.ch";

const resources = {
    en: {
        translation: translationEn
    },
    ko: {
        translation: translationKo
    }
    // ja: {
    //     translation: translationJa
    // }
};

i18n
    // .use(detector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",
        fallbackLng: 'en',
        debug:true,
        keySeparator: false, // we do not use keys in form messages.welcome
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

//브라우저 DB에 기록된 언어가 있으면 해당 언어를 불러온다.
let language = localStorage.getItem("language");
if (language !== null) { i18n.changeLanguage(language); }

export default i18n;