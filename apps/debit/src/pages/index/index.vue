<template>
  <div class="index-box">
    <div class="main-box">
      <div class="contain-box">
        <div class="left panel">
          <div class="title">
            {{ $t('在Debit上交易加密货币、外汇及更多标的') }}
          </div>
          <div class="sub-title">
            {{
              $t(
                '100多万平台注册用户，1000多种资产类别，加入我们，一键跟随交易高手投资交易',
              )
            }}
          </div>
          <div class="number-box">
            <div class="left item">
              <div class="value">
                <CountTo
                  :startVal="state.turnover.startNum"
                  :endVal="state.turnover.endNum"
                  :duration="2000"
                  class="number"
                ></CountTo>
                <span class="unit">{{ state.turnover.unit }}</span>
              </div>
              <div class="label">24hr{{ $t('成交量') }}</div>
            </div>
            <div class="middle item">
              <div class="value">
                <CountTo
                  :startVal="state.users.startNum"
                  :endVal="state.users.endNum"
                  :duration="2000"
                  :decimals="0"
                  class="number"
                ></CountTo>
                <span class="unit">{{ state.users.unit }}</span>
              </div>
              <div class="label">{{ $t('用户') }}</div>
            </div>
            <div class="right item">
              <div class="value">
                <CountTo
                  :startVal="state.trades.startNum"
                  :endVal="state.trades.endNum"
                  :duration="2000"
                  class="number"
                ></CountTo>
                <span class="unit">{{ state.trades.unit }}</span>
              </div>
              <div class="label">{{ $t('支持的交易对') }}</div>
            </div>
          </div>
          <div class="use-box">
            <el-input
              class="my-input"
              :placeholder="$t('邮件/电话')"
              inputStyle="color: #fff;"
              v-model="state.inputVal"
            >
              <template #suffix>
                <span class="register-now" @click="handleRegister">{{
                  $t('立即注册')
                }}</span>
              </template>
            </el-input>
          </div>
        </div>
        <div class="right panel" v-if="isPC">
          <video
            class="video"
            poster="/img/img_top_poster.jpg"
            muted
            @canplaythrough="handleCanplay"
            @ended="handleCanplay"
            ref="videoRef"
          >
            <source src="/video/img_top.webm" type="video/webm" />
            <source src="/video/img_top.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
    <div class="market-lists">
      <Vue3SeamlessScroll
        :list="state.coinList"
        :direction="'left' as any"
        :hover="true as any"
        :singleLine="true as any"
      >
        <template #default="{ data }">
          <view class="symbol-item">
            <span class="symbol">{{ data.symbol }}</span>
            <span class="price"> ({{ Number(data.price).toFixed(8) }}) </span>
            <span
              :class="`rate ${parseFloat(data.rate) >= 0 ? 'increase' : 'decrease'}`"
              >{{ data.rate }}%</span
            >
          </view>
        </template>
      </Vue3SeamlessScroll>
    </div>
    <div class="step-box">
      <div class="contain-box">
        <div class="title">{{ $t('市场趋势') }}</div>
        <div class="coin">
          <div class="left">
            <div class="top">
              <img :src="state.coinData.logo" class="img" />
              <span class="unit">{{ state.coinData.title }}</span>
            </div>
            <div class="value">
              <CountTo
                :startVal="state.coinData.startNum"
                :endVal="state.coinData.endNum"
                :duration="2000"
                :decimals="4"
                class="number"
              ></CountTo>
              <span class="rate">
                <span
                  :class="`val ${Number(state.coinData.rate) > 0 ? 'increase' : 'decrease'}`"
                  >{{ state.coinData.rate }}%</span
                >
                <span
                  :class="`iconfont icon-xia ${Number(state.coinData.rate) > 0 ? 'rotate' : ''}`"
                ></span>
              </span>
            </div>
          </div>
          <div class="right">{{ $t('立即交易') }}</div>
        </div>
        <div style="height: 300px">
          <LineCharts></LineCharts>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue'
import { CountTo } from 'vue3-count-to'
import router from '@/router'
import { useDeviceStore } from '@/store'
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'
import LineCharts from 'common-components/LineCharts/index.vue'

const { isPC } = toRefs(useDeviceStore())

const mockCoinList = []
for (let i = 0; i < 30; i++) {
  mockCoinList.push({
    symbol: 'BTC/USDT' + i,
    price: 88716.9,
    rate: 4.61,
  })
}

