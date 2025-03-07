<template>
  <div class="exchange-wrap">
    <div class="wrap black">
      <div class="contain">
        <div class="left">
          <div class="title">{{ $t('0手续费') }}</div>
          <div class="sub-title">
            <span class="text">{{ $t('一键式买卖') }}</span
            ><span>{{ $t('任意交易对') }}</span>
          </div>
        </div>
        <div class="right" v-if="isPC">
          <img :src="bannerPng" class="img" />
        </div>
      </div>
    </div>
    <div class="wrap">
      <div class="contain contain2">
        <div class="card-box">
          <div class="header">
            <div class="label">{{ $t('闪兑') }}</div>
            <div class="order" @click="handleTo('order')">{{ $t('订单') }}</div>
          </div>
          <div class="row">
            <div class="top">
              <el-input
                :placeholder="`${state.currentFrom.min}-${state.currentFrom.max}`"
                v-model="state.fromVal"
                type="number"
                @change="handleInputFromChange"
                @input="(val: any) => handleTips('from', val)"
              ></el-input>
              <searchSelect
                :options="options"
                v-model="state.currentFrom"
                @change="handleFromChange"
              />
            </div>
            <div class="tips">{{ state.fromTip }}</div>
            <div class="bottom">
              <div class="label">{{ $t('消耗') }}</div>
              <div class="actions">
                <span class="text"
                  >{{ $t('余额') }}: {{ state.currentFrom.balance }}
                  {{ state.currentFrom.label }}</span
                >
                <span
                  class="btn"
                  @click="state.fromVal = state.currentFrom.max"
                  >{{ $t('最大') }}</span
                >
                <span class="btn" @click="handleTo('recharge')">{{
                  $t('充值')
                }}</span>
              </div>
            </div>
          </div>
          <div class="devide-box">
            <img
              src="@/assets/img/icon_trade.png"
              class="img"
              @click="handleChangeDirection"
            />
          </div>
          <div class="row" style="margin-top: 0px">
            <div class="top">
              <el-input
                v-model="state.toVal"
                :placeholder="`${state.currentTo.min}-${state.currentTo.max}`"
                type="number"
                @change="handleInputToChange"
                @input="(val: any) => handleTips('to', val)"
              ></el-input>
              <searchSelect
                :options="state.toOptions"
                v-model="state.currentTo"
              />
            </div>
            <div class="bottom">
              <div class="label">{{ $t('获得') }}</div>
              <div class="actions">
                <el-popover
                  effect="dark"
                  :content="
                    $t(
                      '预估兑换:率由于行情波动，兑换率为预估值，最终兑换数量以实际成交为准',
                    )
                  "
                  placement="top-start"
                >
                  <template #reference>
                    <span class="icon iconfont icon-tishi-yiwen"></span>
                  </template>
                </el-popover>
                <span class="text">{{ $t('预估值') }}: </span>
                <span class="text">1 USDT ≈ 0.00045490ETH</span>
              </div>
            </div>
          </div>
          <div class="btn-box">
            <Btn
              :text="$t('兑换为') + state.currentTo.label"
              @click="handleSubmit"
            ></Btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import bannerPng from '@/assets/img/banner.png'
import searchSelect from '@/components/searchSelect'
import Btn from '@/components/button'
import { reactive, ref, toRefs } from 'vue'
import { $t } from '@/i18n'
import router from '@/router'
import { useDeviceStore } from '@/store'

const { isPC } = toRefs(useDeviceStore())

const options = ref([
  {
    value: 'APqFnATs2U6oYPFxJjAooQ',
    label: 'ETH',
    icon: 'https://img.idcs.io/tenants/12A9904584E555B10EA2ED6258D7C1EE/OtherFile98701808.png',
    min: 0.001,
    max: 10,
    balance: 100, // 余额
  },
  {
    value: '1xx3-k3olkGgIwEiPqwXMw',
    label: 'BTC',
    icon: 'https://img.idcs.io/tenants/12A9904584E555B10EA2ED6258D7C1EE/OtherFile60590046.png',
    min: 0.0001,
    max: 1000,
    balance: 100, // 余额
  },
  {
    value: 'bPqFnATs2U6oYPFxJjAooQ',
    label: 'USDT',
    icon: 'https://img.idcs.io/tenants/12A9904584E555B10EA2ED6258D7C1EE/OtherFile82085057.png',
    min: 0.01,
    max: 20000,
    balance: 100, // 余额
  },
])

const state = reactive<any>({
  fromTip: '',
  toTip: '',
  fromVal: '',
  toVal: '',
  currentFrom: {},
  currentTo: {},
  toOptions: [],
})
state.currentFrom = options.value[0]

state.toOptions = options.value.filter(
  (item) => item.value !== state.currentFrom.value,
)
state.currentTo = state.toOptions[0]

const handleFromChange = () => {
  state.toOptions = options.value.filter(
    (item) => item.value !== state.currentFrom.value,
  )
  state.currentTo = state.toOptions[0]
}

