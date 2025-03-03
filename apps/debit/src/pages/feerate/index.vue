<template>
  <div class="rate-box">
    <div class="contain">
      <div class="header">
        <div class="title">
          {{ $t('关于手续费率的说明') }}
        </div>
        <div class="sub-title">
          {{ $t('资产充值与转出手续费汇总/交易手续费汇总') }}
        </div>
      </div>
      <div class="table" v-for="(item, index) of tableConfig" :key="index">
        <div class="table-title">{{ item.label }}</div>
        <div class="table-content">
          <Table
            :column="item.columns"
            :data="state[item.data as any]"
            :border="true"
          >
            <template #code="{ row }">
              <span style="display: flex; align-items: center"
                ><img
                  :src="row.Icon"
                  style="width: 20px; height: 20px; margin-right: 10px"
                />
                <span style="word-break: break-all">{{
                  row.Code + '-' + row.MainChain + '-' + row.Name
                }}</span></span
              >
            </template>
          </Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { $t } from '@/i18n'
import Table from './table.vue'
import { mockData } from './mock'

const state = reactive<any>({
  stock: [], // 现货
  recharge: [], // 充值
  withdraw: [], // 提现
})

state.recharge = mockData.Deposit
state.withdraw = mockData.Withdrawal
state.stock = [
  {
    code: $t('现货交易'),
    fee1: '0.2%',
    fee2: '0.2%',
  },
]

const tableConfig = [
  {
    label: $t('现货交易'),
    data: 'stock',
    columns: [
      {
        label: $t('币种'),
        align: 'left',
        prop: 'code',
      },
      {
        label: $t('交易手续费（挂单）'),
        align: 'left',
        prop: 'fee1',
      },
      {
        label: $t('交易手续费（吃单）'),
        align: 'right',
        prop: 'fee2',
      },
    ],
  },
  {
    label: $t('充值'),
    columns: [
      {
        label: $t('币种'),
        slot: 'code',
        align: 'left',
      },
      {
        label: $t('最小充值限额'),
        prop: 'Min',
        align: 'left',
      },
      {
        label: $t('充值手续费'),
        prop: 'Fee',
        align: 'right',
      },
    ],
    data: 'recharge',
  },
  {
    label: $t('转出'),
    columns: [
      {
        label: $t('币种'),
        slot: 'code',
        align: 'left',
      },
      {
        label: $t('转出最小限额'),
        prop: 'Min',
        align: 'left',
      },
      {
        label: $t('转出手续费'),
        prop: 'Fee',
        align: 'right',
      },
    ],
    data: 'withdraw',
  },
]
</script>

<style scoped lang="scss">
.rate-box {
  font-family: Figtree-Regular;
  .contain {
    width: 1200px;
    margin: 0 auto;
    padding: 50px;
    .header {
      .title {
        font-size: 20px;
        color: var(--menu-color);
      }
      .sub-title {
        font-size: 16px;
        margin-top: 4px;
        color: var(--gray-color);
      }
    }
    .table {
      margin-top: 30px;
      .table-title {
        font-size: 18px;
        height: 40px;
      }
    }
  }
}
.mobile {
  .rate-box {
    .contain {
      width: auto;
      padding: 16px;
    }
  }
}
</style>
