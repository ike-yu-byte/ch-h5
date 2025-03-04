<template>
  <div class="degit-box">
    <van-popup
      position="left"
      v-model:show="state.show"
      :style="{
        padding: '0px',
        width: '100vw',
        height: '100vh',
        margin: '0px',
      }"
      ><Select :options="state.list" @change="handleSelectChange"></Select
    ></van-popup>
    <div class="contain">
      <div class="left" v-show="isPC">
        <Select :options="state.list" @change="handleSelectChange"></Select>
      </div>
      <div class="overlay" v-show="!isPC">
        <span
          class="icon iconfont icon-yidongduan_caidan"
          @click="state.show = true"
        ></span>
      </div>
      <div class="right">
        <div class="header">
          <span>{{ state.currentItem.label || '  ' }}</span>
          <div class="btn" @click="handleTo('panel', state.currentItem)">
            {{ $t('去交易') }}
          </div>
        </div>
        <div class="list">
          <div class="zuo">
            <div class="item">
              <div class="label">{{ $t('名称') }}</div>
              <div class="value">{{ state.currentItem.label || '' }}</div>
            </div>
            <div class="item">
              <div class="label">{{ $t('发行时间') }}</div>
              <div class="value">{{ state.currentItem.releaseTime || '' }}</div>
            </div>
            <div class="item">
              <div class="label">{{ $t('流通总量') }}</div>
              <div class="value">{{ state.currentItem.flowAmount || '' }}</div>
            </div>
            <div class="item">
              <div class="label">{{ $t('总量') }}</div>
              <div class="value">{{ state.currentItem.totalAmount || '' }}</div>
            </div>
          </div>
          <div class="you">
            <div class="title">{{ $t('图片和社区链接') }}</div>
            <div class="links">
              <a
                class="link"
                :href="state.currentItem.blockChainUrl"
                target="_blank"
                v-show="state.currentItem.blockChainUrl"
              >
                <i class="iconfont icon-xianshiqi"></i>
                <span>{{ $t('区块查询') }}</span>
              </a>
              <a
                class="link"
                :href="state.currentItem.whitePaperUrl"
                target="_blank"
                v-show="state.currentItem.whitePaperUrl"
              >
                <i class="iconfont icon-qukuailian"></i>
                <span>{{ $t('白皮书') }}</span>
              </a>
              <a
                class="link"
                :href="state.currentItem.siteUrl"
                target="_blank"
                v-show="state.currentItem.siteUrl"
              >
                <i class="iconfont icon-wendang"></i>
                <span>{{ $t('官网') }}</span>
              </a>
            </div>
          </div>
        </div>
        <div class="richtext" v-html="state.currentItem.Context"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import { mockData } from './mock'
import router from '@/router'
import Select from './select.vue'
import { useDeviceStore } from '@/store'

const { isPC } = toRefs(useDeviceStore())

const state = reactive<any>({
  show: false,
  list: [],
  currentItem: {},
})

state.list = mockData.map((item: any) => {
  return {
    ...item,
    label: item.Name,
    context: item.Context,
    releaseTime: item.ReleaseTime,
    flowAmount: item.FlowAmount,
    totalAmount: item.TotalAmount,
    blockChainUrl: item.BlockChainUrl,
    whitePaperUrl: item.WhitePaperUrl,
    siteUrl: item.SiteUrl,
  }
})

const handleSelectChange = (item: any) => {
  state.currentItem = item
  state.show = false
}

const handleTo = (name: string, item: any) => {
  router.push({
    name,
    query: {
      symbol: item.label,
    },
  })
}
</script>

<style scoped lang="scss">
.degit-box {
  font-family: Figtree-Regular;
  .contain {
    width: 1532px;
    margin: 0 auto;
    display: flex;
    padding: 20px 0 100px;
    column-gap: 100px;
    .left {
      width: 300px;
      border: 1px solid var(--light-border3);
      box-sizing: border-box;
    }
    .right {
      flex: 1;
      .header {
        font-size: 14px;
        font-weight: 700;
        color: var(--text-color);
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .btn {
          padding: 10px 40px;
          background-color: var(--dark-color);
          color: var(--white-color);
          border-radius: 4px;
        }
      }
      .list {
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
        .zuo {
          display: flex;
          .item {
            height: 78px;
            min-width: 180px;
            .label {
              font-size: 14px;
              color: var(--gray-color);
            }
            .value {
              font-size: 14px;
              color: var(--menu-color);
            }
          }
        }
        .you {
          width: 208px;
          .title {
            margin: 20px 0 10px;
          }
          .links {
            display: flex;
            a {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              i {
                width: 30px;
                height: 30px;
                display: inline-block;
                background-color: var(--dark-color);
                color: var(--white-color);
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 16px;
              }
              span {
                padding-top: 10px;
                font-size: 14px;
                color: var(--menu-color);
              }
            }
          }
        }
      }
      .richtext {
        padding-top: 50px;
      }
    }
  }
}
.mobile {
  .degit-box {
    position: relative;
    .contain {
      width: auto;
      padding: 0 16px;
      display: block;
      .overlay {
        padding-top: 20px;
        .icon {
          color: var(--text-color);
          font-size: 18px;
        }
      }
      .right {
        width: auto;
        .list {
          flex-direction: column;
          .zuo {
            flex-wrap: wrap;
            .item {
              width: 50%;
              min-width: unset;
              height: auto;
              margin-bottom: 10px;
            }
          }
          .you {
            width: auto;
          }
        }
        .richtext {
          padding: 10px 0 20px;
        }
      }
    }
  }
}
</style>
