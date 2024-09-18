<template>
  <LoadingView v-if="isLoading" />
  <main
    v-else
    class="mx-auto mb-5 containerWrap d-flex flex-column col-12 col-xl-10"
  >
    <div>
      <header>
        <div v-if="noResults" class="mt-5 text-center">
          <h3>共搜尋到 {{ orderList.length }} 筆訂單</h3>
          <p class="fs-3 fw-bold">
            {{ noResultsContent }}
          </p>
        </div>

        <div v-else class="p-1 mb-2">
          <h3 v-if="searchContent" class="text-center">
            共搜尋到 {{ orderList.length }} 筆相符的訂單
          </h3>
          <div class="text-end">
            <button
              @click="openDelAllOrdersModal"
              class="btn btn-danger"
              type="button"
            >
              刪除全部訂單
            </button>
          </div>
        </div>
      </header>

      <section class="accordion m-0" id="accordionPanelsAdminOrderList">
        <div
          v-for="(item, index) in orderList"
          :key="item.id"
          class="accordion-item"
        >
          <h2 class="accordion-header">
            <button
              @click="open"
              class="accordion-button text-black"
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
            class="accordion-collapse collapse"
          >
            <div class="accordion-body">
              <OrderView :oneOrder="item"></OrderView>
              <div class="text-end pe-5">
                <button
                  @click="openDelModal(item)"
                  class="btn btn-danger"
                  type="button"
                >
                  刪除訂單
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

  <delModal
    ref="delModal"
    :order="tempOrder"
    @del-order="delOrder"
    :allOrders="allOrders"
    @del-all-orders="delAllOrders"
    :pages="pagination"
  >
  </delModal>
</template>

<script>
import Collapse from "bootstrap/js/dist/collapse";
import OrderView from "@/components/OrderView.vue";
import delModal from "@/components/DelModal.vue";
import PaginationView from "@/components/PaginationView.vue";

export default {
  data() {
    return {
      isLoading: false,
      orderList: {},
      tempOrder: {},
      pagination: {},
      allOrders: false,
      searchContent: null,
    };
  },
  inject: ["emitter"],
  components: { OrderView, delModal, PaginationView },
  methods: {
    getOrders(page = 1) {
      this.orderList = {};
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      this.$http
        .get(api)
        .then((res) => {
          this.orderList = res.data.orders;
          this.pagination = res.data.pagination;
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    openDelModal(item) {
      this.allOrders = false;
      this.tempOrder = { ...item };
      this.$refs.delModal.showModal();
    },
    openDelAllOrdersModal() {
      this.allOrders = true;
      this.tempOrder = {};
      this.$refs.delModal.showModal();
    },
    delOrder(order, page) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${order.id}`;
      this.$http
        .delete(api)
        .then((res) => {
          if (res.data.success) {
            this.getOrders(page);
            this.$refs.delModal.hideModal();
            this.$pushMsg.status200(res, "已刪除訂單");
          } else {
            this.$pushMsg.status200(res, "刪除訂單失敗");
          }
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        });
    },
    turnDate(date) {
      return new Date(date * 1000).toLocaleString("taiwan", { hour12: false });
    },
    delAllOrders() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders/all`;
      this.$http
        .delete(api)
        .then((res) => {
          if (res.data.success) {
            this.$refs.delModal.hideModal();
            this.$pushMsg.status200(res, "成功刪除全部訂單");
          } else {
            this.$pushMsg.status200(res, "刪除全部訂單失敗");
          }
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        })
        .finally(() => {
          this.allOrdersSwitch = false;
          this.getOrders();
        });
    },
  },
  computed: {
    noResults() {
      return this.orderList.length === 0;
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
    this.emitter.on("adminOrderSearchResult", (searchResult) => {
      this.searchContent = searchResult[0];
      this.orderList = [];
      this.orderList = searchResult.data;
    });
    this.emitter.on("adminOrderSearchNull", () => {
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
.containerWrap {
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
