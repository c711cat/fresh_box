<template>
  <div>
    <AdminNavbar />
  </div>

  <div>
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
  methods: {
    getToken() {
      const token = Cookie.get("freshBoxToken");
      this.$http.defaults.headers.common["Authorization"] = token;
      this.checkSignIn();
    },
    checkSignIn() {
      const api = `${process.env.VUE_APP_API}v2/api/user/check`;
      this.$http
        .post(api)
        .then(() => {})
        .catch((error) => {
          this.$pushMsg.status404(error.response, error.response.data.message);
          this.$router.push("/login");
        });
    },
  },
  created() {
    this.getToken();
  },
};
</script>
