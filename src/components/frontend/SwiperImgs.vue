<template>
  <div>
    <Swiper
      style="padding: 0px 35px"
      class="d-flex align-items-center"
      :modules="modules"
      :slides-per-view="5"
      :space-between="40"
      :grabCursor="true"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      :pagination="false"
      :scrollbar="false"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :breakpoints="{
        '0': {
          slidesPerView: 1,
          spaceBetween: 45,
        },
        '500': {
          slidesPerView: 2,
          spaceBetween: 45,
        },
        '800': {
          slidesPerView: 3,
          spaceBetween: 45,
        },
        '1200': {
          slidesPerView: 4,
          spaceBetween: 45,
        },
        '1400': {
          slidesPerView: 5,
          spaceBetween: 50,
        },
      }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <SwiperSlide v-for="item in allProducts" :key="item.id">
        <div @click="goToProductPage(item.id)" class="productItem rounded my-3">
          <img
            class="img-fluid carouselImg rounded-top"
            :src="item.imageUrl"
            alt="carouselImg"
          />
          <div>
            <div
              class="p-2 fs-5 text-black"
              :class="{ 'fs-6 fw-bold': currentWidth < 600 }"
            >
              {{ item.title }}
            </div>
            <div
              class="px-2 text-black"
              :class="{ 'smStyle fw-light': currentWidth < 600 }"
            >
              {{ item.content }}
            </div>
            <div
              :class="{ 'smStyle fw-light': currentWidth < 600 }"
              class="priceContainer d-flex p-2 flex-wrap align-items-center"
            >
              <div
                class="text-secondary col-12"
                :class="{
                  'text-decoration-line-through':
                    item.price !== item.origin_price,
                }"
              >
                NT$ {{ $filters.currency(item.origin_price) }}
              </div>
              <strong
                v-if="item.price !== item.origin_price"
                class="text-danger col-12"
              >
                NT$ {{ $filters.currency(item.price) }}
              </strong>
            </div>
            <div class="text-center pb-2">
              <button
                @click.stop="addCart(item)"
                :class="{ 'btn-sm': currentWidth < 600 }"
                class="mb-0 btn btn-light addBtn"
                type="button"
              >
                <div
                  v-if="item.id === status.addLoadingItem"
                  class="spinner-border text-light spinner-grow-sm"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
                <p v-else class="mb-0">加入購物車</p>
              </button>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <div class="swiper-button-prev text-dark"></div>
      <div class="swiper-button-next text-dark"></div>
    </Swiper>
  </div>
</template>
<script>
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
export default {
  data() {
    return {
      allProducts: [],
      currentWidth: "1000",
      status: {
        addLoadingItem: "",
        delLoadingItem: "",
      },
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const onSwiper = () => {};
    const onSlideChange = () => {};
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay],
    };
  },
  inject: ["emitter"],
  methods: {
    getAllProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.allProducts = res.data.products;
          }
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        });
    },
    addCart(item) {
      const addItem = { product_id: item.id, qty: 1 };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.status.addLoadingItem = item.id;
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
        })
        .finally(() => {
          this.status.addLoadingItem = "";
        });
    },
    isCurrentWidth() {
      this.currentWidth = window.innerWidth;
    },
    goToProductPage(id) {
      console.log(id);
      this.$router.push(`/product/${id}`);
      if (this.$route.path !== "/") {
        setTimeout(() => {
          location.reload();
        }, 500);
      }
    },
  },

  created() {
    this.isCurrentWidth();
    this.getAllProducts();
  },
};
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
}

.productItem {
  height: auto;
}

.productItem .addBtn {
  width: 100%;
}

.productItem:hover {
  cursor: pointer;
  box-shadow: 0px 0px 7px 0px #8f8f8f;
}

.productItem:hover .addBtn {
  width: 90%;
  background-color: #ccaf3c;
  border: 1px solid #ccaf3c;
}

.productItem .addBtn:hover {
  background-color: #d4bb59;
  border: 1px solid #d1b750;
}

.carouselImg {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.smStyle {
  font-size: 14px;
}

.priceContainer {
  height: 65px;
}

:root .swiper-button-next,
.swiper-button-prev {
  --swiper-navigation-size: 20px;
}

:root .swiper-button-next:hover,
.swiper-button-prev:hover {
  color: #ccaf3c !important;
}
</style>
