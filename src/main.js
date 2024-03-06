/* eslint-disable vue/multi-word-component-names */
import { createApp } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Loading from "@/components/Loading.vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(VueAxios, axios);
app.use(router);
app.component("Loading", Loading);
app.mount("#app");
