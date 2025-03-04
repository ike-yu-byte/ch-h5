<template>
  <div class="degit-box">
    <div class="contain">
      <div class="left">
        <div class="header">
          <div class="title">{{ $t('数字资产列表') }}</div>
          <el-input
            v-model="state.inputVal"
            :suffix-icon="Search"
            clearable
          ></el-input>
        </div>
        <div class="content">
          <div
            :class="`item ${item.FullName === state.currentItem.FullName ? 'active' : ''}`"
            v-for="(item, index) of state.list"
            :key="index"
            @click="handleSelect(item)"
          >
            {{ item.FullName }}
          </div>
        </div>
      </div>
      <div class="right">
        <div class="header">
          <span>{{ state.currentItem.FullName || '  ' }}</span>
          <div class="btn" @click="handleTo('panel', item)">
            {{ $t('去交易') }}
          </div>
        </div>
        <div class="list">
          <div class="zuo">
            <div class="item">
              <div class="label">{{ $t('名称') }}</div>
              <div class="value">{{ state.currentItem.FullName || '' }}</div>
            </div>
            <div class="item">
              <div class="label">{{ $t('发行时间') }}</div>
              <div class="value">{{ state.currentItem.ReleaseTime || '' }}</div>
            </div>
            <div class="item">
              <div class="label">{{ $t('流通总量') }}</div>
              <div class="value">{{ state.currentItem.FlowAmount || '' }}</div>
            </div>
            <div class="item">
              <div class="label">{{ $t('总量') }}</div>
              <div class="value">{{ state.currentItem.TotalAmount || '' }}</div>
            </div>
          </div>
          <div class="you">
            <div class="title">{{ $t('图片和社区链接') }}</div>
            <div class="links">
              <a class="link" :href="state.currentItem.BlockChainUrl">
                <i class="iconfont icon-xianshiqi"></i>
                <span>{{ $t('区块查询') }}</span>
              </a>
              <a class="link" :href="state.currentItem.BlockChainUrl">
                <i class="iconfont icon-qukuailian"></i>
                <span>{{ $t('区块查询') }}</span>
              </a>
              <a class="link" :href="state.currentItem.BlockChainUrl">
                <i class="iconfont icon-wendang"></i>
                <span>{{ $t('官网') }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { reactive } from 'vue'
import { mockData } from './mock'
import router from '@/router'

const state = reactive<any>({
  inputVal: '',
  list: [],
  currentItem: {},
})

state.list = mockData

const handleSelect = (item: any) => {
  state.currentItem = item
}

const handleTo = (name: string, item: any) => {
  router.push({
    name,
    query: {
      symbol: item.FullName,
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
      .header {
        padding: 20px;
        .title {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-color);
          margin-bottom: 5px;
        }
      }
      .content {
        .item {
          height: 30px;
          padding: 10px 20px;
          line-height: 30px;
          cursor: pointer;
          border-top: 1px solid var(--light-border3);
          color: var(--gray-color);
          &:hover {
            background-color: var(--hover-bg);
          }
        }
        .active {
          background-color: var(--hover-bg);
          color: var(--dark-color);
        }
      }
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
            }
          }
        }
      }
    }
  }
}
</style>
