<template>
  <div class="card" style="width: 18rem">
    <img
      src="https://images.unsplash.com/photo-1629367308496-a2496ba22f88?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      class="card-img-top"
    />
    <div class="card-body">
      <h5 class="card-title">燕巢珍珠芭樂</h5>
      <p class="card-text">600g±10% / 袋</p>
      <div class="d-flex justify-content-between">
        <p class="card-text text-secondary">原價 89元</p>
        <strong class="card-text text-danger fs-5">特價 79元</strong>
      </div>
      <!-- 加入商品的按鈕 -->
      <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-outline-primary border-radius">
          <i class="bi bi-plus-lg"></i>
        </button>
      </div>
      <!-- 加減商品的input -->
      <div class="input-group input-group">
        <button type="button" class="btn btn-outline-primary">
          <i class="bi bi-dash-lg"></i>
        </button>
        <input class="form-control" />
        <button type="button" class="btn btn-outline-primary">
          <i class="bi bi-plus-lg"></i>
        </button>
      </div>
    </div>
  </div>
</template>
