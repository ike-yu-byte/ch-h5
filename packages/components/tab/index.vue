<template>
  <div class="tab-box" :style="{ backgroundColor: props.bg }">
    <div class="tab-item" v-for="(item, index) of props.options" :key="index">
      {{ item.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  options: {
    type: Array as any,
    default: () => [],
  },
  bg: {
    type: String,
    default: '',
  },
})
</script>

<style scoped lang="scss">
.tab-box {
  height: 38px;
  border-radius: 5px;
}
</style>
