<template>
  <div
    ref="Modal"
    class="modal fade"
    id="deleteModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <header class="modal-header bg-danger">
          <h5 class="modal-title text-white">再次確認</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </header>
        <section class="modal-body">
          <p class="fw-bolder">{{ delText }}</p>
          <p class="fw-bolder" v-if="tempOrder.id">{{ delItemId }}</p>
          <p class="fw-bolder" v-if="tempOrder.id">{{ delItemTime }}</p>
        </section>
        <footer class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-dark"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button @click="delItem" type="button" class="btn btn-danger">
            確定刪除
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
import ModalMixin from '@/mixins/modalMixin'

export default {
  data() {
    return {
      modal: {},
      tempProduct: {},
      tempCoupon: {},
      tempOrder: {},
      tempQA: {},
    }
  },
  props: {
    product: {
      type: Object,
      default() {
        return {}
      },
    },
    coupon: {
      type: Object,
      default() {
        return {}
      },
    },
    order: {
      type: Object,
      default() {
        return {}
      },
    },
    QA: {
      type: Object,
      default() {
        return {}
      },
    },
    allCartItems: {},
    allOrders: {},
    pages: {},
  },
  methods: {
    turnDate(date) {
      return new Date(date * 1000).toLocaleString('taiwan', { hour12: false })
    },
    delItem() {
      if (this.coupon.id) {
        this.$emit('del-coupon', this.tempCoupon)
      }
      if (this.tempProduct.id) {
        this.$emit('del-product', this.tempProduct, this.pages.current_page)
      }
      if (this.tempOrder.id) {
        this.$emit('del-order', this.tempOrder, this.pages.current_page)
      }
      if (this.allOrders) {
        this.$emit('del-all-orders')
      }
      if (this.allCartItems) {
        this.$emit('del-all-items-of-Cart')
      }
      if (this.QA.id) {
        this.$emit('del-QA', this.tempQA)
      }
    },
  },
  watch: {
    product() {
      this.tempProduct = this.product
    },
    coupon() {
      this.tempCoupon = this.coupon
    },
    order() {
      this.tempOrder = this.order
    },
    QA() {
      this.tempQA = this.QA
    },
  },
  mixins: [ModalMixin],
  computed: {
    delText() {
      if (this.coupon.id) {
        return `確定刪除『 ${this.coupon.title} 』這張優惠券？`
      }
      if (this.tempOrder.id) {
        return '確定刪除這張訂單？'
      }
      if (this.allOrders) {
        return '確定刪除全部訂單？'
      }
      if (this.allCartItems) {
        return '確定刪除購物車中全部的品項？'
      }
      if (this.tempProduct.id) {
        return `確定刪除『 ${this.tempProduct.title} 』這個產品？`
      }
      if (this.tempQA.id) {
        return `確定刪除『 ${this.tempQA.title} 』這個問答？`
      } else {
        return ''
      }
    },
    delItemId() {
      if (this.tempOrder) {
        return `訂單編號： ${this.tempOrder.id}`
      } else {
        return ''
      }
    },
    delItemTime() {
      if (this.tempOrder) {
        return `訂單時間： ${this.turnDate(this.tempOrder.create_at)}`
      } else {
        return ''
      }
    },
  },
}
</script>
