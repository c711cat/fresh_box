<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h3 class="titleStyle py-4 mb-0">後台產品列表</h3>

  <div class="container">
    <div class="row align-items-center border-top py-4">
      <div class="text-center col-12 col-sm-2">
        <img
          class="img-fluid"
          src="https://images.unsplash.com/photo-1576179636333-f13b174b3c9a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div class="col-12 col-sm-10">
        <div class="row align-items-center">
          <div class="col-12 col-sm-6 col-lg-3">
            <div>智利蜜蘋果</div>
            <div>600克±5%/份</div>
          </div>
          <div class="col-4 col-sm-3 col-lg">
            <div>原價</div>
            <div>NT$150</div>
          </div>
          <div class="col-4 col-sm-3 col-lg">
            <div>售價</div>
            <div>NT$100</div>
          </div>
          <div class="col-4 col-sm-6 col-lg">數量10份</div>
          <div class="col-8 col-sm-3 col-lg">販售中</div>
          <div class="col-4 col-sm-3 col-lg-auto">
            <button
              type="button"
              class="btn btn-outline-primary rounded-1 me-1 my-1"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger rounded-1 me-1 my-1"
            >
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.titleStyle {
  padding-left: 6%;
}
</style>
