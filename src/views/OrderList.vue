<template>
  <div
    v-for="(item, index) in orderList"
    :key="index"
    class="accordion m-0"
    id="accordionPanelsStayOpenExample"
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
        class="accordion-collapse collapse"
      >
        <div class="accordion-body">
          <Order :OrderId="item.id"></Order>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Collapse from "bootstrap/js/dist/collapse";
import Order from "@/components/Order.vue";
export default {
  data() {
    return {
      orderList: {},
    };
  },
  components: { Order },
  methods: {
    getOrders(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/orders?page=${page}`;
      this.$http.get(api).then((res) => {
        this.orderList = { ...res.data.orders };
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
  },
};
</script>
