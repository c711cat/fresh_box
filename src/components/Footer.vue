<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="row m-0 py-2 ps-4 bg-light fw-light">
    <div class="row m-0 align-items-center justify-content-between col-12">
      <div class="col-12 col-sm-6">
        <router-link
          to="/"
          class="text-decoration-none text-dark textStyle fs-5 logoStyle"
        >
          FRESH BOX
        </router-link>
      </div>

      <div
        class="col-12 col-sm-6 row m-0 align-items-center justify-content-between p-0 flex-wrap"
      >
        <div style="min-width: 145px" class="text-sm-end py-2 col">
          <router-link
            to="/login"
            class="text-decoration-none rounded-1 text-center bg-black text-light py-2 px-3 adminLogin"
          >
            後台
          </router-link>
        </div>

        <a
          class="text-center text-sm-end col-auto"
          href="https://github.com/c711cat/fresh_box"
        >
          <i class="bi bi-github text-dark fs-1"></i>
        </a>
      </div>
    </div>
    <div class="row m-0 col-12 textSize">
      <span class="col-auto"> 此網站為個人作品展示，非商業用途。 </span>
      <div class="col-auto">
        <a
          class="text-decoration-none"
          target="_blank"
          href="https://icons8.com/icons/collections/x6c5ehv2qqdv25m8idkq"
        >
          category
        </a>
        icons by
        <a
          class="text-decoration-none"
          target="_blank"
          href="https://icons8.com"
        >
          Icons8
        </a>
      </div>
      <div class="textStyle col-auto">© 2024 FRESH BOX</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.textStyle {
  font-family: "Times New Roman", Times, serif;
}

.logoStyle:hover,
.bi-github:hover {
  color: #ccaf3c !important;
}

.adminLogin:hover {
  background-color: #ccaf3c !important;
  color: black !important;
}

.textSize {
  font-size: 15px;
}
</style>
