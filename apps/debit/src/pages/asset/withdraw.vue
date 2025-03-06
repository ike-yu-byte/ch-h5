<template>
  <div class="recharge-box">
    <div class="contain">
      <div class="header">{{ $t('提币') }}</div>
      <div class="content">
        <div class="left">
          <div class="item" v-for="(item, index) of schemes" :key="index">
            <div class="label">{{ $t(`${item.label}`) }}</div>
            <div class="box">
              <template v-if="item.type === 'select'">
                <SearchSelect
                  :bg="'transparent'"
                  class="my-select"
                  :expandIcon="'icon-xia1'"
                  contentName="select-content"
                  iconKey=""
                  placement="bottom-end"
                  :options="state[item.optionKey as any]"
                  v-model="state[item.valueKey]"
                  @change="handleCoinChange"
                ></SearchSelect>
              </template>
              <template v-else-if="item.type === 'radio'">
                <Tag
                  :options="state[item.optionKey as any]"
                  v-model="state[item.valueKey]"
                  @change="handleChainChange"
                ></Tag>
              </template>
              <template v-else-if="item.type === 'code'">
                <p class="text">
                  {{ state[item.valueKey] }}
                </p>
                <span class="copy" @click="useCopy(state.addr)">{{
                  $t('复制')
                }}</span>
                <Code :text="state.addr"></Code>
              </template>
              <template v-else-if="item.type === 'input'">
                <div>
                  <div class="input-box">
                    <el-input
                      v-model="state[item.valueKey]"
                      :type="item.number ? 'number' : 'text'"
                      :min="0"
                      :placeholder="item.placeholder"
                      @input="item.onInput?.(state[item.valueKey], item)"
                    >
                      <template v-if="item.suffix" #suffix>
                        <span
                          style="color: var(--text-color); cursor: pointer"
                          @click.self.stop="item.suffix.callback?.()"
                          >{{ item.suffix.label }}</span
                        >
                      </template> </el-input
                    ><span
                      class="outer-suffix"
                      v-if="item.outerSuffix"
                      @click.self.stop="item.outerSuffix?.callback?.()"
                      >{{ item.outerSuffix.label }}</span
                    >
                  </div>
                  <div v-if="item.extra" class="extra-box">
                    <span class="tip">{{ item.extra.label }}</span
                    ><span class="value"
                      >{{ state[item.extra.valueKey] || 0 }} USDT</span
                    >
                  </div>
                </div>
              </template>
              <template v-else-if="item.type === 'text'">
                <span class="plain">{{ state[item.valueKey] }} USDT</span>
              </template>
              <div class="error-text" v-if="item.error" :key="item.errorText">
                {{ item.errorText }}
              </div>
            </div>
          </div>
          <div class="btn-wrap">
            <el-button
              style="width: 100%; border-radius: 32px"
              :disabled="isDisabled"
              @click="handleSubmit"
              >{{ $t('提币') }}</el-button
            >
          </div>
        </div>
        <div class="right">
          <div class="richtext" v-html="state.currentRichText"></div>
        </div>
      </div>
      <div class="footer">
        <el-tabs v-model="state.currentTab" class="demo-tabs">
          <el-tab-pane
            :label="item.label"
            :name="item.name"
            v-for="(item, index) of tabs"
            :key="index"
          ></el-tab-pane>
        </el-tabs>
        <div class="tips" v-if="!isPC">{{ $t('表单可左右滑动') }}</div>
        <Table
          :tableColumn="tableColumn"
          :tableData="filteredData"
          @action="handleTableAction"
        >
          <template #status="{ row }">
            <span>{{
              row.status === 1
                ? $t('待到账')
                : row.status === 2
                  ? $t('成功')
                  : row.status === 3
                    ? $t('失败')
                    : ''
            }}</span>
          </template>
          <template #empty>
            <Empty />
          </template>
        </Table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { $t } from '@/i18n'
import { reactive, computed, toRefs, watch, ref } from 'vue'
import { coinList } from './mock'
import SearchSelect from '@/components/searchSelect'
import Tag from 'common-components/tag'
import Table from 'common-components/table/table.vue'
import Empty from '@/components/empty'
import router from '@/router'

import { useCopy } from 'common-assets'
import Code from 'common-components/code/index.vue'
import { useDeviceStore } from '@/store'
import * as math from 'mathjs'

const { isPC } = toRefs(useDeviceStore())

const mockData: any[] = []
for (let i = 0; i < 10; i++) {
  mockData.push({
    id: i,
    time: '2025-01-12',
    coin: 'USDT' + i,
    addr: 'TGeGoNrsTFgo4xUriPx2P6xshWrw7xMfcB',
    amount: 100,
    status: i % 2 === 0 ? 1 : 2, // 1待到账2成功3失败
  })
}

