<template>
  <div class="col-12 col-xl-10 mx-auto mb-5 px-3">
    <div class="p-1 mb-2 text-end">
      <button @click="openDelModal" class="btn btn-danger" type="button">
        刪除全部訂單
      </button>
    </div>
    <div
      v-for="(item, index) in orderList"
      :key="index"
      class="accordion m-0"
      id="accordionPanelsAdminOrderList"
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
          <div class="accordion-body">
            <Order :oneOrder="item"></Order>
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
    </div>
  </div>
  <Pagination :pages="pagination" @emit-pages="getOrders"></Pagination>
  <delModal
    ref="delModal"
    :order="tempOrder"
    @del-order="delOrder"
    :allOrders="true"
    @del-all-orders="delAllOrders"
  ></delModal>
</template>

<script>
import Collapse from "bootstrap/js/dist/collapse";
import Order from "@/components/Order.vue";
import delModal from "@/components/DelModal.vue";
import Pagination from "@/components/Pagination.vue";

export default {
  data() {
    return {
      orderList: {},
      tempOrder: {},
      pagination: {},
    };
  },
  components: { Order, delModal, Pagination },
  methods: {
    getOrders(page = 1) {
      this.orderList = {};
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      this.$http.get(api).then((res) => {
        this.orderList = { ...res.data.orders };
        this.pagination = res.data.pagination;
      });
    },
    openDelModal(item) {
      this.tempOrder = { ...item };
      this.$refs.delModal.showModal();
    },
    delOrder(order) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${order.id}`;
      this.$http.delete(api).then((res) => {
        this.$pushMsg(res, "刪除訂單");
        if (res.data.success) {
          this.$refs.delModal.hideModal();
        } else {
          return;
        }
        window.location.reload();
      });
    },
    turnDate(date) {
      return new Date(date * 1000).toLocaleString("taiwan", { hour12: false });
    },
    delAllOrders() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders/all`;
      this.$http.delete(api).then((res) => {
        console.log(res);
        this.$refs.delModal.hideModal();
      });
    },
  },
  created() {
    this.getOrders();
    const collapseElementList = document.querySelectorAll(".collapse");
    this.orderList = [...collapseElementList].map(
      (collapseEl) => new Collapse(collapseEl)
    );
  },
};
</script>

<style lang="scss" scoped>
.accordion-button {
  color: #000000a6;
}

.accordion-button:not(.collapsed) {
  background-color: rgba(248, 249, 250);
  color: #000000a6;
  font-weight: bolder;
}

.accordion-button:hover {
  color: black;
}
</style>
