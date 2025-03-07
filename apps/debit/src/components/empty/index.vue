<template>
  <div class="empty-box">
    <img :src="props.pic" class="pic" />
    <span class="text">{{ props.text }}</span>
  </div>
</template>

<script setup lang="ts">
import defaultPic from '@/assets/img/nodata.png'
import { t } from '@/i18n'
const props = defineProps({
  pic: {
    type: String,
    default: defaultPic,
  },
  text: {
    type: String,
    default: t('暂无数据'),
  },
})
</script>

<style scoped lang="scss">
.empty-box {
  width: 100%;
  height: 100%;
  .pic {
    width: 140px;
    height: 140px;
  }
  .text {
    color: var(--gray-color);
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
