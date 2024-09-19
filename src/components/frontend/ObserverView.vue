<template>
  <p ref="targetElement" class="w-100 mb-0 text-center text-secondary">
    商品載入中 ⋯
  </p>
</template>

<script>
export default {
  data() {
    return {
      target_Element: null,
      observer: null,
    };
  },
  props: {
    observerOptions: {
      type: Object,
      default() {
        return;
      },
    },
  },
  methods: {
    emitInView() {
      this.$emit("is-in-view");
    },
    emitOutsideView() {
      this.$emit("is-outside-view");
    },
    initObserver() {
      this.observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          this.emitInView();
        } else {
          this.emitOutsideView();
        }
      }, this.observerOptions);
      if (this.target_Element) {
        this.observer.observe(this.target_Element);
      }
    },
    removeObsever() {
      if (this.obsever) {
        this.observer.disconnect();
      }
    },
  },
  mounted() {
    this.target_Element = this.$refs.targetElement;
    this.initObserver();
  },
  beforeUnmount() {
    this.removeObsever();
  },
};
</script>
