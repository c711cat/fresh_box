<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="row m-0 py-2 ps-4 footerContainer fw-light">
    <div class="row m-0 align-items-center justify-content-between col-12">
      <router-link
        to="/"
        class="text-decoration-none textStyle fs-5 logoStyle col-12 col-sm-6"
      >
        FRESH BOX
      </router-link>

      <div
        class="col-12 col-sm-6 row m-0 align-items-center justify-content-between p-0 flex-wrap"
      >
        <div style="min-width: 145px" class="text-sm-end py-2 col">
          <router-link
            to="/dashboard/login"
            class="text-decoration-none rounded-pill text-center adminLogin py-2 px-4"
          >
            後台登入
          </router-link>
        </div>

        <a
          class="text-center text-sm-end col-auto"
          href="https://github.com/c711cat/fresh_box"
        >
          <i class="bi bi-github fs-1"></i>
        </a>
      </div>
    </div>
    <div class="row m-0 col-12">
      <span class="col-sm-auto">此網站為個人作品展示，非商業用途</span>
      <div class="textStyle fs-6 col-sm">© 2024 FRESH BOX</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footerContainer {
  background-color: #34343411;
}

.textStyle {
  font-family: "Times New Roman", Times, serif;
}

.logoStyle {
  color: #212529;
}

.bi-github {
  color: #212529;
}

.bi-github:hover,
.logoStyle:hover {
  cursor: pointer;
  color: rgb(249, 196, 6);
}

.adminLogin {
  border: 1px solid black;
  color: #d0d0d0;
  background-color: black;
}

.adminLogin:hover {
  cursor: pointer;
  background-color: rgb(249, 196, 6);
  border: 1px solid rgb(249, 196, 6);
  color: #212529;
}
</style>
