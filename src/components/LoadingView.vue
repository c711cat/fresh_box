<template>
  <div class="laoderWrap d-flex justify-content-center align-items-center">
    <div class="loadingBox d-flex justify-content-center align-items-center">
      <span class="loader1"></span>
      <span class="loader2"></span>
      <span class="loader3"></span>
      <text class="text-dark">Loading...</text>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.laoderWrap {
  position: relative;
  height: 100vh;
  width: 100%;
  background-color: #00000055;
  z-index: 1031;
}

.loadingBox {
  position: relative;
  width: 120px;
  height: 120px;
}

span {
  position: absolute;
  width: 120px;
  height: 120px;
  top: 0;
  left: 0;
}

.loader1 {
  border: 1px solid #f9c406;
  border-radius: 66% 34% 69% 31% / 31% 71% 29% 69%;
  animation: loading 6s linear infinite;
}
.loader2 {
  border: 1px solid #f9c406;

  border-radius: 73% 27% 68% 32% / 31% 71% 29% 75%;
  animation: loading 6s linear infinite;
  animation-direction: reverse;
}

.loader3 {
  border: 1px solid #f9c406;
  border-radius: 37% 63% 27% 73% / 67% 43% 57% 33%;
  animation: loading 10s linear infinite;
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
