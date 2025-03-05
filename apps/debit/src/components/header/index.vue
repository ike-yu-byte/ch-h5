<template>
  <div :class="`header-box`">
    <div class="left-box">
      <img
        src="@/assets/img/logo_dark.png"
        class="logo"
        @click="handleClickNav({ value: 'index' })"
      />
      <div class="nav-list" v-if="isPC">
        <template v-for="item of navLists" :key="item.value">
          <template v-if="!item.children?.length">
            <div class="nav-item" @click="handleClickNav(item)">
              <span class="label">{{ $t(`${item.label}`) }}</span>
            </div>
          </template>
          <template v-else>
            <el-popover
              placement="top-start"
              title=""
              :width="'auto'"
              trigger="hover"
            >
              <div class="pop-content">
                <div
                  class="content-item"
                  v-for="item2 of item.children"
                  @click="handleClickNav(item2)"
                  :key="item2.value"
                >
                  <div class="line first">
                    <span :class="`pic iconfont ${item2.icon}`"></span>
                    <span class="label">{{ $t(`${item2.label}`) }}</span>
                    <span class="icon iconfont icon-you"></span>
                  </div>
                  <div class="line">
                    <span class="pic"></span>
                    <span class="label">{{ $t(`${item2.text}`) }}</span>
                  </div>
                </div>
              </div>
              <template #reference>
                <div class="nav-item">
                  <span class="label">{{ $t(`${item.label}`) }}</span>
                  <span class="icon iconfont icon-xia"></span>
                </div>
              </template>
            </el-popover>
          </template>
        </template>
      </div>
    </div>
    <div class="right-box">
      <template v-if="isPC">
        <template v-if="!!profile">
          <template v-for="(item, index) of rightMenus" :key="index"
            ><el-popover placement="top-start" trigger="hover" width="auto">
              <template #reference>
                <span class="menu-item" :key="index">{{ item.label }}</span>
              </template>
              <template #default>
                <div class="pop-content">
                  <div
                    class="pop-item"
                    v-for="(item2, index2) of item.children"
                    :key="index2"
                    @click="handleTo(item2.value, item2.query || {})"
                  >
                    <span :class="`icon iconfont ${item2.icon}`"></span
                    ><span>{{ item2.label }}</span>
                  </div>
                </div>
              </template>
            </el-popover></template
          >
          <el-popover placement="top-start" trigger="hover" width="auto">
            <template #reference>
              <span class="menu-item"
                ><span
                  class="iconfont icon-zhanghu1"
                  style="margin-right: 4px"
                ></span
                >{{ profile.account }}</span
              >
            </template>
            <template #default>
              <div class="pop-content">
                <div
                  class="pop-item"
                  v-for="(item2, index2) of accountMenus"
                  :key="index2"
                  @click="handleTo(item2.value, item2.query || {})"
                >
                  <span :class="`icon iconfont ${item2.icon}`"></span
                  ><span>{{ item2.label }}</span>
                </div>
              </div>
            </template>
          </el-popover>
        </template>
        <template v-else>
          <el-button
            color="#FFFFFF"
            @click="handleClickNav({ value: 'login' })"
            >{{ $t('登录') }}</el-button
          >
          <el-button
            color="#2F3031"
            @click="handleClickNav({ value: 'register' })"
            >{{ $t('注册') }}</el-button
          >
        </template>
        <el-popover
          placement="top-start"
          title=""
          :width="'auto'"
          trigger="hover"
        >
          <div class="notice-content">
            <Notice></Notice>
          </div>
          <template #reference>
            <span class="btn iconfont icon-icon_top_post"></span>
          </template>
        </el-popover>
        <el-popover
          placement="top-start"
          title=""
          :width="'auto'"
          trigger="hover"
        >
          <div class="lang-content">
            <Lang></Lang>
          </div>
          <template #reference>
            <span class="btn iconfont icon-icon_top_globle"></span>
          </template>
        </el-popover>
      </template>
      <template v-else>
        <span
          class="menu iconfont icon-yidongduan_caidan"
          @click="handleOpenMenu"
        ></span>
        <van-popup v-model:show="show" position="right" v-if="show">
          <Sidebar @close="handlePopClose" />
        </van-popup>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useDeviceStore, useMemberStore } from '@/store'
import router from '@/router'
import Notice from '@/components/notice/index.vue'
import Lang from '@/components/lang/index.vue'
import Sidebar from '@/components/sidebar/index.vue'
import { $t } from '@/i18n'

const { profile } = toRefs(useMemberStore())

const { isPC } = toRefs(useDeviceStore())

const show = ref(false)

