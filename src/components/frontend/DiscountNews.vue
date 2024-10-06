<template>
  <main>
    <div
      class="position-relative d-flex justify-content-center align-items-center"
      data-aos="fade-zoom-in"
      data-aos-easing="ease-out-circ"
      data-aos-duration="2000"
    >
      <img
        :srcset="`https://images.unsplash.com/photo-1644292916478-bd7139c5d8a1?q=80&w=${currentWidth}&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`"
        alt="banner-2_img"
      />
      <router-link
        to="/user-products"
        class="rounded newsContent px-1 text-decoration-none text-black col-11 col-sm-9 col-lg-8 col-xl-6 d-flex flex-column justify-content-center align-items-center"
        data-aos="zoom-in"
        data-aos-easing="ease-out-sine"
        data-aos-duration="900"
      >
        <p class="mb-0 fw-bold mb-3 text-center newsTitle">全 館 滿 千 免 運</p>
        <p class="fw-bold text-center mb-4 newsText">
          結帳代入
          <span class="border border-secondary rounded px-1 py-1 fw-bold me-1">
            10%off
          </span>
          享 9 折優惠
        </p>
        <p
          class="text-center fw-bold mb-0 bg-primary border border-primary px-4 py-1 rounded goShopping"
        >
          去 逛 逛 吧 !
        </p>
      </router-link>
    </div>
  </main>
</template>
<script>
export default {
  data() {
    return { currentWidth: 1000 }
  },
  methods: {
    getCurrentWidth() {
      this.currentWidth = window.innerWidth
    },
  },
  created() {
    this.getCurrentWidth()
  },
}
</script>
<style lang="scss" scoped>
img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.newsContent {
  position: absolute;
  height: 250px;
  background-color: rgba(252, 251, 251, 0.832);
}

.newsContent:hover {
  filter: brightness(1.1);
}

.newsTitle {
  font-size: clamp(26px, 4vw, 40px);
}

.newsText {
  font-size: clamp(22px, 4vw, 28px);
}

.goShopping {
  font-size: clamp(18px, 2.5vw, 24px);
}

.newsContent .goShopping:hover {
  background-color: #d4bb59 !important;
  border: 1px solid #d1b750 !important;
}
</style>
