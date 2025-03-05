<template>
  <div class="stock-box">
    <div class="header">
      <div class="left">
        <div class="label">{{ $t('总资产折合') }}:</div>
        <div class="value">
          <span class="zuo"
            ><span>{{ props.totalInfo.totalBTC || 0 }}BTC</span> ≈
          </span>
          <span class="you">${{ props.totalInfo.totalDollar || 0 }}</span>
        </div>
      </div>
      <div class="middle">
        <el-input
          :placeholder="$t('币种搜索')"
          v-model="state.inputVal"
          :suffix-icon="Search"
          size="default"
          clearable
        ></el-input>
      </div>
      <div class="right">
        <div class="label">
          <span class="text">{{ $t('隐藏小额币种') }}</span>
          <el-switch
            v-model="state.hide"
            :active-color="'var(--dark-color)'"
            size="default"
          />
        </div>
        <div class="text" v-if="isPC" @click="handleDetail({})">
          {{ $t('资金账户明细') }}
        </div>
      </div>
    </div>
    <div class="content">
      <template v-if="isPC">
        <Table
          :tableColumn="props.column"
          :tableData="listData"
          @action="handleAction"
        >
          <template #symbol="{ row }">
            <div>
              <div class="symbol">{{ row.symbol }}</div>
              <div class="name">{{ row.assetName }}</div>
            </div>
          </template>
        </Table>
      </template>
      <template v-else>
        <div class="card-item" v-for="(item, index) of listData" :key="index">
          <div class="card-header">
            <span class="symbol">{{ item.symbol }}</span>
            <span
              class="iconfont icon-xiangyou"
              @click="handleDetail(item)"
            ></span>
          </div>
          <div class="card-content">
            <div class="row">
              <span class="label">{{ $t('可用') }}</span>
              <span class="value">{{ item.availableAmount }}</span>
            </div>
            <div class="row">
              <span class="label">{{ $t('冻结') }}</span>
              <span class="value">{{ item.freeAmount }}</span>
            </div>
            <div class="row">
              <span class="label">{{ $t('折合') }}(USD)</span>
              <span class="value">{{ item.netAmount }}</span>
            </div>
          </div>
          <div class="card-footer">
            <span
              class="btn"
              @click="
                handleAction({ action: { value: 'recharge' }, row: item })
              "
              >{{ $t('充币') }}</span
            >
            <span
              class="btn"
              @click="
                handleAction({ action: { value: 'withdraw' }, row: item })
              "
              >{{ $t('提币') }}</span
            >
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { reactive, computed, toRefs } from 'vue'
import { $t } from '@/i18n'
import Table from 'common-components/table/table.vue'
import router from '@/router'
import { useDeviceStore } from '@/store'

const { isPC } = toRefs(useDeviceStore())

const props = defineProps({
  totalInfo: {
    type: Object as any,
    default: () => ({}),
  },
  data: {
    type: Array as any,
    default: () => [],
  },
  column: {
    type: Array as any,
    default: () => [],
  },
})

const state = reactive({
  inputVal: '',
  hide: false, // 隐藏小额币种
  min: 1, // 小额币种分界线，暂定为1
})

const listData = computed(() => {
  let tempData = []
  if (state.inputVal) {
    tempData = props.data.filter(
      (item: any) =>
        item.symbol.includes(state.inputVal.toLowerCase()) ||
        item.assetName.includes(state.inputVal.toLowerCase()),
    )
  } else {
    tempData = props.data
  }
  return state.hide
    ? tempData.filter((item: any) => item.availableAmount > state.min)
    : tempData
})

const handleAction = (row: any) => {
  router.push({
    name: row.action.value,
    query: {
      symbol: row.row.symbol,
    },
  })
}

const handleDetail = (item: any) => {
  router.push({
    name: 'assetRecord',
    query: {
      symbol: item.symbol,
    },
  })
}
</script>

<style scoped lang="scss">
.stock-box {
  .header {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    .left {
      min-width: 245px;
      .label {
        font-size: 16px;
        color: var(--text-color);
      }
      .value {
        font-weight: 700;
        margin-top: 5px;
        .zuo {
          font-size: 21px;
          color: var(--dark-color);
        }
        .you {
          font-size: 18px;
          color: var(--menu-color);
        }
      }
    }
    .right {
      font-size: 14px;
      .label {
        .text {
          margin-right: 6px;
          color: var(--text-color);
        }
      }
      .text {
        color: var(--dark-color);
        text-align: right;
        cursor: pointer;
      }
    }
  }
  .content {
    padding-top: 30px;
    .symbol {
      color: var(--text-color);
    }
    .name {
      color: var(--menu-color);
    }
  }
}
.mobile {
  .stock-box {
    .header {
      display: block;
      .middle {
        margin: 10px 0;
      }
    }
    .content {
      padding: 0px;
      .card-item {
        margin: 10px 0;
        padding: 20px;
        background-color: var(--body-color);
        .card-header {
          min-height: 25px;
          padding: 10px;
          border-bottom: 1px solid var(--body-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
          .iconfont {
            color: var(--gray-color);
            font-size: 10px;
          }
          border-bottom: 1px solid var(--light-border3);
        }
        .card-content {
          .row {
            line-height: 18px;
            margin-top: 10px;
            display: flex;
            font-size: 12px;
            justify-content: space-between;
            .label {
              font-weight: 700;
              color: var(--menu-color);
            }
            .value {
              color: var(--menu-color);
            }
          }
        }
        .card-footer {
          height: 31px;
          margin: 10px 0;
          text-align: right;
          .btn {
            padding: 5px 8px;
            border: 1px solid var(--dark-color);
            margin-right: 10px;
            border-radius: 2px;
            display: inline-block;
            cursor: pointer;
            &:last-child {
              margin: 0;
            }
          }
        }
      }
    }
  }
}
</style>
