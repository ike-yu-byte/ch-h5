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
        <div style="height: 370px">
          <TrendCharts></TrendCharts>
        </div>
        <div class="goods-box">
          <div class="sub-title">{{ $t('现货') }}</div>
          <table class="table">
            <thead>
              <tr>
                <th>{{ $t('币种') }}</th>
                <th>{{ $t('价格') }}</th>
                <th>{{ $t('涨跌幅') }}</th>
                <th width="264px">{{ $t('趋势图') }}</th>
                <th>{{ $t('操作') }}</th>
              </tr>
            </thead>
            <tfoot>
              <tr v-for="item of state.tableData.slice(0, 2)" :key="item.type">
                <td>
                  <div class="item">
                    <img class="img" :src="item.symbol" />
                    <span class="text">{{ item.type }}</span>
                  </div>
                </td>
                <td>
                  <div class="item">{{ item.price }}</div>
                </td>
                <td
                  :class="`rate ${parseFloat(item.rate) > 0 ? 'rise' : 'decrease'}`"
                >
                  <div class="item">
                    {{
                      item.rate && parseFloat(item.rate) > 0
                        ? `+ ${item.rate}`
                        : ''
                    }}%
                  </div>
                </td>
                <td class="trend item">
                  <div>
                    <TrendCharts :showAxis="false" :showMenus="false" />
                  </div>
                </td>
                <td>
                  <div class="action item">
                    <el-button>{{ $t('交易') }}</el-button>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
          <div class="btn" @click="handleViewMore('coin')">
            {{ $t('查看更多') }}
          </div>
        </div>
      </div>
    </div>
    <div class="addr-box">
      <div class="container-box">
        <div class="header">{{ $t('在这里读懂区块链') }}</div>
        <div class="sub-title">
          {{ $t('圈内人的精神加油站，让加密投资之旅更精彩') }}
        </div>
        <div class="banner-box">
          <div class="item" v-for="(item, index) of imgs" :key="index">
            <div>
              <img :src="item.img" />
            </div>
            <div class="title">{{ item.title }}</div>
            <div class="sub-title">{{ item.subtitle }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="step-box">
      <div class="contain-box">
        <div class="title">{{ $t('让加密交易，更容易') }}</div>
        <div class="sub-title">{{ $t('仅需3步，即可开始') }}</div>
        <div class="content">
          <div class="item" v-for="(item, index) of guides" :key="index">
            <div><img class="img" :src="item.img" /></div>
            <div class="title">{{ item.text }}</div>
            <div class="sub-title">{{ item.subtext }}</div>
            <el-button
              class="button"
              :color="item.color"
              @click="handleGuide(item)"
              >{{ item.btntext }}</el-button
            >
          </div>
        </div>
      </div>
      <div class="contain-box" style="margin-top: 100px">
        <div class="title">{{ $t('新闻与观点') }}</div>
        <div class="sub-title">{{ $t('精选文章、媒体提及和 Faith 采访') }}</div>
        <div class="goods-box">
          <div class="btn" @click="handleViewMore('news')">
            {{ $t('查看更多') }}
          </div>
        </div>
      </div>
    </div>
    <div class="gray-box">
      <div class="contain-box">
        <div class="text">{{ $t('与全球交易者一起享受加密货币之旅吧！') }}</div>
        <div class="btn-box">
          <div class="btn">{{ $t('立即注册') }}</div>
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
import TrendCharts from 'common-components/trendCharts/index.vue'
import img1 from '@/assets/img/imgs/community_img_1.png'
import img2 from '@/assets/img/imgs/community_img_2.png'
import img3 from '@/assets/img/imgs/community_img_3.png'
import guide1 from '@/assets/img/guides/index_icon_step1.png'
import guide2 from '@/assets/img/guides/index_icon_step2.png'
import guide3 from '@/assets/img/guides/index_icon_step3.png'
import { $t } from '@/i18n'

const { isPC } = toRefs(useDeviceStore())

const mockCoinList = []
const mockTableData = []
for (let i = 0; i < 30; i++) {
  mockCoinList.push({
    symbol: 'BTC/USDT' + i,
    price: 88716.9,
    rate: 4.61,
  })
  mockTableData.push({
    type: 'BTC',
    symbol:
      'https://img.idcs.io/tenants/12A9904584E555B10EA2ED6258D7C1EE/OtherFile60590046.png',
    price: '98,210.1000',
    rate: 0.42,
    trend: [],
  })
}

const imgs = ref([
  {
    img: img1,
    title: $t('观点'),
    subtitle: $t('顶级投资人观点'),
  },
  {
    img: img2,
    title: $t('快讯'),
    subtitle: $t('行业前沿信息推送, 7*24小时要闻实时更新'),
  },
  {
    img: img3,
    title: $t('文章'),
    subtitle: $t('聚合多家财经及科技媒体，提供全面且专业的资讯报道'),
  },
])

const guides = ref([
  {
    img: guide1,
    text: $t('第一步：创建账户'),
    subtext: $t('一键创建您的Faith账户'),
    btntext: $t('注册'),
    color: 'var(--dark-bg)',
    value: 'register',
  },
  {
    img: guide2,
    text: $t('第二步：购买加密货币'),
    subtext: $t('通过一键购币或P2P快捷购买加密货币'),
    btntext: $t('购买'),
    color: '',
    value: 'buy',
  },
  {
    img: guide3,
    text: $t('第三步：开始交易'),
    subtext: $t('使用高达500倍杠杆交易加密货币衍生品。'),
    btntext: $t('交易'),
    color: '',
    value: 'trade',
  },
])

const state = reactive<any>({
  tableData: mockTableData || [],
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

const handleViewMore = (type: string) => {
  if (type === 'coin') {
    console.log('type', type)
  } else if (type === 'news') {
    console.log('type', type)
  }
}

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

const handleGuide = (item: any) => {
  console.log('item', item)
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
      height: auto;
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
        .sub-title {
          margin: 20px 0 60px;
          color: rgba(0, 0, 0, 0.56);
          font-size: 18px;
          font-family: Figtree-Regular;
        }
        .content {
          display: flex;
          gap: 21px;
          .item {
            flex: 1;
            padding: 30px;
            background-color: #f4f5f8;
            border-radius: 20px 20px 20px 20px;
            .img {
              width: 70px;
              height: 70px;
            }
            .title {
              margin-top: 20px;
              font-size: 20px;
              line-height: 30px;
            }
            .sub-title {
              font-size: 14px;
              color: var(--text-color);
              line-height: 20px;
            }
            .button {
              margin-top: 50px;
            }
          }
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
        .goods-box {
          margin-top: 70px;
          .sub-title {
            color: var(--dark-bg);
            font-size: 20px;
            font-weight: 700;
            line-height: 30px;
          }
          .table {
            width: 100%;
            margin-top: 20px;
            border-collapse: collapse;
            thead {
              th {
                text-align: left;
                font-family: Figtree-Regular;
                font-size: 12px;
                color: var(--gray-color);
                font-weight: normal;
                &:last-child {
                  text-align: right;
                }
              }
            }
            tfoot {
              tr {
                td {
                  font-weight: normal;
                  font-family: Figtree-Regular;
                  .item {
                    height: 50px;
                    line-height: 50px;
                    padding: 15px 0;
                    display: flex;
                    align-items: center;
                    .img {
                      width: 22px;
                      height: 22px;
                      margin-right: 10px;
                    }
                    .text {
                      font-size: 16px;
                      color: rgb(23, 24, 26);
                      margin-top: -4px;
                    }
                  }
                }
                .rate {
                  &.rise {
                    color: rgb(18, 179, 125);
                  }
                  &.decrease {
                    color: red;
                  }
                }
                .trend {
                  div {
                    height: 50px;
                    width: 100%;
                  }
                }
                .action {
                  justify-content: right;
                }
              }
            }
          }
          .item {
            border-bottom: 1px solid var(--light-border);
          }
          .btn {
            height: 24px;
            margin-top: 20px;
            text-align: center;
            color: var(--menu-color);
            font-family: Figtree-Regular;
            cursor: pointer;
            display: block;
          }
        }
      }
    }
    .addr-box {
      height: 600px;
      padding: 100px 0;
      background-color: var(--dark-bg);
      .container-box {
        margin: 0 auto;
        height: 100%;
        width: 1200px;
        .header {
          font-size: 50px;
          font-weight: 700;
          color: var(--white-color);
        }
        .sub-title {
          color: var(--text-color);
          font-size: 18px;
          margin-top: 20px;
        }
        .banner-box {
          display: flex;
          margin-top: 44px;
          gap: 38px;
          height: 448px;
          .item {
            flex: 1;
            img {
              width: 375px;
              height: 365px;
            }
            .title {
              text-align: center;
              margin-top: 30px;
              font-size: 18px;
              color: var(--white-color);
            }
            .sub-title {
              text-align: center;
              color: #5b5d66;
              font-size: 14px;
              margin-top: 5px;
            }
          }
        }
      }
    }
    .gray-box {
      padding: 100px 0;
      background-color: #f4f5f8;
      .contain-box {
        width: 1200px;
        height: 164px;
        margin: 0 auto;
        .text {
          font-size: 48px;
          font-weight: 700;
          text-align: center;
        }
        .btn-box {
          margin-top: 50px;
          display: flex;
          justify-content: center;
          .btn {
            width: 200px;
            height: 54px;
            background-color: var(--dark-bg);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
