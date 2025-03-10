<template>
  <div class="account-tab">
    <div
      :class="`tab-item ${route.name === item.value ? 'active' : ''}`"
      v-for="(item, index) of tabs"
      :key="index"
      @click="handleClick(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { $t } from '@/i18n'
import { useRoute } from 'vue-router'
import router from '@/router'

const route = useRoute()
console.log('route', route)
const tabs = [
  {
    label: $t('账户安全'),
    value: 'safe',
  },
  {
    label: $t('身份认证'),
    value: 'identity',
  },
  {
    label: $t('邀请好友'),
    value: 'invite',
  },
  {
    label: $t('API管理'),
    value: 'apiManage',
  },
  {
    label: $t('偏好设置'),
    value: 'prefer',
  },
]

const handleClick = (item: any) => {
  router.push({
    name: item.value,
  })
}
</script>

<style scoped lang="scss">
.account-tab {
  height: 90px;
  display: flex;
  column-gap: 80px;
  align-items: center;
  font-weight: 700;
  .tab-item {
    color: rgb(0, 17, 60);
    cursor: pointer;
  }
  .active {
    color: var(--dark-color);
  }
}
</style>