const handleInputFromChange = (val: any) => {
  console.log('val', val)
  // 根据值换算获得的值
  // state.toVal = ''
}

const handleInputToChange = (val: any) => {
  console.log('val to', val)
  // 根据获得的值计算消耗值
  // state.fromVal = ''
}

const handleSubmit = () => {
  if (state.fromTip || state.toTip) return
  console.log('提交')
}

const handleChangeDirection = () => {
  const tempOption = JSON.parse(JSON.stringify(state.currentFrom))
  state.currentFrom = state.currentTo
  state.currentTo = tempOption
  state.toOptions = options.value.filter(
    (item) => item.value !== state.currentFrom.value,
  )
}

const handleTips = (type: string, val: any) => {
  if (type === 'from') {
    if (val < state.currentFrom.min) {
      state.fromTip =
        $t('最小兑换') + state.currentFrom.min + state.currentFrom.label
    } else if (val > state.currentFrom.max) {
      state.fromTip =
        $t('最大兑换') + state.currentFrom.max + state.currentFrom.label
    } else if (val > state.currentFrom.balance) {
      state.fromTip = $t('资产不足')
    } else {
      state.fromTip = ''
    }
  } else if (type === 'to') {
    if (val < state.currentTo.min) {
      state.toTip = $t('最小兑换') + state.currentTo.min + state.currentTo.label
    } else if (val > state.currentFrom.max) {
      state.toTip = $t('最大兑换') + state.currentTo.max + state.currentTo.label
    } else {
      state.toTip = ''
    }
  }
}

const handleTo = (name: string) => {
  router.push({
    name,
  })
}
</script>

<style scoped lang="scss">
.wrap {
  font-family: Figtree-Regular;
  .contain {
    height: 350px;
    width: 1200px;
    margin: 0 auto;
    display: flex;
    padding: 40px 20px;
    .left {
      width: 833px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .title {
        font-size: 68px;
        color: var(--white-color);
        font-weight: 700;
      }
      .sub-title {
        font-size: 30px;
        color: var(--text-color);
        margin-top: 14px;
        .text {
          margin-right: 50px;
        }
      }
    }
    .right {
      flex: 1;
      .img {
        width: 367px;
      }
    }
  }
  .contain2 {
    height: 422px;
    padding: 83px 0;
    display: flex;
    justify-content: center;
    .card-box {
      width: 510px;
      height: 362px;
      padding: 30px;
      border-radius: 15px;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 20px 0px;
      .header {
        display: flex;
        justify-content: space-between;
        .label {
          font-size: 20px;
          color: rgb(23, 24, 26);
        }
        .order {
          padding: 6px 20px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          height: 22px;
          border-radius: 20px;
          font-size: 14px;
          color: rgb(130, 139, 161);
          cursor: pointer;
        }
      }
      .row {
        height: 98px;
        border: 1px solid rgba(205, 214, 235, 0.6);
        margin-top: 30px;
        border-radius: 10px;
        .top {
          height: 35px;
          padding: 15px 15px 0;
          display: flex;
          gap: 10px;
          :deep(.el-input__wrapper) {
            box-shadow: none;
          }
          :deep(.search-select) {
            width: 106px;
          }
          :deep(.el-input__inner::placeholder) {
            font-size: 18px;
            color: #cfd6eb;
          }
          :deep(.el-input__inner) {
            font-size: 18px;
          }
        }
        .tips {
          font-size: 14px;
          color: #ff4d4f;
          padding: 0 15px;
          height: 15px;
        }
        .bottom {
          display: flex;
          justify-content: space-between;
          padding: 5px 15px 10px;
          .label {
            color: var(--dark-bg);
            font-size: 12px;
          }
          .actions {
            .icon {
              font-size: 10px;
              color: rgb(180, 188, 204);
              font-weight: bold;
              margin-right: 4px;
              cursor: pointer;
            }
            .text {
              font-size: 10px;
              color: rgb(180, 188, 204);
            }
            .btn {
              padding: 5px;
              height: auto;
              margin-left: 10px;
              background-color: rgba(0, 0, 0, 0.1);
              font-size: 10px;
              cursor: pointer;
            }
          }
        }
      }
      .devide-box {
        text-align: center;
        .img {
          height: 40px;
          width: 40px;
          cursor: pointer;
        }
      }
      .btn-box {
        margin: 30px 0;
      }
    }
  }
}
.black {
  background-color: var(--dark-bg);
}
.white {
  background-color: var(--white-color);
}
.mobile {
  .wrap {
    .contain {
      width: auto;
    }
    .contain:not(.contain2) {
      width: auto;
      height: 91px;
      padding: 50px 20px;
      .left {
        .title {
          font-size: 24px;
          text-align: center;
        }
        .sub-title {
          font-size: 16px;
          text-align: center;
          height: 40px;
          line-height: 40px;
          margin-top: 15px;
        }
      }
    }
  }
}
</style>
