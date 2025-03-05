<template>
  <div
    class="btn-wrap"
    :style="{ backgroundColor: props.bg, color: props.color }"
    @click="handleClick"
  >
    {{ props.text }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  bg: {
    type: String,
    default: 'var(--dark-bg)',
  },
  text: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '#fff',
  },
})

const emits = defineEmits(['click'])

const handleClick = () => {
  emits('click')
}
</script>

<style scoped lang="scss">
.btn-wrap {
  min-width: 180px;
  box-sizing: border-box;
  height: 48px;
  border-radius: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
}
</style>
