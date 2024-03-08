/* eslint-disable vue/multi-word-component-names */
import { createApp } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Loading from "@/components/Loading.vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap-icons/font/bootstrap-icons.css";
import { currency } from "./methods/filters";
// import { currency } from "./methods/filters";

const app = createApp(App);
app.config.globalProperties.$filters = { currency };
app.use(VueAxios, axios);
app.use(router);
app.component("Loading", Loading);
app.mount("#app");
