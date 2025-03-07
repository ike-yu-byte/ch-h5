<template>
  <div class="select-box">
    <div class="header">
      <div class="title">
        <span>{{ $t('数字资产列表') }}</span>
        <span
          class="close iconfont icon-cha"
          v-if="!isPC"
          @click="handleSelect(state.currentItem)"
        ></span>
      </div>
      <el-input
        v-model="state.inputVal"
        :suffix-icon="Search"
        clearable
      ></el-input>
    </div>
    <div class="content">
      <div
        :class="`item ${item.label === state.currentItem.label ? 'active' : ''}`"
        v-for="(item, index) of computedList"
        :key="index"
        @click="handleSelect(item)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted, toRefs } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { setItem, getItem } from 'common-assets'
import { useDeviceStore } from '@/store'

const { isPC } = toRefs(useDeviceStore())

const storage = getItem('degit')

const props = defineProps({
  options: {
    type: Array as any,
    default: () => [],
  },
})

const computedList = computed(() => {
  if (state.inputVal) {
    return props.options.filter((item: any) =>
      item.label.includes(state.inputVal),
    )
  } else {
    return props.options
  }
})

const emits = defineEmits(['change'])

const state = reactive<any>({
  inputVal: '',
  currentItem: {},
})

onMounted(() => {
  state.currentItem =
    props.options.find((item: any) => item.label === storage) || {}
  handleSelect(state.currentItem)
})

const handleSelect = (item: any) => {
  state.currentItem = item
  setItem('degit', item.label)
  emits('change', item)
}
</script>

<style scoped lang="scss">
.select-box {
  width: 100%;
  height: auto;
  .header {
    padding: 20px;
    .title {
      font-size: 18px;
      font-weight: 700;
      color: var(--text-color);
      margin-bottom: 5px;
      display: flex;
      justify-content: space-between;
      .close {
        font-size: 20px;
        color: var(--gray-color);
      }
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
</style>
