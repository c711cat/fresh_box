<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div ref="target" class="w-100 text-center text-secondary">商品載入中 ⋯</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineProps, defineEmits } from "vue";

const observerOptions = defineProps(["observerOptions"]);
const emit = defineEmits(["is-in-view", "is-outside-view"]);

const target = ref(null);
const observer = ref(null);

const emitInView = () => {
  emit("is-in-view");
};

const emitOutsideView = () => {
  emit("is-outside-view");
};

onMounted(() => {
  observer.value = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      emitInView();
    } else {
      emitOutsideView();
    }
  }, observerOptions);

  observer.value.observe(target.value);
});

onBeforeUnmount(() => {
  observer.value.disconnect();
});
</script>
