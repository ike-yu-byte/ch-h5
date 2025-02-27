<template>
  <el-popover trigger="click" width="auto" v-bind="$attrs">
    <template #reference>
      <slot>
        <div class="search-select" :style="{ backgroundColor: props.bg }">
          <span class="left"
            ><img class="img" :src="props.modelValue[props.iconKey]" />
            <span class="text">{{
              props.modelValue[props.labelKey]
            }}</span></span
          >
          <span class="icon iconfont icon-xia"></span>
        </div>
      </slot>
    </template>
    <slot name="content">
      <div class="content">
        <el-input v-model="state.inputVal" :placeholder="$t('搜索')"></el-input>
        <div class="options">
          <div
            class="item"
            v-for="(item, index) of lists"
            :key="index"
            @click="handleClick(item)"
          >
            <slot name="item">
              <div
                :class="`item-inner ${props.modelValue[props.labelKey] === item[props.labelKey] ? 'active' : ''}`"
              >
                <img :src="item.icon" class="img" /><span>{{
                  item.label
                }}</span>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </slot>
  </el-popover>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
const props = defineProps({
  options: {
    type: Array as any,
    default: () => [],
  },
  modelValue: {
    type: Object as any,
    default: () => ({}),
  },
  iconKey: {
    type: String,
    default: 'icon',
  },
  labelKey: {
    type: String,
    default: 'label',
  },
  filterKey: {
    type: String,
    default: 'label',
  },
  bg: {
    type: String,
    default: '',
  },
})

const state = reactive({
  inputVal: '',
})

const lists = computed(() => {
  if (!state.inputVal) {
    return props.options
  } else {
    return props.options.filter((item: any) =>
      item[props.labelKey].includes(state.inputVal),
    )
  }
})

const emits = defineEmits(['update:modelValue', 'change'])

const handleClick = (item: any) => {
  emits('update:modelValue', item)
  emits('change', item)
  document.body.click()
}
</script>

<style scoped lang="scss">
.search-select {
  width: 100%;
  height: 100%;
  padding: 0 10px;
  background-color: rgb(239, 239, 239);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgb(239, 239, 239);
  .left {
    display: flex;
    align-items: center;
    .img {
      width: 24px;
      height: 24px;
    }
    .text {
      color: rgb(0, 17, 60);
      font-size: 14px;
      margin-left: 10px;
    }
  }
  .icon {
    color: rgb(212, 217, 229);
  }
}
.content {
  width: 388px;
  .options {
    padding: 10px 0px;
    .item {
      .item-inner {
        font-family: Figtree-Regular;
        display: flex;
        align-items: center;
        cursor: pointer;
        color: rgba(54, 70, 109, 0.75);
        .img {
          width: 24px;
          height: 24px;
          margin-right: 10px;
        }
        height: 24px;
        padding: 10px;
      }
      .active {
        background-color: #f7f7f7;
      }
      &:hover {
        background-color: #f7f7f7;
      }
    }
  }
}
.mobile {
  .content {
    width: 300px;
  }
}
</style>
