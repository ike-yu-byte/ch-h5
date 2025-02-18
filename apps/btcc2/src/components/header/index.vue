<template>
  <div class="header">
    <slot name="left"><img src="@/assets/img/logo.svg" class="logo" /></slot>
    <slot name="right">
      <div class="lang-wrap" @click="handleLang">
        <img src="@/assets/img/lang-change.svg" class="lang" />
        <span class="text">{{ $t('lang') }}</span>
      </div>
    </slot>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'
const emit = defineEmits(['right'])
const handleLang = () => {
  emit('right')
}
</script>

<style lang="scss" scoped>
.header {
  height: 56px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    width: 100px;
    height: 24px;
    display: inline-block;
  }
  .lang-wrap {
    height: 50%;
    display: flex;
    align-items: center;
    .lang {
      height: 28px;
      width: 28px;
    }
    .text {
      font-size: 20px;
    }
  }
}
</style>
