<template>
  <div class="lang-box">
    <div class="left panel">
      <div class="lang-item">{{ $t('语言') }}</div>
      <div
        :class="`lang-item ${locale === item.value ? 'active' : ''}`"
        v-for="item of langs"
        :key="item.value"
        @click="handleChangeLang(item)"
      >
        {{ item.label }}
      </div>
    </div>
    <div class="right panel">
      <div class="lang-item">{{ $t('折算货币') }}</div>
      <div
        :class="`lang-item ${currentCoin === item.value ? 'active' : ''}`"
        v-for="item of coinList"
        :key="item.value"
        @click="setNewCoin(item)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { langList } from '@/config'
import { cloneDeep } from 'common-assets/utils'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCoin } from '@/hooks'
import { useLocaleStore } from '@/store'

const { setLocale } = useLocaleStore()
const { locale } = useI18n()
const langs = ref(cloneDeep(langList))
const { coinList, getCoinData, currentCoin, setNewCoin } = useCoin()
getCoinData()

const handleChangeLang = (item: any) => {
  locale.value = item.value
  setLocale(item.value)
}
</script>

<style scoped lang="scss">
.lang-box {
  width: 100%;
  height: 100%;
  display: flex;
  .panel {
    height: 100%;
    flex: 1;
    overflow: scroll;
    .lang-item {
      height: 32px;
      font-size: 14px;
      color: var(--gray-color);
      &:hover {
        color: var(--dark-color);
      }
      cursor: pointer;
    }
    .active {
      color: var(--dark-color);
    }
  }
}
</style>
