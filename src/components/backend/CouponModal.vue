<template>
  <div
    ref="Modal"
    class="modal fade"
    id="admin'sCouponModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <header class="modal-header ps-4">
          <h5 v-if="tempCoupon.id" class="modal-title">編輯優惠券</h5>
          <h5 v-else class="modal-title">新增優惠券</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </header>
        <div class="modal-body ms-3">
          <form class="row g-3">
            <div class="col-12 col-lg-6 col-xl-3">
              <div class="d-inline text-danger">＊</div>
              <label for="name" class="form-label">優惠券名稱</label>
              <input
                v-model="tempCoupon.title"
                type="text"
                class="form-control"
                id="name"
                placeholder="例如：首購滿千9折優惠"
              />
            </div>
            <div class="col-12 col-lg-6 col-xl-3">
              <div class="d-inline text-danger">＊</div>
              <label for="couponCode" class="form-label">折扣碼</label>
              <input
                v-model="tempCoupon.code"
                type="text"
                class="form-control"
                id="couponCode"
                placeholder="例如：FIRST"
              />
            </div>
            <div class="col-12 col-lg-6 col-xl-3">
              <div class="d-inline text-danger">＊</div>
              <label for="percent" class="form-label"
                >總金額打幾折（單位：％）</label
              >
              <input
                v-model.number="tempCoupon.percent"
                type="number"
                min="0"
                max="100"
                class="form-control"
                id="percent"
                placeholder="例如：打9折請輸入90"
              />
            </div>
            <div class="col-12 col-lg-6 col-xl-3">
              <div class="d-inline text-danger">＊</div>
              <label for="dueDate" class="form-label">有效期限</label>
              <input
                v-model="due_date"
                type="date"
                class="form-control"
                id="dueDate"
                :min="minDate"
              />
            </div>

            <div class="col-lg-12 col-xl-12 form-check checkStyle">
              <input
                v-model="tempCoupon.is_enabled"
                class="form-check-input"
                type="checkbox"
                :true-value="1"
                :false-value="0"
                id="is_enabled"
              />
              <label class="form-check-label" for="is_enabled"> 啟用 </label>
            </div>
          </form>
        </div>
        <footer class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-dark"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            v-if="tempCoupon.id"
            @click="$emit('edit-coupon', tempCoupon)"
            type="button"
            class="btn btn-primary"
          >
            更新優惠券
          </button>
          <button
            v-else
            @click="$emit('add-coupon', tempCoupon)"
            type="button"
            class="btn btn-primary"
          >
            新增優惠券
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
import ModalMixin from '@/mixins/modalMixin'
import 'vue-select/dist/vue-select.css'

export default {
  data() {
    return {
      modal: {},
      tempCoupon: {},
      due_date: '',
    }
  },
  props: {
    coupon: {
      type: Object,
      default() {
        return {}
      },
    },
  },

  watch: {
    coupon() {
      this.tempCoupon = this.coupon
      if (this.tempCoupon.id) {
        const date = new Date(this.tempCoupon.due_date * 1000)
          .toISOString()
          .split('T')
        this.due_date = date[0]
      } else {
        return
      }
      if (this.coupon.is_enabled) {
        this.tempCoupon.is_enabled = this.coupon.is_enabled
      } else {
        this.tempCoupon.is_enabled = 0
      }
    },
    due_date() {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date)) / 1000
    },
  },
  mixins: [ModalMixin],
  computed: {
    minDate() {
      let min = ''
      const date = new Date().toISOString().split('T')
      min = date[0]
      return min
    },
  },
}
</script>

<style lang="scss" scoped>
.checkStyle {
  padding-left: 30px;
}
</style>
