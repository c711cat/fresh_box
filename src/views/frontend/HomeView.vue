<template>
  <div
    class="position-relative bannerImg d-flex justify-content-center"
    data-aos="fade-in"
    data-aos-easing="ease-out-sine"
    data-aos-duration="2000"
  >
    <div
      class="fastGoBox position-absolute rounded py-5 px-3 text-center col-11 col-sm-11 col-md-9"
    >
      <p class="bannerText text-light fw-bold">新 鮮 食 材 更 有 好 味 道</p>
      <p class="bannerText text-light fw-bold">當 季 蔬 果 熱 賣 中</p>
      <router-link
        to="/user-products"
        class="btn btn-primary btn-lg"
        role="button"
      >
        快速前往購物吧
      </router-link>
    </div>
    <div
      class="scrollBox w-100 py-2 px-3 position-absolute d-flex justify-content-center"
    >
      <i class="arrowDown text-white fs-1 bi-arrow-down-circle-fill"></i>
    </div>
  </div>

  <!-- 商品類別 -->
  <CategoryView class="mb-5" />
  <!-- 暢銷商品 -->
  <section class="mx-auto mb-5 col-11 col-xl-9">
    <h3
      class="mb-3 border-bottom border-dark"
      data-aos="fade-in"
      data-aos-easing="ease-out-sine"
      data-aos-duration="1500"
    >
      暢銷商品
    </h3>
    <BestSellers />
  </section>
  <!-- 優惠消息 -->
  <section class="mb-5 col-12">
    <DiscountNews />
  </section>
  <!-- 精選商品 -->
  <section class="mx-auto mb-5 col-11 col-xl-9">
    <h3
      class="mb-3 border-bottom border-dark"
      data-aos="fade-in"
      data-aos-easing="ease-out-sine"
      data-aos-duration="1500"
    >
      精選商品
    </h3>
    <SwiperImgs
      class="mx-auto overflow-x-hidden"
      data-aos="fade-up"
      data-aos-easing="ease-out-sine"
      data-aos-duration="800"
    />
  </section>
</template>
<script>
import CategoryView from "@/components/frontend/CategoryView.vue";
import BestSellers from "@/components/frontend/BestSellers.vue";
import SwiperImgs from "@/components/frontend/SwiperImgs.vue";
import DiscountNews from "@/components/frontend/DiscountNews.vue";
export default {
  data() {
    return {};
  },
  components: { CategoryView, BestSellers, DiscountNews, SwiperImgs },
};
</script>

<style lang="scss" scoped>
.bannerImg {
  background-image: url(@/assets/img/1.jpg);
  height: 100vh;
  background-size: cover;
  background-position: center;
}
.homeImg {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}

.fastGoBox {
  bottom: 30%;
  background-color: #0000004d;
}

.fastGoBox:hover {
  filter: brightness(1.3);
}

.bannerText {
  font-size: clamp(24px, 4vw, 40px);
}

.scrollBox {
  height: 250px;
  bottom: 0px;
}

.arrowDown {
  position: absolute;
  top: 0px;
  animation-name: arrow;
  animation-duration: 5s;
  animation-iteration-count: infinite;
}

@keyframes arrow {
  0% {
    top: 0px;
    opacity: 1;
  }

  100% {
    top: 200px;
    opacity: 0;
  }
}
</style>
