import { createI18n } from "vue-i18n";
import zh from "@/i18n/locales/zh";
import en from "@/i18n/locales/en";
import ar from "@/i18n/locales/ar";
import de from "@/i18n/locales/de";
import es from "@/i18n/locales/es";
import fr from "@/i18n/locales/fr";
import ja from "@/i18n/locales/ja";
import ko from "@/i18n/locales/ko";
import pt from "@/i18n/locales/pt";
import ru from "@/i18n/locales/ru";
import th from "@/i18n/locales/th";
import tr from "@/i18n/locales/tr";
import zhHK from "@/i18n/locales/zhHK";

const i18n = createI18n({
  locale: localStorage.getItem("lang") || "zhHK",
  legacy: false, // 设为true或者不设置
  messages: {
    zh,
    en,
    ar,
    de,
    es,
    fr,
    ja,
    ko,
    pt,
    ru,
    th,
    tr,
    zhHK
  },
});
export default i18n;