const state = reactive<any>({
  turnover: {
    // 成交量
    startNum: 0, // 数字滚动开始值
    endNum: 0, // 数字滚动结束
    unit: 'USD',
  },
  users: {
    // 用户数
    startNum: 0, // 数字滚动开始值
    endNum: 0, // 数字滚动结束
    unit: '+',
  },
  trades: {
    // 支持的交易
    startNum: 0, // 数字滚动开始值
    endNum: 0, // 数字滚动结束
    unit: '+',
  },
  inputVal: '',
  coinList: mockCoinList || [],
  coinData: {
    logo: '/img/BTC.png',
    title: 'BTC/USDT',
    startNum: 0, // 数字滚动开始值
    endNum: 98265.6, // 数字滚动结束
    rate: '1.13',
  },
})

state.turnover.endNum = 10000000
state.users.endNum = 100000
state.trades.endNum = 10

const videoRef = ref()

const handleCanplay = () => {
  videoRef.value?.play()
}

const handleRegister = () => {
  router.push({ name: 'register' })
}
</script>

<style lang="scss" scoped>
.pc {
  .index-box {
    .main-box {
      height: 640px;
      background-color: var(--dark-bg);
      .contain-box {
        width: 1200px;
        height: 560px;
        margin: 0 auto;
        padding-top: 80px;
        display: flex;
        gap: 100px;
        .panel {
          flex: 1;
        }
        .left {
          // background-color: red;
          max-width: 500px;
          .title {
            font-size: 60px;
            color: var(--white-color);
            font-weight: 700;
            margin-bottom: 20px;
          }
          .sub-title {
            color: var(--text-color);
            font-size: 18px;
            line-height: 28px;
          }
          .number-box {
            height: 60px;
            margin-top: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            column-gap: 50px;
            .item {
              .value {
                font-size: 24px;
                color: var(--white-color);
                font-weight: 900;
                line-height: 38px;
                .unit {
                  margin-left: 4px;
                }
              }
              .label {
                font-size: 14px;
                color: var(--text-color);
              }
            }
            .middle {
              .label {
                text-align: center;
              }
            }
          }
        }
        .right {
          flex: 1;
          height: 100%;
          .video {
            width: 99%;
            height: 100%;
            border: none;
          }
        }
      }
      .use-box {
        height: 50px;
        margin-top: 50px;
        .my-input {
          height: 50px !important;
          width: 327px !important;
          :deep(.el-input__wrapper) {
            background-color: var(--input-bg) !important;
            border: none !important;
            box-shadow: none !important;
            padding-right: 0px !important;
          }
        }
        .register-now {
          height: 48px;
          padding: 1px 6px;
          width: 118px;
          background-color: var(--white-color);
          border-radius: 0 6px 6px 0;
          line-height: 48px;
          color: var(--dark-color);
        }
      }
    }
    .market-lists {
      height: 60px;
      background-color: #121212;
      overflow: hidden;
      .symbol-item {
        height: 60px;
        display: inline-block;
        margin: 0 20px;
        line-height: 60px;
        .symbol {
          color: var(--white-color);
          margin-right: 4px;
        }
        .price {
          color: rgb(130, 139, 161);
        }
        .increase {
          color: #00b478;
        }
        .decrease {
          color: red;
        }
      }
    }
    .step-box {
      padding: 100px 0;
      height: 800px;
      background-color: var(--white-color);
      .contain-box {
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        .title {
          color: var(--dark-bg);
          font-size: 50px;
          font-weight: 700;
          line-height: 60px;
        }
        .coin {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 10px 0;
          height: 72px;
          .right {
            display: inline-block;
            padding: 0 15px;
            border: 1px solid var(--border-color);
            font-size: 16px;
            border-radius: 5px;
            height: 44px;
            line-height: 44px;
            font-weight: 700;
            cursor: pointer;
          }
          .left {
            .top {
              display: flex;
              height: 30px;
              .img {
                width: 30px;
                height: 30px;
                margin-right: 10px;
              }
              .unit {
                font-size: 18px;
                font-weight: bold;
                line-height: 30px;
                color: rgb(23, 24, 26);
              }
            }
            .value {
              height: 32px;
              padding-top: 10px;
              .number {
                font-size: 22px;
                color: rgb(23, 24, 26);
                font-weight: 700;
                font-family: Figtree-Regular;
              }
              .rate {
                color: rgb(18, 179, 125);
                margin-left: 8px;
                .iconfont {
                  margin-left: 6px;
                }
                .rotate {
                  transform: rotate(180deg);
                  display: inline-block;
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
