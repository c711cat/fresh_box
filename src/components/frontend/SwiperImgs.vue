<template>
  <div>
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
          spaceBetween: 45,
        },
      }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <SwiperSlide v-for="item in allProducts" :key="item.id">
        <div @click="goToProductPage(item.id)" class="productItem rounded my-3">
          <img
            class="img-fluid carouselImg rounded-top"
            :srcset="`${item.imageUrl}&w=330`"
            alt="carouselImg"
          />
          <div>
            <div class="p-2 fs-5 fw-bold text-black">
              {{ item.title }}
            </div>
            <div class="px-2 text-black">
              {{ item.content }}
            </div>
            <div class="priceContainer d-flex p-2 flex-wrap align-items-center">
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
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
export default {
  data() {
    return {
      allProducts: [],
      status: {
        addLoadingItem: '',
        delLoadingItem: '',
      },
      modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay],
    }
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  inject: ['emitter'],
  methods: {
    getAllProducts() {
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/products/all`
      this.$http
        .get(api)
        .then((res) => {
          this.allProducts = res.data.products
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response, '取得產品資料失敗')
        })
    },
    addCart(item) {
      const addItem = { product_id: item.id, qty: 1 }
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/cart`
      this.status.addLoadingItem = item.id
      this.$http
        .post(api, { data: addItem })
        .then(() => {
          this.$pushMsg.status200('已加入購物車')
          this.emitter.emit('updateProductInCart')
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response, '加入購物車失敗')
        })
        .finally(() => {
          this.status.addLoadingItem = ''
        })
    },
    goToProductPage(id) {
      this.$router.push(`/product/${id}`)
      if (this.$route.path !== '/') {
        setTimeout(() => {
          location.reload()
        }, 500)
      }
    },
    onSwiper() {},
    onSlideChange() {},
  },

  created() {
    this.getAllProducts()
  },
}
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
  height: 170px;
  object-fit: cover;
}

.priceContainer {
  height: 65px;
}

// 使用深層選擇器覆蓋 swiper 內建樣式
::v-deep .swiper-button-next,
::v-deep .swiper-button-prev {
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

// 使用深層選擇器覆蓋 swiper 內建樣式
::v-deep .swiper-button-next:hover,
::v-deep .swiper-button-prev:hover {
  color: #ccaf3c !important;
}
</style>
