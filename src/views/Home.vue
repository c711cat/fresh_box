<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="mb-5">
    <img src="../assets/img/1.jpg" class="img-fluid homeImg" alt="homeImg" />
  </div>
  <div class="row m-0 ps-5 col-12 justify-content-center">
    <h3
      class="writeStyle bestSellTitle m-0 col-1"
      data-aos="fade-in"
      data-aos-easing="ease-out-sine"
      data-aos-duration="1500"
    >
      暢銷商品
      <div class="straightLine writeStyle mt-3 ms-2"></div>
    </h3>
    <!-- 暢銷商品 -->
    <div class="col col-md-10 col-xl-8 row m-0 justify-content-center">
      <div
        v-for="(item, index) in bestSellerProducts"
        :key="index"
        class="pt-4 mb-5 col-10 col-sm-6 col-md-6 col-lg-3 col-xl"
        data-aos="fade-up"
        data-aos-duration="800"
        :data-aos-delay="index * 100"
      >
        <router-link :to="`/product/${item.id}`" class="linkStyle">
          <img
            class="img-fluid bestSellersImg shadow-lg"
            :src="item.imgUrl"
            alt="bestSellerProductImg"
          />
        </router-link>
        <div>
          <div class="p-2 fs-5">{{ item.title }}</div>
          <div class="px-2">{{ item.content }}</div>
          <div class="d-flex p-2 justify-content-between">
            <div class="text-decoration-line-through text-secondary">
              NT$ {{ item.origin_price }}
            </div>
            <div class="text-end">NT$ {{ item.price }}</div>
          </div>
          <button
            class="w-100 my-3 btn btn-light shadow rounded-0"
            type="button"
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bestSellerProducts: [
        {
          title: "台灣水蜜桃",
          imgUrl:
            "https://images.unsplash.com/photo-1595124245030-41448b199d6d?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          content: "600g±10% / 盒",
          origin_price: 600,
          price: 500,
          id: "-NsfVCnYqjTKonXqR4cO",
        },
        {
          title: "空運無籽黑葡萄",
          imgUrl:
            "https://images.unsplash.com/photo-1601275868399-45bec4f4cd9d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          content: "1.8kg±10% / 盒",
          origin_price: 699,
          price: 569,
          id: "-Nsg6Th1g1I7OzbPJF1g",
        },
        {
          title: "空運櫻桃",
          imgUrl:
            "https://images.unsplash.com/photo-1595657241488-468423581c23?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          content: "1kg±10% / 盒",
          origin_price: 1200,
          price: 1000,
          id: "-NsfbLG9v4NLUQwba1YJ",
        },
        {
          title: "蘆筍",
          imgUrl:
            "https://images.unsplash.com/photo-1629875235136-737fef945cfd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          content: "200g±10% / 盒",
          origin_price: 150,
          price: 120,
          id: "-Ntoe6-WbDJY9ChStYOs",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
* {
  // border: 1px solid;
}
.homeImg {
  width: 100%;
  height: 1000px;
  object-fit: cover;
}

.writeStyle {
  writing-mode: vertical-lr;
}

.straightLine {
  width: 1px;
  background-color: black;
  height: 180px;
}

.bestSellTitle {
  width: 50px;
}

.bestSellersImg {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.bestSellersImg:hover {
  box-shadow: 0px 8px 10px rgba(36, 35, 35, 0.511) !important;
}
</style>
