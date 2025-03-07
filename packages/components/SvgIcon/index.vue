<template>
  <svg aria-hidden="true" class="svg-icon" :color="props.color">
    <use :href="`#icon-${props.name}`" />
  </svg>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string
    color: string
  }>(),
  { name: '', color: '' },
)
</script>

<style scoped lang="scss">
.cp-icon {
  // 和字体一样大
  width: 1em;
  height: 1em;
}
</style>
