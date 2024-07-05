<template>
  <!-- 購物須知 -->
  <div class="col-12">
    <div class="d-flex flex-wrap mb-2">
      <strong class="col-12 col-md-auto">1. 寄送時間：</strong>
      <div class="col">
        從訂購當日 至 到貨日需 3 個工作天（不包含週六、週日及國定假日）。<br />
        詳細內容請至
        <router-link to="/QA" class="text-decoration-none">
          常見問題
        </router-link>
        查閱。
      </div>
    </div>
    <div class="d-flex flex-wrap mb-2">
      <strong class="col-12 col-md-auto">2. 送貨範圍：</strong>
      <div class="col">
        僅限於台灣本島。收件地址勿為郵政信箱。<br />
        若為台灣本島以外顧客購買，收件人請留台灣本島的親友資訊。
      </div>
    </div>
    <div class="d-flex flex-wrap mb-2">
      <strong class="col-auto">3. 送貨方式：</strong>
      <div class="flex-fill">冷藏宅配。</div>
    </div>
    <div class="d-flex flex-wrap mb-2">
      <strong class="col-12 col-md-auto">4. 關於退貨：</strong>
      <div class="col">
        農產品、生鮮、冷藏產品並不受制於
        <span class="text-danger">『 消費者保護法第 19 條 』</span>
        因此<span class="text-danger">【 不享有7天鑑賞期 】</span>。<br />
        所提供之商品，皆為私人消耗性農產品、生鮮產品及食品，除商品在未食用、未開封且本身已瑕疵外，
        <span class="text-danger">
          【 恕不受理個人主觀因素所提出之退貨要求 】
        </span>
        例如：甜度、酸度、軟硬度、美味程度、外觀美醜、臨時反悔等。<br />
        我司則有權【不予受理賠償及換貨】，敬請見諒。
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.noteTitle {
  width: 100px;
}
</style>
