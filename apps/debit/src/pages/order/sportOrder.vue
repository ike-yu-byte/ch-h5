<template>
  <div class="wrap">
    <Panelbox :title="$t('现货订单')">
      <template #header>
        <el-tabs
          v-model="state.currentTab"
          class="demo-tabs"
          @tab-click="handleTabClick"
        >
          <el-tab-pane
            :label="item.label"
            :name="item.value"
            v-for="(item, index) of tabs"
            :key="index"
          ></el-tab-pane>
        </el-tabs>
      </template>
      <template #default>
        <div
          class="wrap-content"
          :style="{ marginTop: state.currentTab === 'record' ? '0px' : '' }"
        >
          <div class="labels" v-if="state.currentTab !== 'record'">
            <span
              v-for="(item, index) of labels"
              :key="index"
              :class="`label-item ${state.currentSubTab === item.value ? 'active' : ''}`"
              @click="handleSubTab(item)"
            >
              {{ item.label }}
            </span>
          </div>
          <div class="search">
            <PlusSearch
              style="width: 100%"
              v-model="value"
              :columns="columns"
              :show-number="columns.length"
              :labelPosition="'top'"
              :inline="true"
              :colProps="{ span: isPC ? 3 : 12 }"
              :resetText="$t('重置')"
              :searchText="$t('搜索')"
              ref="searchDom"
              @change="handleChange"
              @search="handleSearch"
              @reset="handleReset"
            >
              <template #footer>
                <el-button
                  type="primary"
                  @click="handleSearchOption('handleSearch')"
                  >{{ $t('搜索') }}</el-button
                >
                <el-button @click="handleSearchOption('handleReset')">{{
                  $t('重置')
                }}</el-button>
                <el-text
                  style="margin-left: 15px; cursor: pointer"
                  @click="handleRevoke(null)"
                  v-if="state.currentTab === 'current'"
                  >{{ $t('全部撤销') }}</el-text
                >
              </template>
            </PlusSearch>
          </div>
          <div class="tips" v-if="!isPC">{{ $t('表单可左右滑动') }}</div>
          <div class="table" :key="isPC.toString() + state.currentTab">
            <Table
              :tableColumn="tableColumn"
              :tableData="tableData"
              @action="handleTableAction"
            >
              <template #empty>
                <Empty></Empty>
              </template>
            </Table>
          </div>
        </div>
      </template>
    </Panelbox>
  </div>
</template>

<script setup lang="ts">
import Panelbox from 'common-components/panelbox/index.vue'
import { $t } from '@/i18n'
import { reactive, ref, computed, toRefs } from 'vue'
import Empty from '@/components/empty/index.vue'
import Table from 'common-components/table/table.vue'
import { Modal } from 'common-components'
import { useDeviceStore } from '@/store'

const { isPC } = toRefs(useDeviceStore())

const mockData: any = []
for (let i = 0; i < 10; i++) {
  mockData.push({
    time: '2023-11-20',
    tradingParis: 'BTC/USDT',
    type: $t('市价'),
    direction: $t('买入'),
    price: 100,
    amount: 100,
    sum: 1000,
    finished: '',
    averagePrice: 88,
    quality: 100,
    commission: 66,
  })
}

const searchDom = ref()

const state = reactive({
  currentTab: 'current',
  currentSubTab: 'normal',
  tradingOptions: [
    {
      label: 'BTC/USDT',
      value: 'BTC/USDT',
    },
    {
      label: 'ETH/USDT',
      value: 'ETH/USDT',
    },
  ],
  typeOptions: [
    {
      label: $t('市价'),
      value: 'market',
    },
    {
      label: $t('现价'),
      value: 'now',
    },
  ],
  directionOptions: [
    {
      label: $t('买入'),
      value: 'in',
    },
    {
      label: $t('卖出'),
      value: 'out',
    },
  ],
})

const tabs = [
  {
    label: $t('当前委托'),
    value: 'current',
  },
  {
    label: $t('历史委托'),
    value: 'history',
  },
  {
    label: $t('成交记录'),
    value: 'record',
  },
]

const labels = [
  {
    label: $t('普通委托'),
    value: 'normal',
  },
  {
    label: $t('计划委托'),
    value: 'plan',
  },
]

const handleTabClick = (val: any) => {
  console.log('tab change', val)
  handleFetchData()
}

const handleSubTab = (item: any) => {
  state.currentSubTab = item.value
}

