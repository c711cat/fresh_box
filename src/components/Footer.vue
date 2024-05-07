<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="row m-0 py-2 ps-4 footerContainer text-secondary fw-light">
    <div class="d-flex flex-wrap align-items-center col-12 my-0">
      <div class="d-flex align-items-center col-12 col-sm-8">
        <div class="textStyle fs-5 me-1 logoStyle">FRESH BOX</div>
        <div class="textStyle fs-6">© 2024</div>
      </div>
      <div class="text-center d-flex align-items-center col-12 col-sm-4">
        <div class="text-end col-auto col-sm-8 col-lg-10 adminLogin">
          後台登入
        </div>

        <i class="bi bi-github fs-1 ms-3"></i>
      </div>
    </div>
    <span class="col-12"> 此網站為個人作品展示，非商業用途 </span>
  </div>
</template>

<style lang="scss" scoped>
.footerContainer {
  background-color: #34343411;
}
.textStyle {
  font-family: "Times New Roman", Times, serif;
}

.copyRight {
  font-size: 16px;
}

.bi-github:hover,
.logoStyle:hover,
.adminLogin:hover {
  cursor: pointer;
  color: rgb(249, 196, 6);
}
</style>
