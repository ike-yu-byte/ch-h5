<template>
  <el-config-provider :locale="elLocale">
    <van-config-provider :theme="theme">
      <Layout>
        <router-view></router-view>
      </Layout>
    </van-config-provider>
  </el-config-provider>
</template>

<script lang="ts" setup>
import { useLocaleStore } from '@/store'
import { toRefs, ref } from 'vue'
import Layout from '@/components/layout/index.vue'

const { elLocale } = toRefs(useLocaleStore())

const theme = ref('light')
</script>
<style scoped lang="scss">
.menu {
  display: flex;
  gap: 10px;
}
</style>
