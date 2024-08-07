<template>
  <div class="userViewContainer">
    <div>
      <UserNavbar :currentPath="this.$route.path"></UserNavbar>
      <router-view />
    </div>

    <div>
      <FooterView></FooterView>
    </div>
  </div>
</template>

<script>
import UserNavbar from "@/components/frontend/UserNavbar.vue";
import FooterView from "@/components/frontend/FooterView.vue";

export default {
  data() {
    return {};
  },
  components: { UserNavbar, FooterView },
};
</script>

<style lang="scss" scoped>
.userViewContainer {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
