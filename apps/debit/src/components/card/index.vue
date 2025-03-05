<template>
  <div class="card-box">
    <template v-if="props.data.length">
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
            :placeholder="$t('卡号搜索')"
            v-model="state.inputVal"
            :suffix-icon="Search"
            size="default"
            clearable
          ></el-input>
        </div>
        <div class="right">
          <div class="label">
            <span class="text">{{ $t('隐藏小额卡片') }}</span>
            <el-switch
              v-model="state.hide"
              :active-color="'var(--dark-color)'"
              size="default"
            />
          </div>
          <div class="text">{{ $t('表单可左右滑动') }}</div>
        </div>
      </div>
      <div class="content">
        <Table
          :tableColumn="props.column"
          :tableData="listData"
          @action="handleAction"
        >
          <template #status="{ row }">
            <span>{{ row.status === 1 ? $t('正常') : $t('冻结') }} </span>
          </template>
        </Table>
      </div>
    </template>
    <div class="contain">
      <img src="@/assets/img/card.svg" class="logo" />
      <div class="text">
        {{ $t('预付卡，支持Visa和Mastercard，让您全球线上、线下支付无障碍') }}
      </div>
      <Button
        style="margin: 20px 0; height: 40px; font-size: 14px"
        :text="$t('开卡申请')"
        @click="handleOpenCard"
      ></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/button/index.vue'
import router from '@/router'
import Table from 'common-components/table/table.vue'
import { reactive, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'

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

const handleAction = () => {}
const handleOpenCard = () => {
  router.push({
    name: 'applyCard',
  })
}
</script>

<style scoped lang="scss">
.card-box {
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
        text-align: center;
      }
    }
  }
  .content {
    padding-top: 30px;
  }
  .contain {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .logo {
      width: 176px;
      margin-top: 20px;
    }
    .text {
      color: var(--menu-color);
      font-size: 14px;
      text-align: center;
    }
  }
}
.mobile {
  .card-box {
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
