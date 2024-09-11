<template>
  <LoadingView v-if="isLoading" />
  <main v-else class="userQAWrap mx-auto col-11 col-md-10 col-lg-8">
    <header class="my-4 text-center">
      <h3 class="mb-0">常見問題</h3>
    </header>

    <section class="accordion" id="accordionPanelsStayOpenExample">
      <div
        v-for="(item, index) in QA_List"
        :key="item.id"
        class="accordion-item border border-0"
      >
        <h2 class="accordion-header border border-0">
          <button
            class="accordion-button border-bottom rounded-0"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#QA_List${index}`"
            aria-expanded="true"
            :aria-controls="`QA_List${index}`"
          >
            <strong>Q{{ item.num }}. {{ item.title }}</strong>
          </button>
        </h2>
        <div :id="`QA_List${index}`" class="accordion-collapse collapse">
          <div class="accordion-body border-bottom">
            <p class="overflow-x-auto mb-3">A : {{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>
    <footer class="">
      <PaginationView :pages="pagination" @emit-pages="getQAList">
      </PaginationView>
    </footer>
  </main>
</template>
<script>
import Collapse from "bootstrap/js/dist/collapse";
import PaginationView from "@/components/PaginationView.vue";
export default {
  data() {
    return {
      QA_List: {},
      isLoading: false,
      pagination: {},
    };
  },
  components: { PaginationView },
  methods: {
    getQAList(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/articles?page=${page}`;
      this.$http
        .get(api)
        .then((res) => {
          this.pagination = res.data.pagination;
          this.QA_List = res.data.articles;
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getQAList();
  },
  mounted() {
    const collapseElementList = document.querySelectorAll(".collapse");
    this.QA_List = [...collapseElementList].map(
      (collapseEl) => new Collapse(collapseEl)
    );
  },
};
</script>
<style lang="scss" scoped>
.userQAWrap {
  margin-top: 120px;
}

.accordion-button:hover {
  color: #ccaf3c !important;
}

.accordion-button:not(.collapsed) {
  background-color: #f8f9fa;
  color: #000;
  font-weight: bolder;
}
</style>
