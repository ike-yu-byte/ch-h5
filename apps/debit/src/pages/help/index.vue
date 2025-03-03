<template>
  <div class="notice-box">
    <div class="wrap dark">
      <div class="contain">
        <div class="box">
          <div class="left">
            <div class="title">{{ $t('获取更多帮助') }}</div>
            <el-input
              v-model="state.inputVal"
              :prefix-icon="Search"
              :placeholder="$t('输入搜索关键词')"
              clearable
              @input="handleFilter"
            ></el-input>
          </div>
          <div class="right">
            <img src="@/assets/img/support.png" />
          </div>
        </div>
      </div>
    </div>
    <div class="wrap">
      <div class="contain2">
        <div class="title">{{ $t('帮助') }}</div>
        <div class="content">
          <template v-if="state.noticeList.length">
            <div
              class="item"
              v-for="(item, index) of state.inputVal
                ? state.filterList
                : state.noticeList"
              :key="index"
            >
              <span class="time">{{ item.title }}</span>
              <span class="label">{{ item.content }}</span>
            </div>
          </template>
          <Empty v-else></Empty>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { reactive } from 'vue'
import Empty from '@/components/empty'
const mockData = []
for (let i = 0; i < 10; i++) {
  mockData.push({
    pic: '',
    content: '点击页面顶部的注册按钮跳转注册页面',
    title: '如何注册账号？',
  })
}

const state = reactive<any>({
  inputVal: '',
  noticeList: mockData || [],
  filterList: [],
})

const handleFilter = (val: string) => {
  state.filterList = state.noticeList.filter((item: any) =>
    item.title.includes(val),
  )
}
</script>

<style scoped lang="scss">
.notice-box {
  .wrap {
    .contain {
      width: 756px;
      margin: 0 auto;
      .box {
        display: flex;
        padding: 40px 0;
        .left {
          width: 231px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .title {
            margin-bottom: 10px;
            font-size: 16px;
            color: var(--white-color);
          }
        }
        .right {
          img {
            margin-left: 230px;
          }
        }
      }
    }
    .contain2 {
      width: 1200px;
      margin: 0 auto;
      padding: 50px 0;
      .title {
        font-size: 18px;
        padding: 20px 0;
        line-height: 28px;
        border-bottom: 1px solid var(--light-border3);
      }
      .content {
        .item {
          line-height: 40px;
          border-bottom: 1px solid var(--light-border3);
          .time {
            margin-right: 20px;
            font-weight: 700;
          }
        }
        .empty-box {
          padding: 50px 0;
        }
      }
    }
  }
  .dark {
    background-color: var(--dark-bg);
  }
}
.mobile {
  .notice-box {
    .wrap {
      .contain,
      .contain2 {
        padding: 0 16px;
        width: auto;
        .box {
          flex-direction: column;
          .left {
            width: auto;
            margin-bottom: 20px;
          }
          .right {
            text-align: center;
            img {
              margin-left: 0;
              width: 235px;
              height: 235px;
            }
          }
        }
        .title {
          font-size: 16px;
        }
        .content {
          .item {
            line-height: 30px;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
