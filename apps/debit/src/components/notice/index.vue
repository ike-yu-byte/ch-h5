<template>
  <div class="notice-box">
    <template v-if="data.length">
      <div class="notice-item" v-for="item of data" :key="item.title">
        <div class="left">
          <img src="/img/msg.png" class="pic" />
        </div>
        <div class="right">
          <el-tooltip
            effect="light"
            :content="item.title"
            placement="top-start"
          >
            <div class="title one-line">{{ item.title }}</div>
          </el-tooltip>
          <div class="time">{{ item.time }}</div>
        </div>
      </div>
    </template>
    <template v-else>
      <Empty />
    </template>
  </div>
</template>

<script setup lang="ts">
import Empty from '@/components/empty/index.vue'
import { ref } from 'vue'
const mockData = []
for (let i = 0; i < 10; i++) {
  mockData.push({
    pic: '',
    title: '您昨日的收益已经超过多少元，您昨日的收益已经超过多少元，',
    time: '2025-02-20 12:30:21',
  })
}
const data = ref<Array<any>>([])
data.value = mockData
</script>

<style scoped lang="scss">
.notice-box {
  width: 100%;
  height: 100%;
  overflow: scroll;
  .notice-item {
    height: 54px;
    display: flex;
    padding: 10px 0;
    .left {
      width: 30px;
      margin-right: 16px;
      .pic {
        width: 30px;
        height: 30px;
      }
    }
    .right {
      width: calc(100% - 46px);
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &:not(:last-child) {
      border-bottom: 1px solid var(--border-color);
      margin-bottom: 14px;
    }
  }
}
</style>
