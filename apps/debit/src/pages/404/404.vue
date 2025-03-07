<template>
  <div class="wrap">
    <div class="inner">
      <div style="text-align: center">
        <img src="@/assets/img/404.png" class="img" />
      </div>
      <div class="text">404</div>
      <div class="tip">{{ $t('页面未找到') }}</div>
      <div class="msg">{{ $t('抱歉，您访问的页面似乎已经迷路了') }}</div>
      <div class="btn-box">
        <div class="btn" @click="handleBack">{{ $t('返回首页') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
const handleBack = () => {
  router.push({
    name: 'index',
  })
}
</script>

<style lang="scss" scoped>
.wrap {
  .inner {
    width: 600px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .img {
      width: 600px;
    }
    .text {
      margin-top: 32px;
      font-size: 120px;
      font-weight: bold;
      line-height: 120px;
      text-align: center;
      color: #4f46e5;
      font-family: Roboto;
    }
    .tip {
      font-family: Roboto;
      font-size: 30px;
      font-weight: 600;
      line-height: 36px;
      text-align: center;
      letter-spacing: 0px;
    }
    .msg {
      font-family: Roboto;
      font-size: 18px;
      font-weight: normal;
      line-height: 28px;
      text-align: center;
      letter-spacing: 0px;
      margin-top: 16px;
    }
    .btn-box {
      text-align: center;
      margin-top: 48px;
      .btn {
        display: inline-block;
        padding: 16px 48px;
        background: #4f46e5;
        color: var(--white-color);
        border-radius: 4px;
        cursor: pointer;
        font-size: 18px;
      }
    }
  }
}
.mobile {
  .inner {
    .img {
      width: 300px;
    }
  }
}
</style>