const value = ref<any>({
  // 筛选项里面各项的值
  tradingPairs: '', // 交易对
  type: '', // 类型
  direction: '', // 方向
  date: '',
})

const params = computed(() => {
  if (state.currentTab === 'current') {
    // 当前委托
    return {
      tradingPairs: value.value.tradingPairs, // 交易对
      type: value.value.type, // 类型
      direction: value.value.direction, // 方向
      subTab: state.currentSubTab,
    }
  } else if (state.currentTab === 'history') {
    // 历史委托
    return {
      tradingPairs: value.value.tradingPairs, // 交易对
      type: value.value.type, // 类型
      direction: value.value.direction, // 方向
      subTab: state.currentSubTab,
      date: value.value.date,
    }
  } else {
    // 成交记录
    return {
      tradingPairs: value.value.tradingPairs, // 交易对
      direction: value.value.direction, // 方向
      date: value.value.date,
    }
  }
})

const columns: any = computed(() => {
  if (state.currentTab === 'current') {
    return [
      {
        label: $t('交易对'),
        prop: 'tradingPairs',
        valueType: 'select',
        options: state.tradingOptions,
        fieldProps: {
          placeholder: $t('请选择'),
          filterable: true,
        },
      },
      {
        label: $t('类型'),
        prop: 'type',
        valueType: 'select',
        options: state.typeOptions,
        fieldProps: {
          placeholder: $t('请选择'),
          filterable: true,
        },
      },
      {
        label: $t('方向'),
        prop: 'direction',
        valueType: 'select',
        options: state.directionOptions,
        fieldProps: {
          placeholder: $t('请选择'),
          filterable: true,
        },
      },
    ]
  } else if (state.currentTab === 'history') {
    return [
      {
        label: $t('日期'),
        prop: 'date',
        valueType: 'date-picker',
        colProps: {
          span: isPC.value ? 6 : 24,
        },
        fieldProps: {
          type: 'daterange',
          startPlaceholder: $t('选择开始日期'),
          endPlaceholder: $t('选择结束日期'),
        },
      },
      {
        label: $t('交易对'),
        prop: 'tradingPairs',
        valueType: 'select',
        options: state.tradingOptions,
        fieldProps: {
          placeholder: $t('请选择'),
          filterable: true,
        },
      },
      {
        label: $t('类型'),
        prop: 'type',
        valueType: 'select',
        options: state.typeOptions,
        fieldProps: {
          placeholder: $t('请选择'),
          filterable: true,
        },
      },
      {
        label: $t('方向'),
        prop: 'direction',
        valueType: 'select',
        options: state.directionOptions,
        fieldProps: {
          placeholder: $t('请选择'),
          filterable: true,
        },
      },
    ]
  } else {
    return [
      {
        label: $t('日期'),
        prop: 'date',
        valueType: 'date-picker',
        colProps: {
          span: isPC.value ? 6 : 24,
        },
        fieldProps: {
          type: 'daterange',
          startPlaceholder: $t('选择开始日期'),
          endPlaceholder: $t('选择结束日期'),
        },
      },
      {
        label: $t('交易对'),
        prop: 'tradingPairs',
        valueType: 'select',
        options: state.tradingOptions,
        fieldProps: {
          placeholder: $t('请选择'),
          filterable: true,
        },
      },
      {
        label: $t('方向'),
        prop: 'direction',
        valueType: 'select',
        options: state.directionOptions,
        fieldProps: {
          placeholder: $t('请选择'),
          filterable: true,
        },
      },
    ]
  }
})

