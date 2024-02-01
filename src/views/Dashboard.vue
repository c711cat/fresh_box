<!-- eslint-disable vue/multi-word-component-names -->
<template><div>dashboard</div></template>
<script>
import Cookie from "js-cookie";

export default {
  data() {
    return {};
  },
  created() {
    const token = Cookie.get("freshBoxToken");
    this.$http.defaults.headers.common["Authorization"] = token;
    const api = `${process.env.VUE_APP_API}api/user/check`;
    this.$http.post(api).then((res) => {
      console.log(res);
    });
  },
};
</script>
