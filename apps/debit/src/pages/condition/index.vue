<template>
  <div class="condition-wrap mobile">
    <div class="container">
      <el-tabs
        v-model="state.currentTab"
        class="demo-tabs"
        @tabChange="handleTabChange"
      >
        <el-tab-pane
          :label="item.label"
          :name="item.value"
          v-for="(item, index) of tabs"
          :key="index"
        >
          <component
            :is="item.component"
            :type="state.currentTab"
            class="mobile"
          ></component>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { $t } from '@/i18n'
import Table from './table.vue'

const tabs = [
  {
    label: $t('自选'),
    value: 'custom',
    component: Table,
  },
  {
    label: $t('现货交易'),
    value: 'trade',
    component: Table,
  },
]

const state = reactive({
  currentTab: 'trade',
})

const handleTabChange = (val: any) => {
  console.log('val', val)
}
</script>

<style scoped lang="scss">
.condition-wrap {
  padding: 40px 0;
  background-color: #f8f8f8;
  min-height: 420px;
  .container {
    width: 1200px;
    margin: 0 auto;
    padding: 0 0 40px;
    border-radius: 24px 24px 24px 24px;
    background-color: var(--white-color);
    overflow: hidden;
    :deep(.el-tabs__nav-wrap) {
      background-color: var(--dark-color);
    }
    :deep(.el-tabs__nav-wrap),
    :deep(.el-tabs__content) {
      padding: 0 40px;
      &::after {
        display: none;
      }
    }

    :deep(.el-tabs__item) {
      color: var(--white-color);
      height: 50px !important;
      margin-right: 40px;
    }
    :deep(.el-tabs__active-bar) {
      background-color: var(--white-color);
      display: inline-block;
      bottom: 8px !important;
    }
  }
}
.mobile {
  .condition-wrap {
    .container {
      width: auto;
      border-radius: 0px 0px 0px 0px;
      :deep(.el-tabs__nav-wrap) {
        background-color: var(--white-color);
      }
      :deep(.el-tabs__item) {
        color: var(--dark-color);
        font-weight: 700;
      }
      :deep(.el-tabs__active-bar) {
        background-color: var(--dark-color);
      }
      :deep(.el-tabs__content) {
        padding: 0 6px;
      }
    }
  }
}
</style>
