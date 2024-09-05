<template>
  <main>
    <div
      class="position-relative d-flex justify-content-center align-items-center"
    >
      <img
        class="newsImg object-fit-cover col-12 p-0"
        data-aos="fade-zoom-in"
        data-aos-easing="ease-out-circ"
        data-aos-duration="2000"
        src="@/assets/img/home_img2.jpg"
        alt="homeImg"
      />
      <router-link
        to="/user-products"
        class="newsContent px-1 text-decoration-none text-black col-11 col-sm-9 col-lg-8 col-xl-6 d-flex flex-column justify-content-center align-items-center"
        data-aos="zoom-in"
        data-aos-easing="ease-out-sine"
        data-aos-duration="900"
      >
        <div class="fs-1 fw-bold mb-3">全 館 滿 千 免 運</div>
        <p class="fs-4 fw-bold text-center mb-4">
          結帳代入
          <span class="border border-secondary rounded px-1 py-1 fw-bold me-1">
            10%off
          </span>
          享 9 折優惠
        </p>
        <p
          class="fw-bold fs-5 mb-0 bg-primary border border-primary px-4 py-1 rounded goShopping"
        >
          去 逛 逛 吧 !
        </p>
      </router-link>
    </div>
  </main>
</template>
<style lang="scss" scoped>
.newsImg {
  height: 300px;
}

.newsContent {
  position: absolute;
  height: 250px;
  background-color: rgba(252, 251, 251, 0.832);
}

.newsContent:hover {
  filter: brightness(1.1);
}

.newsContent .goShopping:hover {
  background-color: #d4bb59 !important;
  border: 1px solid #d1b750 !important;
}
</style>
