import en from './en.js';
import zh from './zh.js';

export const dictionaries = {
  en,
  zh
};

export function getDictionary(lang) {
  return dictionaries[lang] || dictionaries.en;
}

export const supportedLanguages = ['en', 'zh'];

export function getLink(lang,path){
     return lang === 'en' ? path : `/${lang}/${path}`
}
export default { dictionaries, getDictionary, supportedLanguages,getLink };
