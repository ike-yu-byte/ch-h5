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
          <span> ≈ $</span>
          <span>{{ state.visible ? state.totalDollar : '****' }}</span>
        </span>
      </div>
      <div class="content">
        <Tab
          :bg="isPC ? 'var(--dark-bg)' : 'transparent'"
          :color="isPC ? '' : 'var(--gray-color)'"
          :options="tabs"
          v-model="state.currentTab"
        ></Tab>
        <component
          :is="currentComp"
          :totalInfo="state.totalInfo"
          :column="
            state.currentTab.value === 'stock' ? tableColumn : tableColumn2
          "
          :data="state.tableData"
        ></component>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, shallowRef, toRefs } from 'vue'
import Tab from 'common-components/tab/index.vue'
import { $t } from '@/i18n'
import { useRoute } from 'vue-router'
import { useDeviceStore } from '@/store'

const { isPC } = toRefs(useDeviceStore())

const mockData = []
for (let i = 0; i < 10; i++) {
  mockData.push({
    id: i,
    symbol: 'USDT' + i,
    assetName: 'Bitcoin',
    availableAmount: '0.00',
    freeAmount: '0.00',
    netAmount: '0.00',
    number: 'xdda12233A' + i,
    time: '2025-12-24 13:06:03',
    status: i % 2 === 0 ? 1 : 2, // 1正常，2冻结
  })
}

const route = useRoute()

const currentComp = shallowRef(null)

const tabs = [
  // 现货账户对应的表单的字段
  {
    label: $t('现货账户'),
    value: 'stock',
  },
  {
    label: $t('Debit卡'),
    value: 'card',
  },
]

const tableColumn = [
  {
    label: $t('币种'),
    prop: 'symbol',
    slot: 'symbol',
  },
  {
    label: $t('可用'),
    prop: 'availableAmount',
  },
  {
    label: $t('冻结'),
    prop: 'freeAmount',
  },
  {
    label: $t('折合') + '(USD)',
    prop: 'netAmount',
  },
  {
    label: $t('操作'),
    prop: 'action',
    align: 'right',
    options: [
      {
        label: $t('充币'),
        value: 'recharge',
      },
      {
        label: $t('提币'),
        value: 'withdraw',
      },
    ],
  },
]

const tableColumn2 = [
  // 银行卡对应表单的字段
  {
    label: $t('卡号'),
    prop: 'number',
  },
  {
    label: $t('申请时间'),
    prop: 'time',
  },
  {
    label: $t('状态'),
    prop: 'status',
    slot: 'status',
  },
  {
    label: $t('可用'),
    prop: 'availableAmount',
  },
  {
    label: $t('冻结'),
    prop: 'freeAmount',
  },
  {
    label: $t('折合') + '(USD)',
    prop: 'netAmount',
  },
]

const state = reactive<any>({
  tableData: [],
  totalInfo: {
    totalBTC: '0.00',
    totalDollar: '0.00',
  },
  visible: true,
  totalBTC: 0,
  totalDollar: 0,
  currentTab: {},
})

state.tableData = mockData

watch(
  route,
  () => {
    state.currentTab = route.query.tab
      ? tabs.find((item: any) => item.value === route.query.tab)
      : tabs[0]
  },
  { immediate: true, deep: true },
)

watch(
  () => state.currentTab,
  async () => {
    const module = await import(
      `@/components/${state.currentTab.value}/index.vue`
    )
    currentComp.value = module.default
  },
  { deep: true, immediate: true },
)
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
.mobile {
  .asset-wrap {
    padding: 10px;
    border-radius: 4px;
  }
}
</style>
