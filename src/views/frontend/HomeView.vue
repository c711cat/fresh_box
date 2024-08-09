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
  <CategoryView></CategoryView>
  <!-- 暢銷商品 -->
  <div class="d-flex justify-content-center mt-5">
    <div class="row mx-0 mb-5 pb-3 pt-4 col-11 justify-content-center">
      <h3
        class="writeStyle m-0 col-1"
        data-aos="fade-in"
        data-aos-easing="ease-out-sine"
        data-aos-duration="1500"
      >
        暢銷商品
        <div class="straightLine writeStyle mt-3 ms-2"></div>
      </h3>

      <div class="col col-md-11 col-xl-9 row m-0 justify-content-center">
        <div
          v-for="(item, index) in bestSellerProducts"
          :key="item.id"
          class="pt-4 mb-4 col-10 col-sm-6 col-md-6 col-lg-3 col-xl"
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
                NT$ {{ $filters.currency(item.origin_price) }}
              </div>
              <div class="text-end">
                NT$ {{ $filters.currency(item.price) }}
              </div>
            </div>
            <button
              @click="addCart(item)"
              class="w-100 my-3 btn btn-light shadow rounded-0"
              type="button"
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row col-12 mx-0 justify-content-center align-items-center">
    <img
      class="newsImg object-fit-cover col-lg-12 p-0"
      data-aos="fade-zoom-in"
      data-aos-easing="ease-out-circ"
      data-aos-duration="2000"
      src="@/assets/img/home_img2.jpg"
      alt="homeImg"
    />
    <router-link
      to="/user-products"
      class="newsContent text-decoration-none text-black col-11 col-sm-9 col-lg-8 col-xl-6 d-flex flex-column justify-content-center align-items-center"
      data-aos="zoom-in"
      data-aos-easing="ease-out-sine"
      data-aos-duration="900"
    >
      <div class="fs-1 fw-lighter mb-3">全館滿千免運</div>
      <div class="fs-4 fw-lighter text-center mb-3">
        結帳代入
        <span class="border border-secondary px-2 py-1">10%off</span>
        享 9 折優惠
      </div>
      <div class="goShopping fw-lighter fs-5">去 逛 逛</div>
    </router-link>
  </div>

  <div class="py-5 col-12">
    <div class="mx-auto col-11 py-5">
      <div class="row my-0 mx-auto flex-row-reverse col-11">
        <h3
          class="writeStyle m-0 p-0 col-1"
          data-aos="fade-in"
          data-aos-easing="ease-out-sine"
          data-aos-duration="1500"
        >
          <div class="straightLine writeStyle mt-3 me-2"></div>
          精選商品
        </h3>
        <SwiperImgs
          class="mx-auto overflow-x-hidden pt-3 col-10"
          data-aos="fade-up"
          data-aos-easing="ease-out-sine"
          data-aos-duration="800"
        ></SwiperImgs>
      </div>
    </div>
  </div>
</template>
<script>
import CategoryView from "@/components/frontend/CategoryView.vue";
import SwiperImgs from "@/components/frontend/SwiperImgs.vue";
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
          title: "無籽黑葡萄",
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
  components: { CategoryView, SwiperImgs },
  inject: ["emitter"],
  methods: {
    addCart(item) {
      const addItem = { product_id: item.id, qty: 1 };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .post(api, { data: addItem })
        .then((res) => {
          if (res.data.success) {
            this.$pushMsg.status200(res, "已加入購物車");
            this.emitter.emit("updateProductInCart");
          } else {
            this.$pushMsg.status200(res, "加入購物車失敗");
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
.homeImg {
  width: 100%;
  height: 100vh;
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

.bestSellersImg {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.bestSellersImg:hover {
  box-shadow: 0px 8px 10px rgba(36, 35, 35, 0.511) !important;
}

.newsImg {
  height: 300px;
}

.newsContent {
  height: 250px;
  background-color: rgba(252, 251, 251, 0.832);
  position: absolute;
}

.goShopping {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.newsContent:hover {
  box-shadow: 0px 8px 10px rgba(36, 35, 35, 0.511);
}

.newsContent:hover .goShopping {
  opacity: 1;
}
</style>
