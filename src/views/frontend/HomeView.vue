<template>
  <img
    src="@/assets/img/1.jpg"
    class="homeImg"
    alt="homeImg"
    data-aos="fade-in"
    data-aos-easing="ease-out-sine"
    data-aos-duration="2000"
  />

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
.homeImg {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}
</style>