const tableColumn = computed(() => {
  if (state.currentTab === 'current') {
    // 当前委托
    return [
      {
        label: $t('时间'),
        prop: 'time',
      },
      {
        label: $t('交易对'),
        prop: 'tradingParis',
      },
      {
        label: $t('类型'),
        prop: 'type',
      },
      {
        label: $t('方向'),
        prop: 'direction',
      },
      {
        label: $t('价格'),
        prop: 'price',
      },
      {
        label: $t('数量'),
        prop: 'amount',
      },
      {
        label: $t('金额'),
        prop: 'sum',
      },
      {
        label: $t('已成交'),
        prop: 'finished',
      },
      {
        label: $t('操作'),
        prop: 'action',
        align: 'right',
        options: [
          {
            label: $t('撤销'),
            value: 'revoke',
          },
        ],
      },
    ]
  } else if (state.currentTab === 'history') {
    return [
      {
        label: $t('时间'),
        prop: 'time',
      },
      {
        label: $t('交易对'),
        prop: 'tradingParis',
      },
      {
        label: $t('类型'),
        prop: 'type',
      },
      {
        label: $t('方向'),
        prop: 'direction',
      },
      {
        label: $t('成交均价'),
        prop: 'averagePrice',
      },
      {
        label: $t('成交数量'),
        prop: 'quality',
      },
      {
        label: $t('数量'),
        prop: 'amount',
      },
      {
        label: $t('成交总额'),
        prop: 'sum',
      },
      {
        label: $t('状态'),
        prop: 'status',
        align: 'right',
      },
    ]
  } else {
    return [
      {
        label: $t('时间'),
        prop: 'time',
      },
      {
        label: $t('交易对'),
        prop: 'tradingParis',
      },
      {
        label: $t('方向'),
        prop: 'direction',
      },
      {
        label: $t('成交价格'),
        prop: 'price',
      },
      {
        label: $t('成交数量'),
        prop: 'amount',
      },
      {
        label: $t('手续费'),
        prop: 'commission',
      },
      {
        label: $t('成交总额'),
        prop: 'sum',
        align: 'right',
      },
    ]
  }
})

const tableData = ref<Array<any>>([])

tableData.value = mockData

// 在这里调用接口
const handleFetchData = () => {
  console.log('params', params.value)
}

const handleChange = (values: any) => {
  console.log(values, 'handleChange')
  handleFetchData()
}
const handleSearch = (values: any) => {
  console.log(values, 'search')
  handleFetchData()
}
const handleReset = (val: any) => {
  console.log('handleReset', val)
  handleFetchData()
}

const handleSearchOption = (option: string) => {
  searchDom.value?.[option]?.()
}

const handleRevoke = (item?: any) => {
  Modal.open({
    content: item ? $t('是否确认撤销') + '?' : $t('是否确认全部撤单') + '?',
    draggable: false,
    // defaultClose: true,
    onConfirm: () => {
      console.log('confirm')
      if (item) {
        // 单个撤销
        console.log('单个撤销')
      } else {
        console.log('全部撤销')
      }
      Modal.close()
    },
  })
}

const handleTableAction = (item: any) => {
  console.log('item', item)
  if (item.action.value === 'revoke') {
    handleRevoke(item.row)
  }
}
</script>

<style scoped lang="scss">
.wrap {
  width: 1200px;
  margin: 0 auto;
  padding: 50px 0;
  .wrap-content {
    width: 100%;
    margin: 30px;
    .labels {
      .label-item {
        margin-right: 25px;
        padding: 8px 20px;
        background-color: var(--shallow-color);
        border-radius: 8px;
        font-size: 12px;
        box-sizing: content-box;
        cursor: pointer;
      }
      .active {
        background-color: var(--dark-color);
        color: var(--white-color);
      }
    }
    .search {
      margin-top: 15px;
      :deep(.el-button--primary) {
        background-color: var(--dark-color);
      }
    }
    .table {
      margin: 30px 0 0;
      width: 100%;
    }
  }
}
.pc {
  .wrap {
    :deep(.el-tabs__nav-wrap .el-tabs__item) {
      color: var(--white-color) !important;
      height: 40px !important;
      font-size: 15px !important;
      font-family: Figtree-Bold;
      font-weight: 700;
    }
    :deep(.el-tabs__active-bar) {
      background-color: var(--white-color) !important;
      padding: 0 20px !important;
      box-sizing: border-box;
    }
    :deep(.el-tabs__nav-wrap) {
      padding: 0px !important;
    }

    :deep(.el-tabs__header) {
      margin-bottom: 0px !important;
    }
  }
}
.mobile {
  .wrap {
    width: auto;
    padding: 0px;
    .wrap-content {
      width: 100%;
      margin: 0px;
      :deep(.el-col:nth-child(even)) {
        padding-right: 0px !important;
      }
      :deep(.el-row) {
        margin: 0px !important;
      }
      .tips {
        text-align: center;
        padding: 15px 0;
      }
      .table {
        margin: 0px;
      }
      .labels {
        margin: 10px 0;
      }
    }
  }
}
:deep(.el-tabs__nav-wrap .el-tabs__item) {
  font-weight: 700 !important;
}
:deep(.el-tabs__nav-wrap::after) {
  display: none !important;
}
</style>
