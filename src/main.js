/* eslint-disable vue/multi-word-component-names */
import { createApp } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Loading from "@/components/Loading.vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap-icons/font/bootstrap-icons.css";
import { currency, changeDateStyle } from "./methods/filters";
import vSelect from "vue-select";

const app = createApp(App);
app.config.globalProperties.$filters = { currency, changeDateStyle };
app.use(VueAxios, axios);
app.use(router);
app.component("Loading", Loading);
app.component("v-select", vSelect);
app.mount("#app");
