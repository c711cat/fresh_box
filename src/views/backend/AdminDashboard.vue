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
  },
  created() {
    this.getToken();
  },
};
</script>
