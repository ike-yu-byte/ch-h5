<template>
  <div class="check-box">
    <span
      :class="`checkbox-wrap ${props.modelValue ? 'checked' : ''} ${props.disabled ? 'disabled' : ''}`"
      @click="handleToggle"
    ></span>
    <slot>{{ props.label }}</slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
})
const emits = defineEmits(['update:modelValue', 'change'])

const handleToggle = () => {
  if (props.disabled) return
  const val = !props.modelValue
  emits('update:modelValue', val)
  emits('change', val)
}
</script>

<style scoped lang="scss">
.check-box {
  display: flex;
  align-items: flex-start;
  font-size: 14px;
  color: var(--text-color);
}
.checkbox-wrap {
  display: inline-block;
  width: 16px;
  height: 16px;
  min-width: 16px;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  &.checked {
    border-color: #285ff9;
  }
  margin-right: 10px;
}
.checked {
  display: flex;
  justify-content: center;
  align-items: center;
  &::after {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #285ff9;
    border-radius: 50%;
  }
}
.disabled {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: not-allowed;
  background-color: #f5f7fa;
  &.checked {
    &::after {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      background-color: #ccc;
      border-radius: 50%;
    }
  }
}
</style>
