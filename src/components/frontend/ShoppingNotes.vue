<template>
  <!-- 購物須知 -->
  <div class="col-12">
    <p class="mb-2">
      蔬果為天然農作物，會隨產期初期、中期、末期口感和色澤有所不同，也可能有些許小瑕疵，但不影響風味，請原諒它的不完美，也請珍惜果物不同時期的風味。
    </p>
    <ul class="ps-0">
      <li class="ms-0 pb-3 d-flex flex-wrap">
        <p class="mb-0 col-12 col-md-auto fw-bolder">1. 寄送時間：</p>
        <p class="mb-0 col">
          從訂購當日 至 到貨日需 3 個工作天（ 不包含週六、週日及國定假日 ）。
          詳細內容請至
          <router-link
            to="/QA"
            class="text-decoration-none px-1 fw-bold text-dark-primary"
          >
            常見問題
          </router-link>
          查閱。
        </p>
      </li>
      <li class="ms-0 pb-3 d-flex flex-wrap">
        <p class="mb-0 col-12 col-md-auto fw-bolder">2. 送貨範圍：</p>
        <div class="col">
          <p class="mb-2">僅限於台灣本島。收件地址勿為郵政信箱。</p>
          <p class="mb-0">
            若為台灣本島以外顧客購買，收件人請留台灣本島的親友資訊。
          </p>
        </div>
      </li>
      <li class="ms-0 pb-3 d-flex flex-wrap">
        <p class="mb-0 fw-bolder">3. 送貨方式：</p>
        <p class="mb-0">冷藏宅配。</p>
      </li>
      <li class="ms-0 pb-3 d-flex flex-wrap">
        <p class="mb-0 col-12 col-md-auto fw-bolder">4. 關於退貨：</p>
        <div class="col">
          <p class="mb-2">
            農產品、生鮮、冷藏產品並不受制於<span class="text-danger"
              >『 消費者保護法第 19 條 』</span
            >因此 <span class="text-danger">【 不享有 7 天鑑賞期 】</span>。
          </p>
          <p class="mb-2">
            所提供之商品，皆為私人消耗性農產品、生鮮產品及食品，除商品在未食用、未開封且本身已瑕疵外，
            <span class="text-danger">
              【 恕不受理個人主觀因素所提出之退貨要求 】
            </span>
            例如：甜度、酸度、軟硬度、美味程度、外觀美醜、臨時反悔等。
          </p>
          <p class="mb-0">我司則有權【不予受理賠償及換貨】，敬請見諒。</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.noteTitle {
  width: 100px;
}

.text-dark-primary:hover {
  color: #ccaf3c !important;
}
</style>
