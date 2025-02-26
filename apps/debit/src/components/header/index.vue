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
                  @click="handleClickNav(item)"
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
        <van-popup v-model:show="show" position="right">
          <Sidebar @close="handlePopClose" />
        </van-popup>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useDeviceStore } from '@/store'
import router from '@/router'
import Notice from '@/components/notice/index.vue'
import Lang from '@/components/lang/index.vue'
import Sidebar from '@/components/sidebar/index.vue'

const { isPC } = toRefs(useDeviceStore())

const show = ref(false)

const navLists = ref<any>([
  {
    label: '行情',
    value: '',
  },
  {
    label: '快捷交易',
    value: '',
  },
  {
    label: '交易',
    value: '',
    children: [
      {
        label: '现货交易',
        icon: 'icon-trade',
        text: '使用完整交易功能，买卖数字货币',
        value: '',
      },
      {
        label: '闪兑交易',
        icon: 'icon-flash',
        text: '现货兑换，一键完成交易',
        value: '',
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
])

const handleClickNav = (item: any) => {
  router.push({ name: item.value })
}

const handleOpenMenu = () => {
  console.log('点击菜单')
  show.value = true
}

const handlePopClose = () => {
  show.value = false
}

defineOptions({
  name: 'TopHeader',
})
</script>

<style scoped lang="scss">
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
