import { createApp } from "vue";
// import vconsole from 'vconsole';
import App from "./App.vue";
import router from "@/router/index";
import { callAppMethod } from "@/utils/JSBridge";
import vant from "vant";
import "vant/lib/index.css";
import "element-plus/dist/index.css";
import "@packages/assets/style/index.scss";
import store from "@/store";
import i18n from "@/i18n";
import "@/utils/window.ts";
import VueLuckyCanvas from "@lucky-canvas/vue";
import ElementPlus from "element-plus";
// console.log('vue', Vue);
// new vconsole();
function helloCallback(payload: any) {
  console.log("native回调", payload);
}
// js bridge
callAppMethod({
  method: "hello",
  params: {
    name: "vite",
  },
  callback: helloCallback,
});

const app = createApp(App);
app.use(router);
app.use(store);
app.use(i18n);
app.use(vant);
app.use(ElementPlus);
app.use(VueLuckyCanvas);
app.mount("#app");
