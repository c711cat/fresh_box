<template>
  <div class="row mx-5 my-5 p-0">
    <div class="detailsText mb-5 col-lg-7">
      <h3 class="ps-3">購買明細</h3>
      <div
        v-for="(item, index) in carts"
        :key="index"
        class="row m-0 justify-content-center align-items-center border-top pt-3 pb-3"
      >
        <div class="d-none d-sm-block col-sm-2 col-xxl-1 m-0 text-center">
          <img class="imgBody" :src="item.product.imageUrl" alt="" />
        </div>

        <div
          class="col-7 col-sm-6 col-md-4 col-lg-5 col-xl-4 col-xxl-7 row mx-0 my-1 align-items-center"
        >
          <div class="col-md-12 col-lg-12 col-xl-12 col-xxl-4">
            {{ item.product.title }}
          </div>
          <div class="col-md-12 col-lg-12 col-xl-12 col-xxl-4">
            {{ item.product.content }}／{{ item.product.unit }}
          </div>
          <div
            v-if="item.product.origin_price === item.product.price"
            class="text-secondary col-md-12 col-lg-12 col-xl-12 col-xxl-4"
          >
            NT$ {{ item.product.origin_price }}
          </div>
          <div
            v-else
            class="text-danger fw-bold col-md-12 col-lg-12 col-xl-12 col-xxl-4"
          >
            NT$ {{ item.product.price }}
          </div>
        </div>

        <div
          class="row m-0 align-items-center col-5 col-sm-4 col-md-6 col-lg-5 col-xl-4 col-xxl-4"
        >
          <div class="py-2 d-flex col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            數量：{{ item.qty }}
          </div>

          <div class="my-2 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            NT$ {{ item.total }}
          </div>
        </div>
      </div>
      <!--  -->
      <div
        class="col-12 row g-1 m-0 border-top pt-3 justify-content-center align-items-center"
      >
        <div class="col-6 col-sm-7 col-lg-8 col-xl-9 text-sm-end">小計</div>
        <div class="col-5 col-sm-4 col-lg-3 col-xl-2 text-end">
          NT${{ moneyDetail.subtotal }}
        </div>

        <div class="col-6 col-sm-7 col-lg-8 col-xl-9 text-sm-end">
          優惠碼折抵
        </div>
        <div class="col-5 col-sm-4 col-lg-3 col-xl-2 text-end">
          - NT${{ moneyDetail.discount }}
        </div>
        <div class="col-6 col-sm-7 col-lg-8 col-xl-9 text-sm-end">
          折抵後小計
        </div>
        <div class="col-5 col-sm-4 col-lg-3 col-xl-2 text-end">
          NT${{ moneyDetail.afterDiscount }}
        </div>

        <div class="col-6 col-sm-7 col-lg-8 col-xl-9 text-sm-end">
          冷藏宅配
          <div class="infoText col-12 text-danger">
            <i class="bi bi-info-circle"></i>
            滿 NT$ 1000 免運
          </div>
        </div>

        <div class="col-5 col-sm-4 col-lg-3 col-xl-2 text-end">
          NT${{ moneyDetail.shippingFee }}
        </div>

        <strong class="col-6 col-sm-7 col-lg-8 col-xl-9 text-sm-end">
          付款金額
        </strong>
        <strong class="col-5 col-sm-4 col-lg-3 col-xl-2 text-end">
          NT$ {{ moneyDetail.paymentAmount }}</strong
        >
      </div>
      {{ moneyDetail }}
    </div>

    <Form
      @submit="createOrder"
      class="col-lg-5 row m-0 g-3"
      v-slot="{ errors }"
    >
      <h3 class="border-bottom pb-2 mt-0 ps-3">收件人資訊</h3>
      <div class="px-3">
        <label class="form-label mt-3" for="name">收件人姓名</label>
        <Field
          v-model="form.user.name"
          :class="{ 'is-invalid': errors['姓名'] }"
          class="form-control"
          id="name"
          name="姓名"
          type="text"
          rules="required"
        ></Field>
        <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="px-3">
        <label class="form-label" for="email">Email</label>
        <Field
          v-model="form.user.email"
          :class="{ 'is-invalid': errors['email'] }"
          class="form-control"
          id="email"
          name="email"
          type="email"
          rules="required|email"
        ></Field>
        <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="px-3">
        <label class="form-label" for="tel">電話</label>
        <Field
          v-model="form.user.tel"
          :class="{ 'is-invalid': errors['電話'] }"
          class="form-control"
          id="tel"
          name="電話"
          type="tel"
          rules="required"
        ></Field>
        <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="px-3">
        <label class="form-label" for="address">收件地址</label>
        <Field
          v-model="form.user.address"
          :class="{ 'is-invalid': errors['地址'] }"
          class="form-control"
          id="address"
          name="地址"
          type="address"
          rules="required"
        ></Field>
        <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="px-3">
        <label class="form-label" for="message">備註</label>
        <textarea
          v-model="form.message"
          class="form-control"
          name="message"
          id="message"
          cols="30"
          rows="5"
        ></textarea>
      </div>

      <div class="text-end">
        <button class="btn btn-primary">送出訂單</button>
      </div>
    </Form>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";
import * as AllRules from "@vee-validate/rules";
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale("zh_TW");

export default {
  data() {
    return {
      carts: [],
      moneyDetail: {
        subtotal: "",
        discount: "",
        afterDiscount: "",
        shippingFee: "",
        paymentAmount: "",
      },
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  inject: ["emitter"],
  components: { Field, Form, ErrorMessage },
  methods: {
    getCart() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(api).then((res) => {
        this.carts = res.data.data.carts;
        console.log(this.carts);
      });
    },
    createOrder() {
      console.log("p");
    },
  },

  created() {
    this.getCart();
  },
</script>

<style lang="scss" scoped>
.detailsText {
  font-size: 14px;
}
.imgBody {
  width: 50px;
  object-fit: cover;
}
</style>
