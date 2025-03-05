<template>
  <div class="needlogin-box">
    <div class="header">
      <span class="icon iconfont icon-tishi-tanhao"></span>
      <span class="title">{{ $t('重要提示') }}</span>
    </div>
    <div class="content">
      {{ $t('登录失效，请重新登录') }}
    </div>
    <div class="footer">
      <el-button @click="emits('click')">{{ $t('去登录') }}</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const $t = (window as any).$t
const emits = defineEmits(['click'])
</script>

<style scoped lang="scss">
.needlogin-box {
  font-family: Figtree-Regular;
  width: 352px;
  .header {
    display: flex;
    align-items: center;
    .icon {
      font-size: 22px;
      margin-right: 10px;
    }
    .title {
      font-size: 16px;
    }
  }
  .content {
    margin: 8px 0 0 38px;
    font-size: 14px;
  }
  .footer {
    text-align: right;
  }
}
.mobile {
  .needlogin-box {
    width: auto;
  }
}
</style>
