<template>
  <div class="sidebar-box">
    <div class="header">
      <img src="@/assets/img/logo_dark.png" class="logo" />
      <span class="close iconfont icon-cha" @click="handleClose"></span>
    </div>
    <div class="btn">
      <van-button class="mobile-btn" color="transparent">{{
        $t('登录')
      }}</van-button>
    </div>
    <div class="btn register-btn">
      <van-button class="mobile-btn" color="#FFFFFF">{{
        $t('注册')
      }}</van-button>
    </div>
    <div
      class="menu-item"
      v-for="item of lists"
      :key="item.label"
      @click="handleMenuClick(item)"
    >
      <div class="left">
        <span
          :class="`icon iconfont ${item.icon || ''}`"
          v-if="item.icon"
        ></span>
        <span class="text">{{ $t(`${item.label}`) }}</span>
      </div>
      <span class="right iconfont icon-you"></span>
    </div>
    <van-popup v-model:show="show" position="right">
      <div class="lang-box">
        <div class="header-box">
          <div class="left">
            <span
              :class="`cate ${item.value === currentTab ? 'active' : ''}`"
              v-for="item of tabs"
              :key="item.label"
              @click="currentTab = item.value"
              >{{ $t(`${item.label}`) }}</span
            >
          </div>
          <!-- 关闭语言设置 -->
          <span
            class="right iconfont icon-cha"
            @click.stop="handleCloseLang"
          ></span>
        </div>
        <template v-if="currentTab === 1">
          <div
            :class="`menu-item`"
            v-for="item of langList"
            :key="item.label"
            @click="handleMenuClick(item)"
          >
            <div class="left">
              <span :class="`text ${locale === item.value ? 'active' : ''}`">{{
                item.label
              }}</span>
            </div>
          </div>
        </template>
        <template v-if="currentTab === 2">
          <div
            :class="`menu-item`"
            v-for="item of coinList"
            :key="item.label"
            @click="handleSelectCoin(item)"
          >
            <div class="left">
              <span
                :class="`text ${currentCoin === item.value ? 'active' : ''}`"
                >{{ item.label }}</span
              >
            </div>
          </div>
        </template>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { langList } from '@/config'
import router from '@/router'
import { useCoin } from '@/hooks'

const emits = defineEmits(['close'])

const { locale } = useI18n()

const { coinList, getCoinData, currentCoin } = useCoin()
getCoinData()

const show = ref(false)

const currentTab = ref(1)

const tabs = ref([
  {
    label: '语言',
    value: 1,
  },
  {
    label: '折算货币',
    value: 2,
  },
])
const lists = ref([
  {
    label: '行情',
    value: '',
  },
  {
    label: '快捷买币',
    value: '',
  },
  {
    label: '交易',
    value: '',
  },
  {
    label: '盘前现货交易',
    value: '',
  },
  {
    label: 'Debit卡',
    value: '',
  },
  {
    label: langList.find((item: any) => item.value === locale.value)?.label,
    value: 'lang',
    icon: 'icon-lang',
  },
])

const handleMenuClick = (item: any) => {
  if (item.value === 'lang') {
    show.value = true
  } else {
    handleClose()
    router.push({ name: item.value })
  }
}

const handleSelectCoin = (item: any) => {
  currentCoin.value = item.value
}

const handleClose = () => {
  emits('close')
}

const handleCloseLang = () => {
  show.value = false
  handleClose()
}

defineOptions({
  name: 'Sidebar',
})
</script>

<style scoped lang="scss">
.lang-box {
  width: 258px;
  height: 100vh;
  background-color: var(--white-color);
  background-color: var(--dark-bg);
  .header-box {
    height: 40px;
    padding: 10px 11px;
    border-bottom: 1px solid var(--dark-border-color);
    color: var(--menu-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      .cate {
        display: inline-block;
        padding: 0 15px;
        font-size: 14px;
      }
      .active {
        color: var(--van-blue);
      }
    }
    .right {
      font-size: 22px;
    }
  }
}
.sidebar-box {
  width: 258px;
  height: 100vh;
  background-color: var(--white-color);
  background-color: var(--dark-bg);
  .header {
    height: 39px;
    padding: 10px 11.25px;
    border-bottom: 1px solid var(--dark-border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      width: 85px;
      height: 36px;
    }
    .close {
      color: var(--text-color);
      font-size: 20px;
    }
  }
  .btn {
    padding: 12px 23px;
    // border: 1px solid rgba(205, 214, 235, 0.3) !important;
    // border-radius: 5px 5px 5px 5px;
    border-bottom: 1px solid var(--dark-border-color);
    :deep(.van-button__content) {
      color: rgb(130, 139, 161) !important;
      font-size: 14px !important;
    }
  }
  .register-btn {
    padding-top: 10px;
    :deep(.van-button__content) {
      color: var(--dark-color) !important;
      font-size: 14px !important;
    }
  }
  .menu-item {
    height: 22px;
    padding: 12px 10px;
    margin: 0 13px;
    border-bottom: 1px solid var(--dark-border-color);
    display: flex;
    justify-content: space-between;
    .left {
      color: var(--menu-color);
      .icon {
        width: 16px;
        margin-right: 10px;
        font-size: 18px;
      }
      .text {
        font-size: 14px;
      }
      .active {
        color: var(--van-blue);
      }
    }
    .right {
      color: var(--menu-color);
      font-size: 14px;
    }
  }
}
</style>
