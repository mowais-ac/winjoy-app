import {ReactNative,I18nManager }from 'react-native';
// import RNRestart from 'react-native-restart';
import I18n from 'react-native-i18n';
import AsyncStorage from "@react-native-async-storage/async-storage"

// Import all locales
import en from '../locales/en.json';
import ar from '../locales/ar.json';

// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Define the supported translations
I18n.translations = {
    ar,
    en,
};



export function strings(name, params = {}) {
    
    return I18n.t(name, params);
};

export default I18n;