<template>
  <div class="wrap">
    <div class="contain">
      <div class="left">
        <div
          v-for="(item, index) of menus"
          :key="index"
          :class="`menu-item ${item.value === compName ? 'active' : ''}`"
          @click="handleMenu(item)"
        >
          <span :class="`icon iconfont ${item.icon}`"></span>
          <span class="label">{{ item.label }}</span>
        </div>
      </div>
      <div class="right">
        <component :is="currentComp" :key="route"></component>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import { $t } from '@/i18n'
import router from '@/router'

const route = useRoute()

const menus = [
  {
    label: $t('我的资产'),
    value: 'asset',
    icon: 'icon-meiyuan',
  },
  {
    label: $t('充币'),
    value: 'recharge',
    icon: 'icon-chongbi1',
  },
  {
    label: $t('提币'),
    value: 'withdraw',
    icon: 'icon-tibi1',
  },
]

const compName = computed(() => {
  return route.path.split('/').pop()?.toLowerCase() || ''
})

const currentComp = shallowRef<any>(null)

// 动态加载组件方法
const loadComponent = async () => {
  try {
    currentComp.value = null

    // 动态导入组件（假设组件在相同目录）
    const module = await import(
      /* @vite-ignore */
      `./${compName.value}.vue`
    )

    currentComp.value = module.default
  } catch (e) {
    console.error('组件加载失败:', e)
    currentComp.value = null
  }
}
// 监听路由变化
watch(compName, loadComponent, { immediate: true })

const handleMenu = (item: any) => {
  router.push({
    name: item.value,
  })
}
</script>

<style scoped lang="scss">
.wrap {
  .contain {
    display: flex;
    width: 1200px;
    margin: 0 auto;
    padding: 50px 0;
    .left {
      width: 200px;
      .menu-item {
        line-height: 60px;
        font-size: 14px;
        color: var(--menu-color);
        cursor: pointer;
        .icon {
          margin-right: 10px;
          color: var(--menu-color);
        }
      }
      .active {
        color: var(--dark-color);
        font-weight: 700;
        .icon {
          color: var(--dark-color);
        }
      }
    }
    .right {
      flex: 1;
    }
  }
}
</style>
