<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="mb-5" aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a
          @click.prevent="goToPrePage(pages.current_page)"
          :class="{ 'disabledPreNext disabled': pages.current_page === 1 }"
          aria-hidden="true"
          class="page-link bi bi-chevron-double-left mx-1"
          href="#"
        ></a>
      </li>

      <li v-for="page in pages.total_pages" :key="page" class="page-item">
        <a
          @click.prevent="updatePage(page)"
          :class="{ 'currentPageStyle disabled': page === pages.current_page }"
          class="page-link mx-1"
          href="#"
          >{{ page }}</a
        >
      </li>

      <li class="page-item">
        <a
          @click.prevent="goToNextPage(pages.current_page)"
          :class="{
            'disabledPreNext disabled':
              pages.current_page === pages.total_pages,
          }"
          class="page-link bi bi-chevron-double-right mx-1"
          href="#"
        ></a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["pages"],
  methods: {
    updatePage(page) {
      this.$emit("emit-pages", page);
    },
    goToPrePage(currentPage) {
      const page = currentPage - 1;
      this.$emit("emit-pages", page);
    },
    goToNextPage(currentPage) {
      const page = currentPage + 1;
      this.$emit("emit-pages", page);
    },
  },
};
</script>

<style lang="scss" scoped>
.page-link {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  text-align: center;
  color: #727272;
  border: none;
}

.page-item:first-child .page-link {
  border-radius: 50%;
}

.page-item:last-child .page-link {
  border-radius: 50%;
}

.page-link:hover {
  color: #000;
  outline: 1px auto #727272;
}

.currentPageStyle {
  background-color: #000000ae;
  color: #fff;
  cursor: default;
}

.currentPageStyle:hover {
  background-color: #000000ae;
  color: #fff;
  cursor: default;
  outline: none;
}

.page-link:focus-visible {
  outline: 1px auto #000000ae;
}

.disabledPreNext {
  color: #b8b8b8;
  cursor: default;
  background-color: #fff;
}
</style>
