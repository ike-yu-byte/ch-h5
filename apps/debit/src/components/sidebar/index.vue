<template>
  <div class="sidebar-box">
    <div class="header">
      <img
        src="@/assets/img/logo_dark.png"
        class="logo"
        v-if="props.type === 'sidebar'"
      />
      <span
        v-else-if="props.type === 'profile'"
        style="color: var(--white-color)"
      >
        <span
          class="icon iconfont icon-zhanghu1"
          style="margin-right: 4px"
        ></span>
        <span>{{ profile.account }}</span>
      </span>
      <span class="close iconfont icon-cha" @click="handleClose"></span>
    </div>
    <template v-if="!profile">
      <div class="btn">
        <van-button class="mobile-btn" color="transparent">{{
          $t('登录')
        }}</van-button>
      </div>
      <div class="btn register-btn">
        <van-button class="mobile-btn" :color="'var(--white-color)'">{{
          $t('注册')
        }}</van-button>
      </div>
    </template>
    <template
      v-for="item of props.type === 'sidebar' ? lists : profileList"
      :key="item.label"
    >
      <div class="menu-item" @click="handleMenuClick(item)">
        <div class="left">
          <span
            :class="`icon iconfont ${item.icon || ''}`"
            v-if="item.icon"
          ></span>
          <span class="text">{{ $t(`${item.label}`) }}</span>
        </div>
        <span class="right iconfont icon-you"></span>
      </div>
      <template v-if="item?.children?.length">
        <template v-if="item.expand">
          <div
            class="sub-menu"
            v-for="(subItem, index2) of item.children"
            :key="index2"
            @click="handleMenuClick(subItem)"
          >
            <div class="left">
              <span :class="`iconfont ${subItem.icon}`"></span>
            </div>
            <div class="right">
              <p class="top">{{ $t(`${subItem.label}`) }}</p>
              <p class="bottom">{{ $t(`${subItem.text}`) }}</p>
            </div>
          </div>
        </template>
      </template>
    </template>

    <!-- 语言设置 -->
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
            @click="handleChangeLang(item)"
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
            @click="setNewCoin(item)"
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
import { ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { langList } from '@/config'
import router from '@/router'
import { useCoin } from '@/hooks'
import { useMemberStore, useLocaleStore } from '@/store'

const { setLocale } = useLocaleStore()

const props = defineProps({
  type: {
    type: String,
    default: 'sidebar',
  },
})

const { profile } = toRefs(useMemberStore())

const emits = defineEmits(['close'])

const { locale } = useI18n()

const { coinList, getCoinData, currentCoin, setNewCoin } = useCoin()
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

const profileList = ref([
  {
    label: '资产',
    value: 'asset',
    expand: true,
    children: [
      {
        label: '我的资产',
        icon: '',
        text: '',
        value: 'asset',
      },
      {
        label: 'Debit卡',
        icon: '',
        text: '',
        value: 'asset',
        query: {
          tab: 'card',
        },
      },
      {
        label: '充币',
        icon: '',
        text: '',
        value: 'recharge',
      },
      {
        label: '提币',
        icon: '',
        text: '',
        value: 'withdraw',
      },
    ],
  },
  {
    label: '订单',
    value: 'order',
    expand: true,
    children: [
      {
        label: '买币订单',
        icon: '',
        text: '',
        value: 'payOrder',
      },
      {
        label: '闪兑订单',
        icon: '',
        text: '',
        value: 'exchangeOrder',
      },
      {
        label: '现货订单',
        icon: '',
        text: '',
        value: 'sportOrder',
      },
    ],
  },
  {
    label: '账户总览',
    value: 'order',
    expand: true,
    children: [
      {
        label: '账户安全',
        icon: '',
        text: '',
        value: 'safe',
      },
      {
        label: '身份认证',
        icon: '',
        text: '',
        value: 'identity',
      },
      {
        label: '邀请好友',
        icon: '',
        text: '',
        value: 'invite',
      },
      {
        label: 'API管理',
        icon: '',
        text: '',
        value: 'apiManage',
      },
      {
        label: '偏好设置',
        icon: '',
        text: '',
        value: 'prefer',
      },
    ],
  },
  {
    label: '退出',
    value: 'login',
  },
])

const lists = ref([
  {
    label: '行情',
    value: 'condition',
  },
  {
    label: '快捷买币',
    value: 'pay',
  },
  {
    label: '交易',
    value: 'trade',
    expand: true,
    children: [
      {
        label: '现货交易',
        icon: 'icon-trade',
        text: '使用完整交易功能，买卖数字货币',
        value: 'panel',
      },
      {
        label: '闪兑交易',
        icon: 'icon-flash',
        text: '现货兑换，一键完成交易',
        value: 'exchange',
      },
    ],
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
  if (item?.children?.length) {
    // 有子列表的
    item.expand = !item.expand
    return
  }
  if (item.value === 'lang') {
    show.value = true
  } else {
    handleClose()
    router.push({ name: item.value, query: item.query })
  }
}

const handleClose = () => {
  emits('close')
}

const handleCloseLang = () => {
  show.value = false
  handleClose()
}

const handleChangeLang = (item: any) => {
  locale.value = item.value
  setLocale(item.value)
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
  min-height: 100vh;
  padding-bottom: 40px;
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
  .sub-menu {
    color: var(--menu-color);
    display: flex;
    padding: 12px 10px;
    margin: 0 13px;
    gap: 10px;
    cursor: pointer;
    .left {
      .iconfont {
        font-size: 14px;
      }
    }
    .right {
      font-size: 14px;
      .bottom {
        margin-top: 5px !important;
      }
    }
  }
}
</style>
