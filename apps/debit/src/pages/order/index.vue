<template>
  <div class="wrap">
    <Panelbox :title="$t('买币订单')">
      <div class="table">
        <Table
          :tableColumn="tableColumn"
          :tableData="tableData"
          @action="handleAction"
        >
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
import Table from 'common-components/table/table.vue'
import Empty from '@/components/empty'
import { $t } from '@/i18n'
import { ref } from 'vue'

const mockData: any[] = []
for (let i = 0; i < 10; i++) {
  mockData.push({
    id: i,
    countdown: '60s',
    orderNumber: '11111111',
    type: '类型1',
    amount: 100,
    totalPrice: 1000,
    price: 100,
    commission: 1,
    time: '2025-02-11 13:34:06',
    payType: 'USDT',
    status: '成功',
  })
}

const tableData = ref<any[]>([])
const tableColumn = [
  {
    label: $t('倒计时'),
    prop: 'countdown',
  },
  {
    label: $t('订单号'),
    prop: 'orderNumber',
  },
  {
    label: $t('类型'),
    prop: 'type',
  },
  {
    label: $t('交易数量'),
    prop: 'amount',
  },
  {
    label: $t('总价'),
    prop: 'totalPrice',
  },
  {
    label: $t('单价'),
    prop: 'price',
  },
  {
    label: $t('手续费'),
    prop: 'commission',
  },
  {
    label: $t('时间'),
    prop: 'time',
  },
  {
    label: $t('支付类型'),
    prop: 'payType',
  },
  {
    label: $t('状态'),
    prop: 'status',
  },
  {
    label: $t('操作'),
    prop: 'action',
    align: 'right',
    options: [
      {
        label: $t('删除'),
        value: 'delete',
      },
    ],
  },
]
tableData.value = mockData

const handleAction = (payload: any) => {
  console.log('payload', payload)
}
</script>

<style scoped lang="scss">
.wrap {
  width: 1200px;
  margin: 0 auto;
  padding: 40px 0;
  .table {
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
  }
}
.mobile {
  .wrap {
    margin: 0 16px;
    width: auto;
  }
}
</style>
