<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Navbar></Navbar>
  <div>
    <Messages></Messages>
    <router-view />
  </div>
</template>

<script>
import Cookie from "js-cookie";
import Navbar from "../components/Navbar.vue";
import emitter from "@/methods/emitter";
import Messages from "@/components/Messages.vue";

export default {
  data() {
    return {};
  },
  provide() {
    return {
      emitter,
    };
  },
  components: { Navbar, Messages },
  created() {
    const token = Cookie.get("freshBoxToken");
    this.$http.defaults.headers.common["Authorization"] = token;
    const api = `${process.env.VUE_APP_API}api/user/check`;
    this.$http.post(api).then((res) => {
      if (!res.data.success) {
        this.$router.push("/dashboard/login");
      }
    });
  },
};
</script>
