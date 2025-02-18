<template>
  <div class="text-swiper">
    <slot name="left"></slot>
    <slot>
      <NoticeBar
        :scrollable="props.scrollable"
        :color="props.color"
        :text="formatData(props.data)"
        class="middle"
        background="transparent"
      ></NoticeBar>
    </slot>
    <slot name="right">
      <div class="action" @click="handleRight">
        {{ $t('poster.chakanjiangli') }}
      </div>
    </slot>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'
import { NoticeBar } from 'vant'
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const emit = defineEmits(['right'])
const defaultData = [
  {
    name: 'DYY****naver.com',
    value: '0.5USDT',
  },
  {
    name: '090****0099',
    value: '0.5USDT',
  },
  {
    name: '090****3181',
    value: '0.2USDT',
  },
]

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  color: {
    type: String,
    default: '#333',
  },
  scrollable: {
    type: Boolean,
    default: true,
  },
})
const handleRight = () => {
  emit('right')
}

function formatData(data) {
  data = props.data.length ? props.data : defaultData
  return data.reduce((prev, current) => {
    return (
      prev +
      current.name +
      `,${t('poster.huode')}` +
      current.value +
      '                  '
    )
  }, '')
}
</script>

<style lang="scss" scoped>
.text-swiper {
  display: flex;
  align-items: center;
  padding: 10px 0;
  .middle {
    flex: 1;
    padding: 0 5px;
  }
  .action {
    width: 70px;
    height: 29px;
    line-height: 29px;
    text-align: center;
    background-color: #2e4a9d;
    font-size: 14px;
    color: #fff;
    border-radius: 4px;
  }
}
// :deep(.van-notice-bar__content) {
//   font-size: 14px;
//   height: 24px;
//   line-height: 24px;
// }
// :deep(.van-notice-bar__wrap) {
//   height: 40px;
// }
</style>
