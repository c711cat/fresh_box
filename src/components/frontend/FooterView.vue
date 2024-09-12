<template>
  <main class="bg-light">
    <div
      class="px-3 py-4 border-bottom d-flex flex-wrap justify-content-between align-items-center"
    >
      <router-link
        to="/"
        class="mb-0 ps-1 pe-3 textStyle linkStyle fs-4 text-dark"
      >
        FRESH BOX
      </router-link>
      <div class="d-flex align-items-center ps-1 py-1 pe-1">
        <router-link to="/login" class="backendLink btn btn-black me-3 py-1">
          後台
        </router-link>
        <a
          class="bi bi-github fs-1 text-dark"
          href="https://github.com/c711cat/fresh_box"
        >
        </a>
      </div>
    </div>
    <div class="px-3 py-4 d-flex flex-wrap">
      <div class="textStyle pe-2">
        <a
          class="linkStyle text-dark"
          target="_blank"
          href="https://icons8.com/icons/collections/x6c5ehv2qqdv25m8idkq"
        >
          Category
        </a>
        icons by
        <a
          class="linkStyle text-dark"
          target="_blank"
          href="https://icons8.com"
        >
          Icons8
        </a>
        .
      </div>
      <span class="pe-2">此網站為個人作品展示，非商業用途。</span>
      <span class="textStyle">© 2024 FRESH BOX</span>
    </div>
  </main>
</template>
<style lang="scss" scoped>
a {
  text-decoration: none;
}

.linkStyle:hover,
.bi-github:hover {
  color: #ccaf3c !important;
}

.textStyle {
  font-family: "Times New Roman", Times, serif;
}

.backendLink:hover {
  background-color: #ccaf3c;
  color: black;
  border: 1px solid #ccaf3c;
}
</style>
