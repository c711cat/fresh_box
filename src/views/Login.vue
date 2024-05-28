<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container col-sm-8 col-md-7 col-lg-5">
    <form @submit.prevent="signIn" class="m-3">
      <h3 class="mb-3 border-2 pb-2 border-bottom border-secondary">
        請先登入
      </h3>
      <div class="mb-3">
        <label for="inputEmail">Email</label>
        <input
          v-model="user.username"
          type="email"
          id="inputEmail"
          class="form-control rounded-1"
          placeholder="name@example.com"
        />
      </div>
      <div class="mb-3">
        <label for="inputPassword">Password</label>
        <input
          v-model="user.password"
          type="password"
          id="inputPassword"
          class="form-control rounded-1"
          placeholder="Password"
        />
      </div>
      <div class="d-grid gap-2">
        <button
          class="btn btn-lg btn-primary btn-block rounded-1"
          type="submit"
        >
          登入
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  inject: ["emitter"],
  methods: {
    signIn() {
      const api = `${process.env.VUE_APP_API}admin/signin`;
      this.$http
        .post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            this.$pushMsg.status200(res, "登入成功");
            const token = res.data.token;
            const expired = new Date(res.data.expired);
            Cookies.set("freshBoxToken", token, { expires: expired });
            this.$router.push("/dashboard/admin's-products");
          } else {
            this.$pushMsg.status200(res, "登入失敗");
          }
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 150px;
}
</style>
