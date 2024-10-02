<template>
  <div class="bg-light">
    <Swiper
      class="swiper mx-auto py-4 px-1 d-flex flex-wrap col-12 col-lg-9 justify-content-center align-items-center"
      :modules="modules"
      :freeMode="true"
      :slides-per-view="5"
      :space-between="10"
      :grabCursor="true"
      :pagination="{
        clickable: true,
        el: '.swiper-pagination',
      }"
      :scrollbar="false"
      :breakpoints="{
        '0': {
          slidesPerView: 1,
        },
        '220': {
          slidesPerView: 2,
        },
        '320': {
          slidesPerView: 3,
        },
        '420': {
          slidesPerView: 4,
        },
        '500': {
          slidesPerView: 5,
        },
      }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <SwiperSlide
        v-for="item in categoryList"
        :key="item.name"
        class="mb-2 d-flex jusitify-content-center"
      >
        <router-link
          data-aos="zoom-in"
          data-aos-duration="600"
          :to="`/user-products/${item.name}`"
          class="categoryLink py-2 px-1 text-secondary text-decoration-none d-flex flex-column justify-content-center align-items-center col-4 col-sm"
        >
          <img class="categoryImg mb-1" :src="item.img" alt="category_img" />

          <p class="mb-0">
            {{ item.name }}
          </p>
        </router-link>
      </SwiperSlide>
      <div class="swiper-pagination"></div>
    </Swiper>
  </div>
</template>
<script>
import leafyVegetableImg from '@/assets/img/leafy_vegetable.png'
import melonRootBulbImg from '@/assets/img/melon_root_bulb.png'
import mushroomImg from '@/assets/img/mushroom.png'
import fruitImg from '@/assets/img/fruit.png'
import spiceImg from '@/assets/img/spice.png'
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
export default {
  data () {
    return {
      categoryList: [
        {
          name: '葉菜',
          type: 'leafy_vegetable',
          img: leafyVegetableImg
        },
        {
          name: '瓜果根球莖',
          type: 'melon_root_bulb',
          img: melonRootBulbImg
        },
        { name: '菇菌', type: 'mushroom', img: mushroomImg },
        { name: '水果', type: 'fruit', img: fruitImg },
        { name: '辛香料', type: 'spice', img: spiceImg }
      ],
      modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay]
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  methods: {
    onSwiper () {},
    onSlideChange () {}
  }
}
</script>
<style lang="scss" scoped>
.categoryImg {
  width: 50px;
}

.categoryLink {
  min-width: 90px;
}

.categoryLink:hover {
  width: 100%;
  color: #000 !important;
  font-weight: bolder;
  filter: brightness(1.3);
}

.swiper-slide {
  justify-content: center;
}

.swiper {
  --swiper-pagination-color: #ccaf3c;
}
</style>
