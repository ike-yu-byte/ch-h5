<template>
  <div class="rule">
    <div class="header">
      <div class="left">{{ $t('rules.huodongguize') }}</div>
      <div class="right"></div>
    </div>
    <div v-html="props.content" class="content"></div>
  </div>
</template>

<script setup lang="ts">
import { rules } from '@/assets/config/index.ts'
const props = defineProps({
  content: {
    type: String,
    default: rules,
  },
})
</script>

<style lang="scss" scoped>
.rule {
  padding: 40px 16px 10px;
  .content {
    font-size: 14px;
    :deep(p) {
      margin: 0;
      text-align: justify;
      line-height: 20px;
      color: #333;
    }
  }
  .header {
    height: 48px;
    font-size: 16px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .left {
      height: 100%;
      display: flex;
      align-items: center;
      background-color: #284193;
      padding: 10px;
      box-sizing: border-box;
      color: #fff;
      border-radius: 10px 0 0 10px;
    }
    .right {
      height: 100%;
      width: 48px;
      background-color: #284193;
      clip-path: polygon(0 0, 48px 0, 24px 24px, 48px 48px, 0 48px);
    }
  }
}
</style>
