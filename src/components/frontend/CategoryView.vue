<template>
  <div class="bg-light">
    <main
      class="mx-auto categoryWrap py-4 px-1 d-flex flex-wrap col-12 col-sm-9 col-lg-9 justify-content-center align-items-center"
    >
      <router-link
        v-for="item in categoryList"
        :key="item.name"
        :to="`/user-products/${item.veleafy_vegetable}`"
        data-aos="zoom-in"
        data-aos-duration="600"
        class="categoryLink text-secondary col col-sm"
      >
        <img class="categoryImg" :src="item.img" alt="leafy_vegetable_img" />

        <p class="mb-0 d-none d-md-block">
          {{ item.name }}
        </p>
        <p class="mb-0 smFontSize d-block d-md-none">
          {{ item.name }}
        </p>
      </router-link>
    </main>
  </div>
</template>
<script>
import leafy_vegetableImg from "@/assets/img/leafy_vegetable.png";
import melon_root_bulbImg from "@/assets/img/melon_root_bulb.png";
import mushroomImg from "@/assets/img/mushroom.png";
import fruitImg from "@/assets/img/fruit.png";
import spiceImg from "@/assets/img/spice.png";
export default {
  data() {
    return {
      categoryList: [
        {
          name: "葉菜",
          type: "leafy_vegetable",
          img: leafy_vegetableImg,
        },
        {
          name: "瓜果根球莖",
          type: "melon_root_bulb",
          img: melon_root_bulbImg,
        },
        { name: "菇菌", type: "mushroom", img: mushroomImg },
        { name: "水果", type: "fruit", img: fruitImg },
        { name: "辛香料", type: "spice", img: spiceImg },
      ],
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
  min-width: 90px;
}

.categoryLink:hover {
  border-radius: 6px;
  background-color: #f9c40637;
  color: #000 !important;
  filter: brightness(1.1);
}

.smFontSize {
  font-size: 14px;
}
</style>
