<template>
  <div class="wrap-box">
    <p class="first line">{{ $t('请尝试以下操作：') }}</p>
    <p class="line">
      {{ $t('确认邮件是否在垃圾箱中。') }}
    </p>
    <p class="line">
      {{ $t('手机/邮件可能存在发送延迟，请10分钟后再试。') }}
    </p>
    <p class="line">
      {{ $t('若问题仍未解决，请联系客服寻求帮助。') }}
    </p>
    <p class="line">
      {{ $t('若手机号/邮箱丢失不可用，请点击安全项申请') }}
    </p>
  </div>
</template>

<script setup lang="ts">
const $t = (window as any).$t
</script>

<style scoped lang="scss">
.wrap-box {
  width: 472px;
  .first {
    font-weight: 700;
  }
  .line {
    font-size: 14px;
    font-family: Figtree-Regular;
    color: var(--text-color);
    line-height: 28px;
  }
}
</style>
