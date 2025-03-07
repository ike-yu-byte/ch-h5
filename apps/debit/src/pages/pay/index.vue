<template>
  <div class="pay-box">
    <div class="container">
      <div class="item left" v-if="isPC">
        <div class="title">
          <div class="line">{{ $t('玩转加密货币第一步') }}</div>
          <div class="line">{{ $t('快速购买USDT') }}</div>
        </div>
        <div class="sub-title">{{ $t('玩转加密货币第一步') }}</div>
        <div class="step-list">
          <img v-for="(item, index) of tabs" :src="item.img" :key="index" />
        </div>
      </div>
      <div class="item right">
        <div class="wrap">
          <div class="header">
            <img class="img" src="@/assets/img/logo_dark.png" />
            <div class="order" @click="handleTo('order')">{{ $t('订单') }}</div>
          </div>
          <div class="contain">
            <div class="card">
              <div class="top">
                <div class="left">
                  <div class="label">{{ $t('我要支付') }}</div>
                  <input
                    v-model="state.pay"
                    type="number"
                    border="none"
                    class="input"
                    :placeholder="
                      state.currentBank.MinAmount +
                      '-' +
                      state.currentBank.MaxAmount
                    "
                    @input="
                      (event: any) => handleInput(event.target.value, 'pay')
                    "
                  />
                </div>
                <div class="right">
                  <searchSelect
                    v-model="state.currentBank"
                    placement="bottom-end"
                    :options="state.bankOptions"
                    @change="(val: any) => handleSelectChange(val, 'pay')"
                  />
                </div>
              </div>
              <div class="bottom" v-if="!state.pay">
                {{ $t('请输入金额') }}
              </div>
              <div
                class="bottom"
                v-else-if="state.pay < state.currentBank.MinAmount"
              >
                {{
                  $t('最小购买金额', {
                    str: state.currentBank.MinAmount + state.currentBank.label,
                  })
                }}
              </div>
              <div
                class="bottom"
                v-else-if="state.pay > state.currentBank.MaxAmount"
              >
                {{
                  $t('最大购买金额', {
                    str: state.currentBank.MaxAmount + state.currentBank.label,
                  })
                }}
              </div>
            </div>
            <div class="card">
              <div class="top">
                <div class="left">
                  <div class="label">{{ $t('我将收到') }}</div>
                  <input
                    v-model="state.receive"
                    placeholder="0.00"
                    class="input"
                    @input="
                      (event: any) => handleInput(event.target.value, 'receive')
                    "
                  />
                </div>
                <div class="right">
                  <searchSelect
                    v-model="state.currentCurrency"
                    placement="bottom-end"
                    :options="state.currencyOptions"
                    @change="(val: any) => handleSelectChange(val, 'receive')"
                  />
                </div>
              </div>
              <div class="change-rate">
                <span>{{ '1USDT ≈ 1498.08 NGN' }}</span>
                <el-popover
                  placement="bottom"
                  :title="$t('预估兑换率')"
                  :width="200"
                  trigger="hover"
                  effect="dark"
                  :content="
                    $t(
                      '由于行情波动，兑换率为预估值，最终兑换数量以实际成交为准',
                    )
                  "
                >
                  <template #reference>
                    <span class="tip iconfont icon-tishi-tanhao"></span>
                  </template>
                </el-popover>
              </div>
              <div class="bottom" v-if="state.receive <= 0">
                {{ $t('请输入数量') }}
              </div>
            </div>
            <div class="order-box">
              <div class="line">
                <div class="left">{{ $t('您的订单') }}：</div>
                <div class="right">
                  {{ state.pay }} {{ state.currentBank.label }}
                  {{ $t('兑换') }}-{{ state.receive }}
                  {{ state.currentCurrency.label }}
                </div>
              </div>
              <div class="line">
                <div class="left" style="font-weight: normal">
                  {{ state.receive }} {{ state.currentCurrency.label }}
                </div>
                <div class="right">
                  {{
                    math.subtract(
                      math.bignumber(state.commossion || 0),
                      math.bignumber(state.receive || 0),
                    )
                  }}
                  {{ state.currentBank.label }}
                </div>
              </div>
              <div class="line">
                <div class="left">{{ $t('手续费') }}：</div>
                <div class="right">
                  {{ state.commossion || '0.00' }} {{ state.currentBank.label }}
                </div>
              </div>
            </div>
            <div class="pay-methods">
              <div class="title">{{ $t('支付方式') }}</div>
              <div class="select">
                <searchSelect
                  v-model="state.currentMethod"
                  placement="bottom-start"
                  bg="#fff"
                  :options="state.methodOptions"
                  @change="(val: any) => handleSelectChange(val, 'receive')"
                />
              </div>
              <div class="tip-box">
                <span>{{ $t('交易须知') }}</span>
                <span
                  class="icon iconfont icon-tishi-yiwen"
                  @click="handleMustKnown"
                ></span>
              </div>
              <div class="btn-box" @click="handleBuy">{{ $t('立即购买') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import payment1 from '@/assets/img/payment-01.png'
import payment2 from '@/assets/img/payment-02.png'
import payment3 from '@/assets/img/payment-03.png'
import payment4 from '@/assets/img/payment-04.png'
import { reactive } from 'vue'
import { currency, bank } from './mock'
import searchSelect from '@/components/searchSelect'
import { $t } from '@/i18n'
import MustKnown from '@/components/mustKnown'
import { ElMessage } from 'element-plus'
import { useDeviceStore } from '@/store'
import { toRefs } from 'vue'

const { isPC } = toRefs(useDeviceStore())

// 注意：计算相关费用需要解决js精度问题，用mathjs
import * as math from 'mathjs'
import { Modal } from 'common-components'
import { setItem, getItem } from 'common-assets'
import router from '@/router'

const state = reactive<any>({
  pay: 380.72, // 我要支付
  receive: 0.21, // 我将收到
  currentBank: {},
  currentCurrency: {},
  bankOptions: [],
  currencyOptions: [],
  changeRate: '1498.08', // 1usdt等于多少NGN (汇率来源？)
  commossion: '53.8', // 手续费
  methodOptions: [],
  currentMethod: {},
})

state.bankOptions = bank.map((item) => {
  return {
    ...item,
    label: item.currency,
    icon: item.PayTypeIco,
  }
})

state.currentBank = state.bankOptions[0] || {}

state.methodOptions = bank.map((item) => {
  return {
    ...item,
    label: item.currency,
    icon: item.PayTypeIco,
  }
})

state.currentMethod = state.methodOptions[0] || {}

state.currencyOptions = currency.map((item) => {
  return {
    ...item,
    label: item.Coin,
    icon: item.CoinIcon,
  }
})

state.currentCurrency = state.currencyOptions[0]

const tabs = [
  {
    label: '',
    img: payment1,
  },
  {
    label: '',
    img: payment2,
  },
  {
    label: '',
    img: payment3,
  },
  {
    label: '',
    img: payment4,
  },
]

const handleInput = (val: any, field: string) => {
  if (field === 'pay') {
    console.log('这里是处理逻辑', val)
  } else if (field === 'receive') {
    console.log('这里是处理逻辑', val)
  }
}

const handleSelectChange = (val: any, type: string) => {
  if (type === 'pay') {
    console.log('val', val)
  } else if (type === 'receive') {
    console.log('val', val)
  }
}

const handleMustKnown = () => {
  new Promise((resolve) => {
    Modal.open({
      content: MustKnown,
      title: $t('重要提示：交易须知'),
      draggable: true,
      className: 'must-know-box',
      onConfirm: (obj: any) => {
        let flag = false
        for (let key in obj.compRef.value.state) {
          if (!obj.compRef.value.state[key] && key !== 'noshow') {
            ElMessage({
              type: 'warning',
              message: $t('请同意全部条款'),
              duration: 1000,
            })
            flag = true
            break
          }
        }
        if (flag) return
        if (obj.compRef.value.state.noshow) {
          // 三天内不再提示
          setItem('noshow', 'true', 24 * 3600 * 3)
        }
        Modal.close()
        resolve(true)
      },
    })
  })
}

const handleBuy = async () => {
  // 三天内不再提示
  const noshow = getItem('noshow')
  if (!noshow) {
    await handleMustKnown()
    handleSubmit()
  } else {
    handleSubmit()
  }
}

const handleSubmit = () => {
  ElMessage({
    type: 'success',
    message: $t('购买成功'),
    duration: 1000,
  })
}

const handleTo = (name: string) => {
  router.push({ name })
}
</script>

<style scoped lang="scss">
.pay-box {
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    padding: 50px 0;
    .left {
      display: flex;
      justify-content: center;
      flex-direction: column;
      .title {
        width: 100%;
        color: var(--dark-bg);
        font-size: 50px;
        font-family: Figtree-Regular;
        font-weight: 700;
      }
      .sub-title {
        margin-top: 20px;
        font-size: 20px;
      }
      .step-list {
        margin-top: 40px;
        .img {
          margin-right: 20px;
        }
      }
    }
    .right {
      height: 675px;
      display: flex;
      justify-content: center;
      .wrap {
        border-radius: 8px;
        height: 100%;
        width: 480px;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 10px 0px;
        outline-color: rgb(130, 139, 161);
        background-color: #fff;
        .header {
          height: 44px;
          padding: 20px 20px 0;
          display: flex;
          justify-content: space-between;
          .order {
            padding: 6px 20px;
            border: 1px solid rgba(0, 0, 0, 0.2);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            cursor: pointer;
            height: 22px;
          }
        }
        .contain {
          padding: 30px;
          height: calc(100% - 44px);
          .card {
            &:first-child {
              margin-bottom: 30px;
            }
            .top {
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 74px;
              padding: 10px;
              border: 1px solid rgba(205, 214, 235, 0.3);
              border-radius: 10px;
              box-sizing: border-box;
              .left {
                display: block;
                .input {
                  border: none;
                  padding: 4px 0px;
                  height: 22px;
                  font-size: 22px;
                  font-family: Figtree-Regular;
                }
                input[type='number']::-webkit-outer-spin-button,
                input[type='number']::-webkit-inner-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                }

                /* Firefox */
                input[type='number'] {
                  -moz-appearance: textfield;
                }
                input {
                  &::placeholder {
                    color: #d7e8f7;
                  }
                }
                .label {
                  font-size: 12px;
                  color: #a0a3b3;
                  font-family: Figtree-Regular;
                }
              }
              .right {
                min-width: 120px;
                height: 45px;
              }
            }
            .bottom {
              color: var(--red-color);
              font-family: Figtree-Regular;
              font-size: 14px;
            }
            .change-rate {
              color: var(--gray-color);
              font-size: 14px;
              margin-top: 5px;
              font-family: Figtree-Regular;
              .tip {
                margin-left: 4px;
                color: rgba(54, 70, 109, 0.75);
                cursor: pointer;
              }
            }
          }
          .order-box {
            height: 84px;
            padding: 10px;
            margin: 20px 0 24px;
            background-color: rgb(239, 239, 239);
            border-radius: 6px;
            .line {
              display: flex;
              height: 22px;
              padding-top: 6px;
              justify-content: space-between;
              font-size: 14px;
              color: rgba(54, 70, 109, 0.75);
              font-family: Figtree-Regular;
              .left {
                font-weight: bold;
              }
              .right {
                height: 100%;
              }
            }
          }
          .pay-methods {
            .title {
              font-size: 14px;
              margin-bottom: 8px;
              font-family: Figtree-Regular;
            }
            .select {
              height: 54px;
            }
            .tip-box {
              font-size: 14px;
              padding: 4px 15px;
              margin-top: 4px;
              color: var(--dark-bg);
              .icon {
                font-size: 14px;
                margin-left: 6px;
                font-weight: bold;
                cursor: pointer;
              }
            }
            .btn-box {
              padding: 12px;
              height: 20px;
              border-radius: 35px;
              background-color: var(--dark-bg);
              margin-top: 30px;
              display: flex;
              justify-content: center;
              align-items: center;
              color: var(--white-color);
              cursor: pointer;
            }
          }
        }
      }
    }
    .item {
      width: 50%;
    }
  }
}
.mobile {
  .pay-box {
    .container {
      width: auto;
      flex-direction: column;
      .item {
        width: calc(100% - 30px);
        margin: 0 auto;
      }
      .right {
        // margin: 20px;
        .wrap {
          width: 100%;
          .contain {
            // padding: 0 40px;
            .card {
              .top {
                .left {
                  display: inline-block;
                  width: 150px;
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
