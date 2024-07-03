<template>
  <Loading v-if="isLoading"></Loading>
  <div v-else class="my-5 pt-5 mx-auto col-11 col-md-10 col-lg-8">
    <div class="my-4 text-center">
      <h3 class="mb-0">常見問題</h3>
    </div>

    <div class="accordion" id="accordionPanelsStayOpenExample">
      <div
        v-for="(item, index) in QA_List"
        :key="index"
        class="accordion-item border border-0"
      >
        <h2 class="accordion-header border border-0">
          <button
            class="accordion-button border-bottom"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#QA_List` + `${index}`"
            aria-expanded="true"
            :aria-controls="`QA_List` + `${index}`"
          >
            <strong>Q{{ item.num }}. {{ item.title }}</strong>
          </button>
        </h2>
        <div :id="`QA_List` + `${index}`" class="accordion-collapse collapse">
          <div class="accordion-body border-bottom">
            <p class="overflow-x-auto mb-3">A : {{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Collapse from "bootstrap/js/dist/collapse";
export default {
  data() {
    return {
      QA_List: {},
      isLoading: false,
    };
  },
  methods: {
    getQAList() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/articles?page=1`;
      this.$http.get(api).then((res) => {
        this.QA_List = res.data.articles;
        this.isLoading = false;
      });
    },
  },
  created() {
    this.getQAList();
    const collapseElementList = document.querySelectorAll(".collapse");
    this.QA_List = [...collapseElementList].map(
      (collapseEl) => new Collapse(collapseEl)
    );
  },
};
</script>
<style lang="scss" scoped>
.accordion-button:hover {
  color: #ccaf3c !important;
}

.accordion-button:not(.collapsed) {
  background-color: #f8f9fa;
  color: #000;
  font-weight: bolder;
}
</style>
