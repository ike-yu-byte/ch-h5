<template>
  <div class="ieo-wrap">
    <div class="box dark">
      <div class="contain">
        <div class="title">{{ $t('抢先发现全球优质新项目') }}</div>
        <div class="sub-title">
          {{
            $t(
              '盘前现货交易是一个优质得区块链新项目甄选平台，您现在可以在早期阶段参与项目投资。',
            )
          }}
        </div>
      </div>
    </div>
    <div class="box2">
      <div class="contain">
        <div class="cate">{{ $t('正在进行') }}({{ taskLists.length }})</div>
        <div class="more-box" @click="handleViewMore" v-show="!state.viewed">
          {{ $t('查看更多') }}
        </div>
        <div class="cate">{{ $t('常见问题') }}</div>
        <div
          class="question-item"
          v-for="(item, index) of questions"
          :key="index"
        >
          <div class="label">{{ item.label }}</div>
          <div class="content">{{ item.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { $t } from '@/i18n'

const taskLists = ref<any>([])

const state = reactive({
  viewed: false,
})

const handleViewMore = () => {
  state.viewed = true
}

const questions = ref([
  {
    label: $t('盘前现货交易项目发行时间是什么？'),
    value: $t(
      '盘前现货交易将会不定期的为用户提供优质区块链新项目的体验机会，所有活动都会提前预热并公布活动规则，以便用户为参与项目做好准备，您可以及时留意平台最新的项目咨询和通知。',
    ),
  },
  {
    label: $t('我该如何参与到盘前现货交易？'),
    value: $t(
      '首先，您需要创建个人账户或登录已有账户；其次，请确保您已完成 KYC认证；最后，您需要持有一定数量的数字货币即可参与活动。在您登录账号后，进行信息查看与详情阅读，仅需轻点鼠标/屏幕，即可完成购买操作。',
    ),
  },
  {
    label: $t('盘前现货交易有哪些活动类型？'),
    value: $t('盘前现货交易目前提供打折销售类型。'),
  },
])
</script>

<style scoped lang="scss">
.ieo-wrap {
  font-family: Figtree-Regular;
  .box {
    height: 135px;
    padding: 60px 0;
  }
  .contain {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    .title {
      font-size: 40px;
      color: var(--white-color);
      font-weight: 700;
      text-align: center;
      line-height: 62px;
    }
    .sub-title {
      font-size: 14px;
      color: var(--white-color);
      text-align: center;
      padding-top: 40px;
    }
  }
  .box2 {
    height: 720px;
    .contain {
      .cate {
        padding: 70px 0 50px;
        color: var(--dark-bg);
        font-size: 30px;
        font-weight: 700;
      }
      .more-box {
        text-align: center;
        height: 38px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        font-size: 16px;
        color: var(--dark-bg);
        cursor: pointer;
      }
      .question-item {
        .label {
          font-size: 18px;
          color: var(--dark-bg);
          line-height: 28px;
          margin-top: 20px;
        }
        .content {
          margin-top: 10px;
          color: #a0a3b3;
          font-size: 14px;
          line-height: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(143, 149, 179, 0.1);
        }
      }
    }
  }
  .dark {
    background-color: var(--dark-bg);
  }
}
.mobile {
  .ieo-wrap {
    .box,
    .box2 {
      height: auto;
      .contain {
        width: auto;
        height: auto;
        padding: 0 20px;
        .title {
          font-size: 24px;
          line-height: 38px;
        }
        .sub-title {
          padding-top: 10px !important;
          text-align: left;
        }
        .cate {
          padding: 30px 0;
          font-size: 24px;
        }
        .question-item {
          .label {
            font-size: 14px;
          }
          .content {
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
