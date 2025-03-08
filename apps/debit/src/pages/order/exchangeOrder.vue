<template>
  <div class="wrap">
    <Panelbox :title="$t('闪兑订单')">
      <div class="inner">
        <PlusSearch
          style="width: 100%"
          v-model="value"
          :columns="columns"
          :show-number="columns.length"
          :labelPosition="'top'"
          :inline="true"
          :colProps="{ span: isPC ? 4 : 24 }"
          :resetText="$t('重置')"
          :searchText="$t('搜索')"
          @change="handleChange"
          @search="handleSearch"
          @reset="handleReset"
        />
        <div class="text">{{ isPC ? '' : $t('表单可左右滑动') }}</div>
        <Table :tableColumn="tableColumn" :tableData="tableData">
          <template #empty>
            <Empty></Empty>
          </template>
        </Table>
      </div>
    </Panelbox>
  </div>
</template>

<script setup lang="ts">
import Panelbox from 'common-components/panelbox/index.vue'
import { ref, reactive, computed, toRefs } from 'vue'
import { $t } from '@/i18n'
import { useDeviceStore } from '@/store'
import Table from 'common-components/table/table.vue'
import Empty from '@/components/empty/index.vue'

const mockData = [
  {
    id: 122333,
    time: '2025-01-12',
    out: '123',
    in: '1235',
    price: '100',
    status: '成功',
  },
]

const { isPC } = toRefs(useDeviceStore())

const state = reactive({
  coinOptions: [
    {
      label: 'USDT',
      value: 'USDT',
    },
    {
      label: 'ETH',
      value: 'ETH',
    },
  ],
  statusOptions: [
    {
      label: $t('等待中'),
      value: 1,
    },
    {
      label: $t('已完成'),
      value: 2,
    },
    {
      label: $t('失败'),
      value: 3,
    },
  ],
})

const value = ref({
  // 筛选项里面各项的值
  date: [],
  out: '',
  in: '',
  status: '',
})

const columns: any = computed(() => {
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
      label: $t('卖出'),
      prop: 'out',
      valueType: 'select',
      options: state.coinOptions,
      fieldProps: {
        placeholder: $t('请选择'),
      },
    },
    {
      label: $t('买入'),
      prop: 'in',
      valueType: 'select',
      options: state.coinOptions,
      fieldProps: {
        placeholder: $t('请选择'),
      },
    },
    {
      label: $t('状态'),
      prop: 'status',
      valueType: 'select',
      options: state.statusOptions,
      fieldProps: {
        placeholder: $t('请选择'),
      },
    },
  ]
})

const tableColumn = [
  {
    label: $t('订单ID'),
    prop: 'id',
  },
  {
    label: $t('时间'),
    prop: 'time',
  },
  {
    label: $t('卖出'),
    prop: 'out',
  },
  {
    label: $t('买入'),
    prop: 'in',
  },
  {
    label: $t('价格'),
    prop: 'price',
  },
  {
    label: $t('状态'),
    prop: 'status',
  },
]

const tableData = ref(mockData)

const handleChange = (values: any) => {
  console.log(values, 'handleChange')
}
const handleSearch = (values: any) => {
  console.log(values, 'search')
}
const handleReset = (val: any) => {
  console.log('handleReset', val)
}
</script>

<style scoped lang="scss">
.wrap {
  width: 1200px;
  margin: 0 auto;
  padding: 50px 0;
  .inner {
    margin: 15px 30px;
    width: 100%;
    .text {
      padding: 20px 0;
      text-align: center;
    }
  }
}
:deep(.el-button--primary) {
  background-color: var(--dark-color);
}
.mobile {
  .wrap {
    width: auto;
    .inner {
      padding-left: 0px;
      margin-left: 0px;
      width: 100%;
      :deep(.el-form) {
        display: flex;
        flex-direction: column;
      }
      :deep(.el-col) {
        padding-right: 0px !important;
        margin: 0px !important;
        box-sizing: border-box;
      }
    }
  }
}
</style>
