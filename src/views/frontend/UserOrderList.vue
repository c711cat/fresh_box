<template>
  <LoadingView v-if="isLoading" />
  <main
    v-else
    class="listContainer mx-auto d-flex flex-column justify-content-between col-12 col-xl-10"
  >
    <div class="mb-5">
      <h3 v-if="noResults" class="pt-4 ps-5">{{ noResultsContent }}</h3>
      <section
        v-for="(item, index) in orderList"
        :key="item.id"
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
              :data-bs-target="`#accordion-collapse-collapse${index}`"
              aria-expanded="true"
              :aria-controls="`accordion-collapse-collapse${index}`"
            >
              訂單日期 {{ turnDate(item.create_at) }}
            </button>
          </h2>
          <div
            :id="`accordion-collapse-collapse${index}`"
            class="accordion-collapse collapse show"
          >
            <div class="accordion-body pt-4">
              <OrderView :oneOrder="item" class="mb-3"></OrderView>
              <div class="col-12 col-lg-3 col-xxl-2 ms-auto text-end px-3">
                <button
                  v-if="!item.is_paid"
                  @click="toPay(item.id)"
                  class="w-100 btn btn-primary"
                  type="button"
                >
                  確認付款
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <footer>
      <PaginationView
        v-if="pageSwitch"
        :pages="pagination"
        @emit-pages="getOrders"
      >
      </PaginationView>
    </footer>
  </main>
</template>
<script>
import Collapse from "bootstrap/js/dist/collapse";
import OrderView from "@/components/OrderView.vue";
import PaginationView from "@/components/PaginationView.vue";

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
  components: { OrderView, PaginationView },
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
    toPay(orderId) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${orderId}`;
      this.isLoading = true;
      this.$http
        .post(api)
        .then((res) => {
          if (res.data.success) {
            this.$pushMsg.status200(res, "付款成功");
            this.getOrders();
          } else {
            this.$pushMsg.status200(res, "付款失敗");
          }
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
  mounted() {
    const collapseElementList = document.querySelectorAll(".collapse");
    this.orderList = [...collapseElementList].map(
      (collapseEl) => new Collapse(collapseEl)
    );
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
