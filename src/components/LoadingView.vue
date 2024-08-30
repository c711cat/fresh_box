<template>
  <div class="laoderWrap">
    <div
      class="loader position-absolute top-50 start-50 translate-middle d-flex justify-content-center align-items-center"
    >
      <span class="loader1 position-absolute"></span>
      <span class="loader2 position-absolute"></span>
      <span class="loader3 position-absolute"></span>
      <text class="text-dark">Loading...</text>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.laoderWrap {
  position: relative;
  height: 100vh;
  width: 100vw;
  background-color: #00000055;
  z-index: 1031;
}

.loader {
  width: 120px;
  height: 120px;
}

.loader span {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  animation: loading 6s linear infinite;
}

.loader .loader1 {
  border: 1px solid #f9c406;
  border-radius: 66% 34% 69% 31% / 31% 71% 29% 69%;
}

.loader .loader2 {
  border: 1px solid #f9c406;
  animation-direction: reverse;
  border-radius: 73% 27% 68% 32% / 31% 71% 29% 75%;
}

.loader .loader3 {
  border: 1px solid #f9c406;
  animation-duration: 10s;
  border-radius: 37% 63% 27% 73% / 67% 43% 57% 33%;
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
