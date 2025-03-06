<template>
  <div class="poster-box">
    <div class="top">
      <div class="logo">
        <img src="@/assets/img/logo_dark.png" />
      </div>
      <div class="title">{{ $t('邀请好友') }}</div>
      <div class="sub-title">{{ $t('加入全球最全面，最安全的交易平台') }}</div>
      <div class="pic">
        <img src="@/assets/img/invite.png" />
      </div>
    </div>
    <div class="bottom">
      <div class="inner">
        <div class="left">
          <div class="label">{{ $t('邀请码') }}:</div>
          <div class="value">{{ props.code }}</div>
          <div class="tips">{{ $t('邀请你扫码加入，获高额交易返佣') }}</div>
        </div>
        <div class="right">
          <Code :width="80" :text="state.addr"></Code>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { $t } from '@/i18n'
import { reactive } from 'vue'
import Code from 'common-components/code/index.vue'

const props = defineProps({
  code: {
    type: String,
    default: '',
  },
})

const state = reactive({
  addr: location.origin + `/register?code=${props.code}`,
})
</script>

<style scoped lang="scss">
.poster-box {
  width: 303px;
  height: 549px;
  .top {
    background-color: var(--dark-bg);
    height: 374px;
    .logo {
      height: 40px;
      padding: 20px 0;
      img {
        width: 95px;
        height: 40px;
      }
      text-align: center;
    }
    color: var(--white-color);
    .title {
      font-size: 30px;
      text-align: center;
    }
    .sub-title {
      font-size: 16px;
      text-align: center;
      margin-top: 5px;
    }
    .pic {
      margin: 20px 15px;
      height: 182px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .bottom {
    background-color: var(--white-color);
    .inner {
      padding: 30px;
      height: 114px;
      display: flex;
      justify-content: space-between;
      .left {
        width: 113px;
        .label {
          font-size: 14px;
          margin-bottom: 2px;
        }
        .value {
          font-size: 18px;
          font-family: igtree-Regular;
          font-weight: 500;
        }
        .tips {
          padding-top: 20px;
          font-size: 14px;
        }
      }
      .right {
        width: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
