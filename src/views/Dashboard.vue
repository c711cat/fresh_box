<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Navbar></Navbar>
  <div class="container-fluid"><router-view /></div>
</template>

<script>
import Cookie from "js-cookie";
import Navbar from "../components/Navbar.vue";

export default {
  data() {
    return {};
  },
  components: { Navbar },
  created() {
    const token = Cookie.get("freshBoxToken");
    this.$http.defaults.headers.common["Authorization"] = token;
    const api = `${process.env.VUE_APP_API}api/user/check`;
    this.$http.post(api).then((res) => {
      console.log(res);
      if (!res.data.success) {
        this.$router.push("/login");
      }
    });
  },
};
</script>
