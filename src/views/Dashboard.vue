<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="navContainer">
    <AdminNavbar></AdminNavbar>
  </div>

  <div class="viewContainer">
    <Messages></Messages>
    <router-view />
  </div>
</template>

<script>
import Cookie from "js-cookie";
import AdminNavbar from "../components/AdminNavbar.vue";
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
  components: { AdminNavbar, Messages },
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

<style lang="scss" scoped>
.navContainer {
  margin-bottom: 100px;
}
</style>
