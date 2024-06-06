<template>
  <Loading v-if="isLoading"></Loading>
  <div
    v-else
    class="listContainer mx-auto d-flex flex-column justify-content-between col-12 col-xl-10"
  >
    <div class="mb-5">
      <h3 v-if="noResults" class="pt-4 ps-5">{{ noResultsContent }}</h3>
      <div
        v-for="(item, index) in orderList"
        :key="index"
        class="accordion m-0"
        id="accordionPanelsUserOrderList"
      >
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              @click="open"
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="`#accordion-collapse-collapse` + `${index}`"
              aria-expanded="true"
              :aria-controls="`accordion-collapse-collapse` + `${index}`"
            >
              訂單日期 {{ turnDate(item.create_at) }}
            </button>
          </h2>
          <div
            :id="`accordion-collapse-collapse` + `${index}`"
            class="accordion-collapse collapse show"
          >
            <div class="accordion-body pt-4">
              <Order :oneOrder="item"></Order>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Pagination v-if="pageSwitch" :pages="pagination" @emit-pages="getOrders">
    </Pagination>
  </div>
</template>
<script>
import Collapse from "bootstrap/js/dist/collapse";
import Order from "@/components/Order.vue";
import Pagination from "@/components/Pagination.vue";

export default {
  data() {
    return {
      isLoading: false,
      orderList: {},
      pagination: {},
      searchContent: null,
    };
  },
  inject: ["emitter"],
  components: { Order, Pagination },
  methods: {
    getOrders(page = 1) {
      this.orderList = {};
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/orders?page=${page}`;
      this.$http
        .get(api)
        .then((res) => {
          this.orderList = { ...res.data.orders };
          this.pagination = res.data.pagination;
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    turnDate(date) {
      return new Date(date * 1000).toLocaleString("taiwan", { hour12: false });
    },
  },
  computed: {
    noResults() {
      return Object.values(this.orderList).length === 0;
    },
    noResultsContent() {
      let text = "";
      if (this.searchContent) {
        text = "查無此收件人姓名";
      }
      if (this.searchContent === null) {
        text = "無訂單";
      }
      return text;
    },
    pageSwitch() {
      return this.searchContent === null;
    },
  },

  created() {
    this.getOrders();
    const collapseElementList = document.querySelectorAll(".collapse");
    this.orderList = [...collapseElementList].map(
      (collapseEl) => new Collapse(collapseEl)
    );
    this.emitter.on("orderSearchResult", (SearchResult) => {
      this.searchContent = SearchResult[0];
      this.orderList = [];
      this.orderList = SearchResult.data;
    });
    this.emitter.on("orderSearchNull", () => {
      this.getOrders();
      this.searchContent = null;
    });
  },
};
</script>

<style lang="scss" scoped>
.accordion-button {
  background-color: #f8f9fa;
  color: #6c757d;
}

.accordion-button:not(.collapsed) {
  background-color: #000;
  color: #ccaf3c;
  font-weight: bolder;
}

.accordion-button:not(.collapsed):hover {
  color: #f9c406;
}

.accordion-button:hover {
  color: #212529;
}

.listContainer {
  margin-top: 120px;
  min-height: 76vh;
}

.accordion-button::after {
  content: none;
}
</style>
