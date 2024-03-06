<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="laoderWrap">
    <div
      class="loader position-absolute top-50 start-50 translate-middle d-flex justify-content-center align-items-center"
    >
      <span class="loader1 position-absolute"></span>
      <span class="loader2 position-absolute"></span>
      <span class="loader3 position-absolute"></span>
      <text class="text-body-tertiary">Loading...</text>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.laoderWrap {
  position: relative;
  height: 100vh;
}

.loader {
  width: 120px;
  height: 120px;
}

.loader span {
  width: 100%;
  height: 100%;
  top: 0;
  left: o;
  pointer-events: none;
  animation: loading 5s linear infinite;
}

.loader .loader1 {
  border: 1px solid rgb(248, 180, 191);
  border-radius: 100% 30% 90% 40% / 90% 30% 90% 30%;
}

.loader .loader2 {
  border: 1px solid rgb(240, 207, 100);
  animation-direction: reverse;
  border-radius: 35% 90% 50% 60% / 55% 80% 40% 70%;
}

.loader .loader3 {
  border: 1px solid rgb(142, 203, 247);
  animation-duration: 3s;
  border-radius: 78% 66% 80% 50% / 90% 40% 90% 55%;
}

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
