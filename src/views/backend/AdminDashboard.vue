<template>
  <div class="navContainer">
    <AdminNavbar></AdminNavbar>
  </div>

  <div class="viewContainer">
    <router-view />
  </div>
</template>

<script>
import Cookie from "js-cookie";
import AdminNavbar from "@/components/backend/AdminNavbar.vue";

export default {
  data() {
    return {};
  },
  components: { AdminNavbar },
  created() {
    const token = Cookie.get("freshBoxToken");
    this.$http.defaults.headers.common["Authorization"] = token;
    const api = `${process.env.VUE_APP_API}api/user/check`;
    this.$http
      .post(api)
      .then((res) => {
        if (!res.data.success) {
          this.$router.push("/login");
        }
      })
      .catch((error) => {
        this.$pushMsg.status404(error.response.data.message);
      });
  },
};
</script>

<style lang="scss" scoped>
.navContainer {
  margin-bottom: 100px;
}
</style>