const tableColumn = [
  {
    label: $t('更新时间'),
    prop: 'time',
  },
  {
    label: $t('币种'),
    prop: 'coin',
  },
  {
    label: $t('提币地址'),
    prop: 'addr',
  },
  {
    label: $t('提币数量'),
    prop: 'amount',
  },
  {
    label: $t('充币状态'),
    prop: 'status',
    slot: 'status',
  },
  {
    label: $t('操作'),
    prop: 'action',
    options: [
      // 操作这里由于案例里面没有数据，后面需要自己根据实际情况配置
      {
        label: $t('删除'),
        value: 'delete',
      },
    ],
  },
]

const tabs = [
  {
    label: $t('USDT提币记录'),
    name: 'usdt',
  },
  {
    label: $t('全部提币记录'),
    name: 'all',
  },
]

const schemes = ref([
  {
    label: '选择币种',
    type: 'select',
    optionKey: 'coinOptions',
    valueKey: 'currentCoin',
    error: false,
    varify: (val: any, item: any) => {
      if (!val) {
        item.error = true
      } else {
        item.error = false
      }
      return item.error
    },
    errorText: $t('币种不能为空'),
  },
  {
    label: '链名称',
    type: 'radio',
    optionKey: 'chainOptions',
    valueKey: 'currentChain',
    error: false,
    varify: (val: any, item: any) => {
      if (!val) {
        item.error = true
      } else {
        item.error = false
      }
      return item.error
    },
    errorText: $t('链名称不能为空'),
  },
  {
    label: '提币地址',
    type: 'input',
    valueKey: 'addr',
    error: false,
    placeholder: $t('请输入提币地址'),
    varify: (val: string, item: any) => {
      if (!val) {
        item.error = true
      } else {
        item.error = false
      }
      return item.error
    },
    errorText: $t('提币地址不能为空'),
    onInput: (val: any, item: any) => {
      item.varify(Number(val), item)
    },
    outerSuffix: {
      label: $t('地址管理'),
      callback: () => {
        router.push({
          name: 'addr',
        })
      },
    },
  },
  {
    label: '提币数量',
    type: 'input',
    number: true,
    valueKey: 'amount',
    placeholder: $t('请输入提币数量'),
    suffix: {
      label: $t('全部'),
      callback: () => {
        console.log('提币数量')
        state.amount = state.available
      },
    },
    extra: {
      label: $t('可用'),
      valueKey: 'available',
    },
    varify: (val: number, item: any) => {
      if (!val) {
        item.errorText = $t('提币数量不能为空')
        item.error = true
      } else if (val > parseFloat(state.available)) {
        item.errorText = $t('提币数量不能大于可用数量')
        item.error = true
      } else if (val <= 0) {
        item.errorText = $t('提币数量不能小于等于0')
        item.error = true
      } else {
        item.error = false
      }
      return item.error
    },
    onInput: (val: any, item: any) => {
      item.varify(Number(val), item)
      handleVerify()
        .then(() => {})
        .catch(() => {})
    },
    error: false,
    errorText: $t('提币数量不能为空'),
  },
  {
    label: '网络手续费',
    type: 'text',
    valueKey: 'commission',
    error: false,
  },
  {
    label: '预计到账',
    type: 'text',
    valueKey: 'received',
    varify: (val: any, item: any) => {
      if (parseFloat(val) < 0) {
        item.error = true
      } else {
        item.error = false
      }
      return item.error
    },
    error: false,
    errorText: $t('预计到账不能小于0'),
  },
])

const state = reactive<any>({
  received: 0, // '预计到账'
  commission: 1, // 网络手续费，固定为1usdt, 可改为后端配置
  available: 0.0, // 可用数量
  amount: '', // 提币数量
  coinOptions: [], // 币种可选项
  currentCoin: {}, // 当前选中的币种
  chainOptions: [], // 链名称可选项
  currentChain: {}, // 当前选中的链
  addr: '', // 充币地址
  currentRichText: '', // 当前显示在右边的富文本数据
  currentTab: tabs[0].name,
  tableData: [],
})
const route = useRoute()
console.log('route', route.query)

getData()

function getData() {
  // 在这里调用后端接口获取下拉选项数据
  state.available = 2 // 可用数量
  state.tableData = mockData

  state.coinOptions = coinList.map((item: any) => ({
    ...item,
    label: item.coin,
  }))
  state.currentCoin = state.coinOptions[0] || {}
  state.chainOptions = state.currentCoin.protocols.map((item: any) => ({
    ...item,
    label: item.protocol,
  }))
  state.currentChain = state.chainOptions[0]
  state.currentRichText = state.currentChain.withdrawDescription
  // 在这里根据选中的链id后端查充币地址
  state.addr = 'TGeGoNrsTFgo4xUriPx2P6xshWrw7xMfcB'
}

const handleCoinChange = (item: any) => {
  state.available = 2 // 可用数量
  state.currentCoin = item
  state.chainOptions = state.currentCoin.protocols.map((item: any) => ({
    ...item,
    label: item.protocol,
  }))
  state.currentChain = state.chainOptions[0]
  state.currentRichText = state.currentChain.withdrawDescription
  // 在这里根据选中的链id后端查充币地址
  state.addr =
    'TGeGoNrsTFgo4xUriPx2P6xshWrw7xMfcB' + Math.floor(Math.random() * 10000)
}

