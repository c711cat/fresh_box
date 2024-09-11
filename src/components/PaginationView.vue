<template>
  <nav class="mb-5 py-3" aria-label="Page navigation">
    <ul class="pagination my-3 justify-content-center">
      <li class="page-item">
        <a
          @click.prevent="goToPrePage(pages.current_page)"
          :class="{
            'disabledPreNext disabled': pages.current_page === 1,
          }"
          aria-hidden="true"
          class="page-link text-black bi bi-chevron-double-left mx-1"
          href="#"
        ></a>
      </li>

      <li v-for="page in pages.total_pages" :key="page" class="page-item">
        <a
          @click.prevent="updatePage(page)"
          :class="{ 'currentPageStyle disabled': page === pages.current_page }"
          class="page-link text-black mx-1"
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
          class="page-link text-black bi bi-chevron-double-right mx-1"
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
  border: none;
}

.page-item:first-child .page-link {
  border-radius: 50%;
}

.page-item:last-child .page-link {
  border-radius: 50%;
}

.page-link:hover {
  background-color: #b8b8b85a;
}

.currentPageStyle {
  background-color: #000;
  color: #fff !important;
  cursor: default;
}

.page-link:focus-visible {
  outline: 1px auto #000;
}

.disabledPreNext {
  color: #b8b8b8 !important;
  cursor: default;
  background-color: #fff;
}
</style>
