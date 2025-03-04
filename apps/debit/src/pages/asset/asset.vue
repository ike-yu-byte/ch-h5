<template>
  <div class="asset-wrap">
    <div class="header">
      <div class="title">
        <span class="label">{{ $t('总资产折合') }}<span>(USD)</span></span>
        <span
          :class="`icon iconfont ${state.visible ? 'icon-mima_kejian' : 'icon-mima_bukejian'}`"
          @click="state.visible = !state.visible"
        ></span>
      </div>
      <div class="static">
        <span class="left">
          <span>{{ state.visible ? state.totalBTC : '****' }}</span>
          <span> BTC</span>
        </span>
        <span class="right">
          <span>≈ $</span>
          <span>{{ state.visible ? state.totalDollar : '****' }}</span>
        </span>
      </div>
      <div class="content">
        <Tab :bg="'var(--dark-bg)'" :options="tabs"></Tab>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import Tab from 'common-components/tab/index.vue'
import { $t } from '@/i18n'

const tabs = [
  {
    label: $t('现货账户'),
    value: 'stock',
  },
  {
    label: $t('Debit卡'),
    value: 'stock',
  },
]

const state = reactive<any>({
  visible: true,
  totalBTC: 0,
  totalDollar: 0,
})
</script>

<style scoped lang="scss">
.asset-wrap {
  background-color: var(--white-color);
  padding: 20px 40px;
  border-radius: 24px;
  font-family: Figtree-Regular;
  .header {
    .title {
      .label {
        margin-right: 6px;
        color: var(--text-color);
        span {
          font-weight: bold;
        }
      }
      .icon {
        cursor: pointer;
        color: var(--text-color);
        font-size: 16px;
      }
    }
    .static {
      margin-top: 5px;
      font-family: Figtree-Bold;
      .left {
        color: rgb(0, 17, 60);
        font-size: 21px;
      }
      .right {
        font-size: 18px;
        color: var(--text-color);
      }
    }
    .content {
      margin-top: 30px;
    }
  }
}
</style>
