<template>
  <div class="listContainer mx-auto mb-5 px-4">
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
</template>
<script>
import Collapse from "bootstrap/js/dist/collapse";
import Order from "@/components/Order.vue";
import Pagination from "@/components/Pagination.vue";

export default {
  data() {
    return {
      orderList: {},
      pagination: {},
      pageSwitch: true,
    };
  },
  inject: ["emitter"],
  components: { Order, Pagination },
  methods: {
    getOrders(page = 1) {
      this.orderList = {};
      this.pageSwitch = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/orders?page=${page}`;
      this.$http.get(api).then((res) => {
        this.orderList = { ...res.data.orders };
        this.pagination = res.data.pagination;
      });
    },
    turnDate(date) {
      return new Date(date * 1000).toLocaleString("taiwan", { hour12: false });
    },
  },
  created() {
    this.getOrders();
    const collapseElementList = document.querySelectorAll(".collapse");
    this.orderList = [...collapseElementList].map(
      (collapseEl) => new Collapse(collapseEl)
    );
    this.emitter.on("orderSearchResult", (data) => {
      this.pageSwitch = false;
      this.orderList = [];
      this.orderList = data;
    });
    this.emitter.on("orderSearchNull", () => {
      this.getOrders();
    });
  },
};
</script>

<style lang="scss" scoped>
.accordion-button {
  background-color: rgba(248, 249, 250, 1);
  color: #a59b72;
}

.accordion-button:not(.collapsed) {
  background-color: #000;
  color: #ccaf3c;
  font-weight: bolder;
}
.accordion-button:hover {
  color: #f9c406;
}

.listContainer {
  padding-top: 120px;
  max-width: 1300px;
}

.accordion-button::after {
  content: none;
}
</style>
