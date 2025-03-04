<template>
  <div class="update-box">
    <div class="box">
      <div class="title">{{ $t('系统升级维护通知') }}</div>
      <div class="content">
        <p>{{ $t('尊敬的用户') }}</p>
        <p style="text-indent: 2em">
          {{
            $t(
              '为进一步提升服务质量，正在进行系统升级维护，期间将暂停网站服务（包括但不仅限于充提服务、交易服务、网站访问等），感谢您的理解与支持。 如需人工客服请联系',
            )
          }}
        </p>
        <p style="text-align: right">{{ supportEmail }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { supportEmail } from '@/config'
</script>

<style scoped lang="scss">
.update-box {
  width: 100vw;
  height: 100vh;
  background-color: #285ff9;
  position: relative;
  .box {
    position: absolute;
    width: 670px;
    height: 300px;
    padding: 30px;
    border-radius: 19px;
    background-color: #7b9dfb;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .title {
      height: 22px;
      padding: 50px 0 20px;
      text-align: center;
      color: var(--white-color);
    }
    .content {
      p {
        line-height: 30px;
        font-size: 14px;
        color: var(--white-color);
      }
    }
  }
}
</style>
