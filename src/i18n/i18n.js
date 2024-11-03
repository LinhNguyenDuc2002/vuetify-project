import { createI18n } from 'vue-i18n';
import English from './locales/en';
import VietNam from './locales/vi';

const messages = {
  en: English,

  vi: VietNam
};

const I18n = createI18n({
  locale: 'vi',
  messages,
});

export default I18n;