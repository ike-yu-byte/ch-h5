<template>
  <div class="footer-box">
    <div class="container">
      <div class="icons">
        <img class="logo" src="@/assets/img/logo_dark.png" />
      </div>
      <div class="footer-top">
        <template v-if="isPC">
          <div class="item" v-for="item of dataList" :key="item.value">
            <div class="cate">
              {{ item.label }}
            </div>
            <div
              class="menu"
              v-for="menu of item.children"
              :key="menu.value"
              @click="handleNavigate(menu)"
            >
              {{ menu.label }}
            </div>
          </div>
        </template>
        <template v-else>
          <van-collapse style="width: 100%" v-model="opens">
            <van-collapse-item
              :title="item.label"
              :name="item.label"
              v-for="item of dataList"
              :key="item.value"
            >
              <div
                class="menu"
                v-for="menu of item.children"
                :key="menu.value"
                @click="handleNavigate(menu)"
              >
                {{ menu.label }}
              </div>
            </van-collapse-item>
          </van-collapse>
        </template>
      </div>
      <div class="describe">
        <div class="title">{{ $t('免责声明') }}</div>
        <div class="content">
          {{
            $t(
              '比特币和数字资产的价格每天都在波动，数字资产交易可能被视为一种高风险活动。',
            )
          }}
          {{
            $t(
              '交易者在评估与这些活动相关的风险时，应恪尽职守，保持良好的判断力。',
            )
          }}
          {{ $t('本公司并不寻求将数字资产作为投资替代品，也不以此进行招揽。') }}
          {{ $t('交易数字资产的决定完全取决于客户自己的独立判断。') }}
        </div>
      </div>
      <div class="copy-right">
        Copyright © 2025 Faith Limited. All rights reserved.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { $t } from '@/i18n'
import { useDeviceStore } from '@/store'
import router from '@/router'

const { isPC } = toRefs(useDeviceStore())

const opens = ref([])
// 打开邮箱
// location.href = 'mailto:ike_yu@163.com'
// window.open('mailto:support@faith-bit.com')
const contactInfo = ref({
  businessEmail: 'business@debit.com',
  supportEmail: 'support@debit.com',
})
const dataList = ref([
  {
    label: $t('关于'),
    value: 'about',
    children: [
      {
        label: $t('公告中心'),
        value: 'notice',
      },
      {
        label: $t('邀请好友'),
        value: 'invite',
      },
    ],
  },
  {
    label: $t('服务'),
    value: 'service',
    children: [
      {
        label: $t('费率'),
        value: 'feerate',
      },
    ],
  },
  {
    label: $t('其他'),
    value: 'other',
    children: [
      {
        label: $t('帮助中心'),
        value: 'help',
      },
      {
        label: $t('数字资产介绍'),
        value: 'degit',
      },
    ],
  },
  {
    label: $t('联系我们'),
    value: 'contact',
    children: [
      {
        label: $t('商务合作') + ': ' + contactInfo.value.businessEmail,
        value: 'mailto:' + contactInfo.value.businessEmail,
      },
      {
        label: $t('联系我们') + ': ' + contactInfo.value.supportEmail,
        value: 'mailto:' + contactInfo.value.supportEmail,
      },
    ],
  },
])

const handleNavigate = (item: any) => {
  console.log('item', item)
  if (item.value.includes('mailto')) {
    location.href = item.value
  } else {
    router.push({
      name: item.value,
    })
  }
}
</script>

<style scoped lang="scss">
.footer-box {
  height: 311px;
  padding-top: 80px;
  background-color: var(--dark-bg);
  .container {
    width: 1200px;
    height: auto;
    margin: 0 auto;
    .icons {
      .logo {
        width: 104px;
        height: 44px;
      }
    }
    .footer-top {
      margin-top: 40px;
      height: 102px;
      display: flex;
      .item {
        flex: 1;
        color: var(--white-color);
        .cate {
          margin-bottom: 20px;
          font-size: 20px;
        }
        .menu {
          font-size: 14px;
          margin: 10px 0;
          cursor: pointer;
          &:first-child {
            margin-top: 0px;
          }
        }
      }
    }
    .describe {
      padding-top: 20px;
      color: var(--gray-color);
      font-size: 14px;
      .title {
        line-height: 20px;
      }
      .content {
        margin-top: 4px;
        font-size: 12px;
        line-height: 16px;
      }
    }
    .copy-right {
      font-size: 12px;
      color: var(--gray-color);
      margin-top: 10px;
      padding: 10px 0;
    }
  }
}
.mobile {
  .footer-box {
    padding: 20px 15px;
    height: auto;
    .container {
      width: auto;
      text-align: center;
      .menu {
        text-align: left;
        line-height: 30px;
        font-size: 12px;
      }
    }
    .footer-top {
      height: auto;
    }
  }
  .describe {
    .title {
      text-align: left;
    }
    .content {
      text-align: left;
      border-bottom: 1px solid var(--light-border2);
      padding: 10px 0;
      font-size: 12px;
    }
  }
}
:deep(.van-cell) {
  background-color: transparent !important;
  padding-left: 0px !important;
  padding-right: 0px !important;
}
:deep(.van-collapse-item__content) {
  background-color: transparent !important;
}
:deep(.van-collapse::after) {
  border: none !important;
}
:deep(.van-cell::after) {
  display: none;
  border-color: var(--light-border);
}
:deep(.van-collapse-item::after) {
  display: none;
}
:deep(.van-cell__title) {
  text-align: left;
  color: var(--white-color);
  font-size: 12px;
}
</style>
