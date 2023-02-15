import i18n from "i18next";
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";

import translationEn from './translation.en';
import translationKo from './translation.ko';
import translationJa from './translation.ja';
import translationCn from "./translation.cn";
import translationEs from "./translation.es";
import translationFr from "./translation.fr";
import translationVi from "./translation.vi";
import translationTh from "./translation.th";
import translationId from "./translation.id";
import translationRu from "./translation.ru";
import translationDe from "./translation.de";
import translationIt from "./translation.it";

const resources = {
    en: {
        translation: translationEn
    },
    ko: {
        translation: translationKo
    },
    ja: {
        translation: translationJa
    },
    cn:{
        translation: translationCn
    },
    es:{
        translation: translationEs
    },
    fr:{
        translation: translationFr
    },
    vi:{
        translation: translationVi
    },
    th:{
        translation: translationTh
    },
    id:{
        translation: translationId
    },
    ru:{
        translation: translationRu
    },
    de:{
        translation: translationDe
    },
    it:{
        translation: translationIt
    }
};

i18n
    .use(detector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        // lng: "en",
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