const navLists = ref<any>([
  {
    label: '行情',
    value: 'condition',
  },
  {
    label: '快捷交易',
    value: 'pay',
  },
  {
    label: '交易',
    value: '',
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
    value: 'ieo',
  },
  {
    label: 'Debit卡',
    value: 'card',
  },
])

const accountMenus = ref<any>([
  {
    label: $t('账户安全'),
    value: 'safe',
    icon: 'icon-zhanghu1',
  },
  {
    label: $t('身份认证'),
    value: 'identity',
    icon: 'icon-zhanghuxinxi',
  },
  {
    label: $t('邀请好友'),
    value: 'invite',
    icon: 'icon-yaoqinghaoyou',
  },
  {
    label: $t('API管理'),
    value: 'invite',
    icon: 'icon-api',
  },
  {
    label: $t('偏好设置'),
    value: 'prefer',
    icon: 'icon-shezhi1',
  },
  {
    label: $t('退出'),
    value: 'login',
    icon: 'icon-exit',
  },
])

const rightMenus = ref<any>([
  {
    label: $t('资产'),
    value: 'asset',
    children: [
      {
        label: $t('我的资产'),
        value: 'asset',
        icon: 'icon-meiyuan',
      },
      {
        label: $t('Debit卡'),
        value: 'asset',
        icon: 'icon-icon-test',
        query: {
          tab: 'card',
        },
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
    ],
  },
  {
    label: $t('订单'),
    value: 'order',
    children: [
      {
        label: $t('买币订单'),
        value: 'payOrder',
        icon: 'icon-dengdaidingdan',
      },
      {
        label: $t('闪兑订单'),
        value: 'exchangeOrder',
        icon: 'icon-dengdaidingdan',
      },
      {
        label: $t('现货订单'),
        value: 'sportOrder',
        icon: 'icon-dengdaidingdan',
      },
    ],
  },
])

const handleClickNav = (item: any) => {
  if (item.children) return
  router.push({ name: item.value })
}

const handleOpenMenu = () => {
  console.log('点击菜单')
  show.value = true
}

const handlePopClose = () => {
  show.value = false
}

const handleTo = (name: string, query: any = {}) => {
  router.push({
    name,
    query,
  })
}

defineOptions({
  name: 'TopHeader',
})
</script>

<style scoped lang="scss">
.pop-content {
  font-family: Figtree-Regular;
  .pop-item {
    width: auto;
    height: 40px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--light-border);
    cursor: pointer;
    color: var(--text-color);
    .icon {
      margin-right: 10px;
      color: var(--text-color);
    }
  }
}
.pc {
  .left-box {
    height: 100%;
    display: flex;
    align-items: center;
    .logo {
      width: 85px;
      height: 36px;
      cursor: pointer;
    }
    .nav-list {
      padding: 0 25px;
      display: flex;
      align-items: center;
      color: var(--white-color);
      font-size: 14px;
      .nav-item {
        margin-right: 25px;
        cursor: pointer;
        .icon {
          font-size: 12px;
          margin-left: 4px;
        }
      }
    }
  }
  .right-box {
    display: flex;
    align-items: center;
    gap: 10px;
    .btn {
      display: inline-block;
      width: 18px;
      height: 18px;
      margin-left: 13px;
      color: #4c4c4c;
      font-size: 22px;
      cursor: pointer;
      &:last-child {
        margin-right: 13px;
      }
    }
    .menu-item {
      color: var(--white-color);
      padding: 0 16px;
      font-size: 14px;
      cursor: pointer;
    }
  }
}
.mobile {
  .left-box {
    height: 100%;
    display: flex;
    align-items: center;
    .logo {
      width: 85px;
      height: 36px;
    }
  }
  .right-box {
    display: flex;
    align-items: center;
    .menu {
      color: var(--white-color);
    }
  }
}
.header-box {
  height: 60px;
  padding: 0 20px;
  background-color: var(--dark-bg);
  display: flex;
  justify-content: space-between;
}
.pop-content {
  padding: 0 10px;
  .content-item {
    cursor: pointer;
    &:not(:last-child) {
      margin-bottom: 20px;
    }
    .line {
      white-space: no-wrap;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      .pic,
      .label,
      .icon {
        display: inline-block;
        word-break: no-break;
        white-space: no-wrap;
      }
      .pic {
        width: 20px;
      }
      .label {
        flex: 1;
      }
    }
    .first {
      color: #00113c;
      .icon {
        color: var(--text-color);
        font-size: 14px;
      }
    }
  }
}
.notice-content {
  width: 300px;
  height: 260px;
  overflow: scroll;
}
.lang-content {
  width: 280px;
  height: 280px;
}
</style>