const handleChainChange = (item: any) => {
  state.available = 2 // 可用数量
  state.currentChain = item
  state.currentRichText = state.currentChain.withdrawDescription
  // 在这里根据选中的链id后端查充币地址
  state.addr =
    'TGeGoNrsTFgo4xUriPx2P6xshWrw7xMfcB' + Math.floor(Math.random() * 10000)
}

const handleTableAction = (row: any) => {
  if (row.action.value === 'delete') {
    console.log('处理删除相关逻辑')
  }
}

watch(
  () => state.amount,
  () => {
    state.received = math
      .subtract(
        math.bignumber(state.amount || 0),
        math.bignumber(state.commission || 0),
      )
      .toJSON().value
  },
  {
    immediate: true,
  },
)

const filteredData = computed(() => {
  if (state.currentTab === 'usdt') {
    return state.tableData.filter((item: any) => item.coin === 'usdt')
  } else {
    return state.tableData
  }
})

const isDisabled = computed(() => {
  let flag = false
  for (let item of schemes.value) {
    if (!state[item.valueKey]) {
      flag = true
      break
    }
  }
  return flag
})

function handleVerify() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let passed = true
      for (let item of schemes.value) {
        if (item.varify) {
          const flag = item.varify(state[item.valueKey], item)
          if (flag) {
            passed = false
            break
          }
        }
      }
      if (passed) {
        resolve(true)
      } else {
        reject(false)
      }
    }, 10)
  })
}

const handleSubmit = () => {
  handleVerify()
    .then(() => {
      console.log('验证通过')
      // 在这里调用后端接口保存
    })
    .catch(() => {
      console.log('验证未通过')
    })
}
</script>

<style scoped lang="scss">
.recharge-box {
  .contain {
    border-radius: 24px;
    border-radius: 24px;
    overflow: hidden;
    .header {
      height: 50px;
      display: flex;
      align-items: center;
      background-color: var(--dark-color);
      color: var(--white-color);
      padding: 0 40px;
      font-size: 15px;
      font-weight: 700;
    }
    .content {
      display: flex;
      column-gap: 20px;
      background-color: var(--white-color);
      padding: 20px 50px;
      .left {
        width: 510px;
        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          &:nth-child(n + 2) {
            margin-top: 36px;
          }
          .label {
            font-size: 14px;
            color: var(--menu-color);
            display: flex;
            align-items: flex-start;
          }
          .box {
            width: 350px;
            min-height: 30px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            :deep(.search-select) {
              height: 30px !important;
            }
            .input-box {
              display: flex;
              :deep(.el-input) {
                flex: 1;
              }
              .outer-suffix {
                margin-left: 15px;
                font-size: 14px;
                color: var(--dark-color);
                display: flex;
                align-items: center;
                font-weight: bold;
                cursor: pointer;
              }
            }
            .extra-box {
              text-align: right;
              margin-top: 4px;
              font-size: 14px;
              color: var(--menu-color);
              .tip {
                margin-right: 4px;
              }
            }
            .text {
              word-break: break-all;
              color: var(--menu-color);
              font-size: 14px;
            }
            .copy {
              margin: 5px 0;
              font-size: 14px;
              cursor: pointer;
            }
            .qrcode {
              width: 100px;
              height: 100px;
            }
            .plain {
              font-size: 14px;
              color: var(--menu-color);
            }
            .error-text {
              font-size: 14px;
              color: var(--red-color);
            }
          }
        }
        .btn-wrap {
          padding-left: 160px;
          padding-top: 40px;
        }
      }
      .right {
        flex: 1;
        .richtext {
          background-color: rgb(255, 249, 232);
          padding: 10px 30px;
        }
      }
    }
    .footer {
      padding: 20px 50px;
      background-color: var(--white-color);
      .tips {
        text-align: center;
      }
    }
  }
}
:deep(.search-select) {
  box-sizing: border-box;
}
.mobile {
  .recharge-box {
    .contain {
      border-radius: 4px;
      .header {
        background-color: var(--white-color);
        color: var(--dark-color);
        padding: 10px 16px 0;
        height: 23px;
      }
      .content {
        flex-direction: column;
        padding: 16px;
        .left {
          width: auto;
          .item {
            flex-direction: column;
            align-items: flex-start;
            width: auto;
            &:nth-child(n + 2) {
              margin: 10px 0;
            }
            .label {
              margin: 5px 0;
            }
            .box {
              width: 100%;
              :deep(.search-select) {
                height: 30px !important;
              }
            }
          }
          .btn-wrap {
            padding: 0px 0px 20px;
          }
        }
      }
      .footer {
        padding: 16px;
      }
    }
  }
}
</style>
