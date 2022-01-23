import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import en from '../../locales/en.json';
import ar from '../../locales/ar.json'
console.log("en",en.Change_language);
// the translations
// (tip move them in a JSON file and import them)
const resources = {
    en: {
        translation: 
          en,        
    },
    ar: {
        translation: 
            ar,
    },
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        compatibilityJSON: 'v3',
        resources,
        lng: I18nManager.isRTL ? 'ar' : 'en',

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;