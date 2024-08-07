<template>
  <div
    class="categoryWrap bg-light-gray row m-0 flex-wrap justify-content-center align-items-center"
  >
    <router-link
      :to="`/user-products/${categoryList.veleafy_vegetable}`"
      data-aos="zoom-in"
      data-aos-duration="600"
      class="m-1 categoryLink text-secondary col-2 col-lg-1"
    >
      <img
        class="categoryImg"
        src="@/assets/img/leafy_vegetable.png"
        alt="leafy_vegetable_img"
      />

      <!-- md以上字體 -->
      <div
        class="d-none d-sm-none d-md-block d-lg-block d-xl-block d-xxl-block"
      >
        {{ categoryList.veleafy_vegetable }}
      </div>

      <!-- sm以下字體 -->
      <div
        class="smFontSize d-block d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none"
      >
        {{ categoryList.veleafy_vegetable }}
      </div>
    </router-link>
    <router-link
      :to="`/user-products/${categoryList.melon_root_bulb}`"
      data-aos="zoom-in"
      data-aos-duration="600"
      class="m-1 categoryLink text-secondary col-2 col-lg-1"
    >
      <img
        class="categoryImg"
        src="@/assets/img/melon_root_bulb.png"
        alt="melon_root_bulb_img"
      />
      <div
        class="d-none d-sm-none d-md-block d-lg-block d-xl-block d-xxl-block"
      >
        {{ categoryList.melon_root_bulb }}
      </div>
      <!-- sm以下字體 -->
      <div
        class="smFontSize d-block d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none"
      >
        {{ categoryList.melon_root_bulb }}
      </div>
    </router-link>
    <router-link
      :to="`/user-products/${categoryList.mushroom}`"
      data-aos="zoom-in"
      data-aos-duration="600"
      class="m-1 categoryLink text-secondary col-2 col-lg-1"
    >
      <img
        class="categoryImg"
        src="@/assets/img/mushroom.png"
        alt="mushroom_img"
      />
      <div
        class="d-none d-sm-none d-md-block d-lg-block d-xl-block d-xxl-block"
      >
        {{ categoryList.mushroom }}
      </div>
      <!-- sm以下字體 -->
      <div
        class="smFontSize d-block d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none"
      >
        {{ categoryList.mushroom }}
      </div>
    </router-link>
    <router-link
      :to="`/user-products/${categoryList.fruit}`"
      data-aos="zoom-in"
      data-aos-duration="600"
      class="m-1 categoryLink text-secondary col-2 col-lg-1"
    >
      <img class="categoryImg" src="@/assets/img/fruit.png" alt="fruit_img" />
      <div
        class="d-none d-sm-none d-md-block d-lg-block d-xl-block d-xxl-block"
      >
        {{ categoryList.fruit }}
      </div>
      <div
        class="smFontSize d-block d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none"
      >
        {{ categoryList.fruit }}
      </div>
    </router-link>
    <router-link
      :to="`/user-products/${categoryList.spice}`"
      data-aos="zoom-in"
      data-aos-duration="600"
      class="m-1 categoryLink text-secondary col-2 col-lg-1"
    >
      <img class="categoryImg" src="@/assets/img/spice.png" alt="spice_img" />
      <div
        class="d-none d-sm-none d-md-block d-lg-block d-xl-block d-xxl-block"
      >
        {{ categoryList.spice }}
      </div>
      <div
        class="smFontSize d-block d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none"
      >
        {{ categoryList.spice }}
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      categoryList: {
        veleafy_vegetable: "葉菜",
        melon_root_bulb: "瓜果根球莖",
        mushroom: "菇菌",
        fruit: "水果",
        spice: "辛香料",
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.categoryWrap {
  padding: 10px 0px;
}

.categoryImg {
  width: 50px;
  margin-bottom: 6px;
}

.categoryLink {
  padding: 5px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

.categoryLink:hover {
  border-radius: 5%;
  background-color: rgba(249, 196, 6, 0.292);
  color: #000 !important;
}

.smFontSize {
  font-size: 12px;
}
</style>
