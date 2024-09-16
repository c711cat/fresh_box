<template>
  <div class="d-flex">
    <Swiper
      style="padding: 0px 35px"
      class="d-flex align-items-center m-0"
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
        '750': {
          slidesPerView: 3,
          spaceBetween: 45,
        },
        '900': {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <SwiperSlide v-for="(item, index) in bestSellerProducts" :key="item.id">
        <div
          data-aos="fade-up"
          data-aos-duration="800"
          :data-aos-delay="index * 100"
          @click="goToProductPage(item.id)"
          class="productItem my-3"
        >
          <img
            class="bestSellersImg"
            :srcset="`${item.imgUrl}&w=350`"
            alt="bestSellerImg"
          />
          <div>
            <div class="p-2 fs-5 fw-bold text-black">
              {{ item.title }}
            </div>
            <div class="px-2 text-black">
              {{ item.content }}
            </div>
            <div class="d-flex p-2 flex-wrap align-items-center">
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
                class="mb-0 btn btn-light shadow addBtn"
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
      bestSellerProducts: [
        {
          title: "台灣水蜜桃",
          imgUrl:
            "https://images.unsplash.com/photo-1595124245030-41448b199d6d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          content: "600g±10% / 盒",
          origin_price: 600,
          price: 500,
          id: "-NsfVCnYqjTKonXqR4cO",
        },
        {
          title: "無籽黑葡萄",
          imgUrl:
            "https://images.unsplash.com/photo-1601275868399-45bec4f4cd9d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          content: "1.8kg±10% / 盒",
          origin_price: 699,
          price: 569,
          id: "-Nsg6Th1g1I7OzbPJF1g",
        },
        {
          title: "空運櫻桃",
          imgUrl:
            "https://images.unsplash.com/photo-1595657241488-468423581c23?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          content: "1kg±10% / 盒",
          origin_price: 1200,
          price: 1000,
          id: "-NsfbLG9v4NLUQwba1YJ",
        },
        {
          title: "蘆筍",
          imgUrl:
            "https://images.unsplash.com/photo-1626132661889-4058c6f9508f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          content: "200g±10% / 盒",
          origin_price: 150,
          price: 120,
          id: "-Ntoe6-WbDJY9ChStYOs",
        },
      ],
      status: {
        addLoadingItem: "",
        delLoadingItem: "",
      },
      currentWidth: 1000,
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
    goToProductPage(id) {
      this.$router.push(`/product/${id}`);
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
    getCurrentWidth() {
      this.currentWidth = window.innerWidth;
    },
  },
  created() {
    this.getCurrentWidth();
  },
};
</script>

<style lang="scss" scoped>
.productItem:hover {
  cursor: pointer;
}
.bestSellersImg {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.productItem:hover .bestSellersImg {
  box-shadow: 0px 8px 10px rgba(36, 35, 35, 0.511) !important;
}

.addBtn {
  width: 100%;
}

.productItem:hover .addBtn {
  background-color: #ccaf3c;
  border: 1px solid #ccaf3c;
}

.productItem .addBtn:hover {
  background-color: #d4bb59;
  border: 1px solid #d1b750;
}

:root .swiper-button-next,
.swiper-button-prev {
  --swiper-navigation-size: 20px;
}

.swiper-button-next {
  position: absolute;
  right: 0px;
}

.swiper-button-prev {
  position: absolute;
  left: 0px;
}

:root .swiper-button-next:hover,
.swiper-button-prev:hover {
  color: #ccaf3c !important;
}
</style>
