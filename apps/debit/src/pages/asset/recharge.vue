<template>
  <div class="recharge-box">
    <div class="contain">
      <div class="header">{{ $t('充币') }}</div>
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
            </div>
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
import { reactive, computed, toRefs } from 'vue'
import { coinList } from './mock'
import SearchSelect from '@/components/searchSelect'
import Tag from 'common-components/tag'
import Table from 'common-components/table/table.vue'
import Empty from '@/components/empty'

import { useCopy } from 'common-assets'
import Code from 'common-components/code/index.vue'
import { useDeviceStore } from '@/store'

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
    label: $t('充币地址'),
    prop: 'addr',
  },
  {
    label: $t('充币数量'),
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
    label: $t('USDT充币记录'),
    name: 'usdt',
  },
  {
    label: $t('全部充币记录'),
    name: 'all',
  },
]

const schemes = [
  {
    label: '选择币种',
    type: 'select',
    optionKey: 'coinOptions',
    valueKey: 'currentCoin',
  },
  {
    label: '链名称',
    type: 'radio',
    optionKey: 'chainOptions',
    valueKey: 'currentChain',
  },
  {
    label: '充币地址',
    type: 'code',
    valueKey: 'addr',
  },
]

const state = reactive<any>({
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
  state.currentRichText = state.currentChain.rechargeDescription
  // 在这里根据选中的链id后端查充币地址
  state.addr = 'TGeGoNrsTFgo4xUriPx2P6xshWrw7xMfcB'
}

const handleCoinChange = (item: any) => {
  state.currentCoin = item
  state.chainOptions = state.currentCoin.protocols.map((item: any) => ({
    ...item,
    label: item.protocol,
  }))
  state.currentChain = state.chainOptions[0]
  state.currentRichText = state.currentChain.rechargeDescription
  // 在这里根据选中的链id后端查充币地址
  state.addr =
    'TGeGoNrsTFgo4xUriPx2P6xshWrw7xMfcB' + Math.floor(Math.random() * 10000)
}

const handleChainChange = (item: any) => {
  state.currentChain = item
  state.currentRichText = state.currentChain.rechargeDescription
  // 在这里根据选中的链id后端查充币地址
  state.addr =
    'TGeGoNrsTFgo4xUriPx2P6xshWrw7xMfcB' + Math.floor(Math.random() * 10000)
}

const handleTableAction = (row: any) => {
  if (row.action.value === 'delete') {
    console.log('处理删除相关逻辑')
  }
}

const filteredData = computed(() => {
  if (state.currentTab === 'usdt') {
    return state.tableData.filter((item: any) => item.coin === 'usdt')
  } else {
    return state.tableData
  }
})
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
        width: 440px;
        .item {
          display: flex;
          justify-content: space-between;
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
            width: 280px;
            min-height: 30px;
            display: flex;
            flex-direction: column;
            justify-content: center;
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
          }
        }
      }
      .right {
        flex: 1;
        .richtext {
          padding: 10px 30px;
          background-color: rgb(255, 249, 232);
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
        }
      }
      .footer {
        padding: 16px;
      }
    }
  }
}
</style>
