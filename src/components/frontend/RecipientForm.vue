<template>
  <Form
    @submit="createOrder"
    class="d-flex flex-column justify-content-between"
    v-slot="{ errors }"
  >
    <div class="d-flex flex-column gap-3 mb-3">
      <h3 class="my-0">收件人資訊</h3>
      <div>
        <div class="d-inline text-danger">＊</div>
        <label class="form-label" for="name">收件人姓名</label>
        <Field
          v-model="form.user.name"
          :class="{ 'is-invalid': errors['姓名'] }"
          class="form-control"
          id="name"
          name="姓名"
          type="text"
          rules="required"
        />
        <ErrorMessage name="姓名" class="invalid-feedback" />
      </div>
      <div>
        <div class="d-inline text-danger">＊</div>
        <label class="form-label" for="email">Email</label>
        <Field
          v-model="form.user.email"
          :class="{ 'is-invalid': errors['email'] }"
          class="form-control"
          id="email"
          name="email"
          type="email"
          rules="required|email"
        />
        <ErrorMessage name="email" class="invalid-feedback" />
      </div>
      <div>
        <div class="d-inline text-danger">＊</div>
        <label class="form-label" for="tel">電話</label>
        <Field
          v-model="form.user.tel"
          :class="{ 'is-invalid': errors['電話'] }"
          class="form-control"
          id="tel"
          name="電話"
          type="tel"
          rules="required"
        />
        <ErrorMessage name="電話" class="invalid-feedback" />
      </div>
      <div>
        <div class="d-inline text-danger">＊</div>
        <label class="form-label" for="address">收件地址</label>
        <Field
          v-model="form.user.address"
          :class="{ 'is-invalid': errors['地址'] }"
          class="form-control"
          id="address"
          name="地址"
          type="text"
          rules="required"
        />
        <ErrorMessage name="地址" class="invalid-feedback" />
      </div>
      <div>
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
    </div>

    <div class="text-end">
      <button class="btn btn-primary col-12 col-lg-auto px-5" type="submit">
        送出訂單
      </button>
    </div>
  </Form>
</template>
<script>
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import * as AllRules from '@vee-validate/rules'
Object.keys(AllRules).forEach((rule) => {
  if (rule !== 'all') {
    defineRule(rule, AllRules[rule])
  }
})

configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
})
setLocale('zh_TW')

export default {
  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    }
  },
  inject: ['emitter'],
  components: { Field, Form, ErrorMessage },
  methods: {
    createOrder() {
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/order`
      this.$http
        .post(api, { data: this.form })
        .then((res) => {
          this.emitter.emit('clearCart')
          this.$router.push(`/order/${res.data.orderId}`)
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response, '建立訂單失敗')
        })
    },
  },
}
</script>
