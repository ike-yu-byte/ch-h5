<template>
  <div class="card-box">
    <div class="wrap dark" style="height: 600px">
      <div class="contain">
        <div class="left">
          <div class="title">{{ $t('Debit卡') }}</div>
          <div class="sub-title">{{ $t('支持VISA和万事达卡') }}</div>
          <ol class="list">
            <li><span>•</span>{{ $t('将您的加密货币存入卡') }}</li>
            <li><span>•</span>{{ $t('在200多个国家、地区消费') }}</li>
            <li><span>•</span>{{ $t('支持VISA和万事达卡') }}</li>
          </ol>
        </div>
        <div class="right">
          <img src="@/assets/img/icon-cards.png" class="img" />
        </div>
      </div>
    </div>
    <div class="wrap" style="height: 707px">
      <div class="contain" style="display: block">
        <div class="inner">
          <div class="header">{{ $t('快速、安全、便捷地消费') }}</div>
          <div class="card-list">
            <div class="card-item">
              <img src="@/assets/img/card/card1.png" />
              <span>{{ $t('安全便捷的现金替代品') }}</span>
            </div>
            <div class="card-item">
              <img src="@/assets/img/card/card1.png" />
              <span>{{ $t('用于日常小额采购的非接触式支付功能') }}</span>
            </div>
            <div class="card-item">
              <img src="@/assets/img/card/card1.png" />
              <span>{{ $t('以任何货币在任意国家使用卡付款') }}</span>
            </div>
            <div class="card-item">
              <img src="@/assets/img/card/card1.png" />
              <span>{{ $t('满足您的线下支付需求') }}</span>
            </div>
            <div class="card-item">
              <img src="@/assets/img/card/card1.png" />
              <span>{{ $t('易于一次性或定期支付账单') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wrap" style="height: 707px">
      <div class="contain" style="display: block">
        <div class="inner">
          <div class="header">{{ $t('什么是Debit卡？') }}</div>
          <div class="panel">
            <div class="left item">
              <img src="@/assets/img/card/card-icon.png" />
            </div>
            <div class="right item">
              <div class="row-item" v-for="(item, index) of lists" :key="index">
                <div class="row-header">
                  <img :src="item.icon" />
                  <span>{{ item.label }}</span>
                </div>
                <div class="row-content">{{ item.content }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wrap" style="height: 707px">
      <div class="contain" style="display: block">
        <div class="inner">
          <div class="header">{{ $t('常见问题') }}</div>
          <div class="question-list">
            <div
              v-for="(item, index) of questionList"
              :key="index"
              class="question-item"
            >
              <div class="title">
                <span>{{ item.label }}</span
                ><img
                  :src="item.expand ? expand : close"
                  @click="item.expand = !item.expand"
                />
              </div>
              <div class="content" v-show="item.expand">{{ item.content }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import pic1 from '@/assets/img/card/use.png'
import pic2 from '@/assets/img/card/linghuo.png'
import pic3 from '@/assets/img/card/duihuan.png'
import pic4 from '@/assets/img/card/gouwu.png'
import expand from '@/assets/img/expand.png'
import close from '@/assets/img/close.png'
import { ref } from 'vue'
import { $t } from '@/i18n'

const lists = ref([
  {
    label: $t('如何使用'),
    icon: pic1,
    content: $t(
      '支持Master/Visa通道，可让您随时随地轻松、安全地访问您的资金，使其成为您加密货币之旅的终极伴侣。',
    ),
  },
  {
    label: $t('灵活用卡'),
    icon: pic2,
    content: $t(
      '提交KYC即可快速开卡，APP可以详细查看每一笔充值、消费记录，让您随时掌握，管理您的财务状况',
    ),
  },
  {
    label: $t('轻松兑换'),
    icon: pic3,
    content: $t(
      '您可以轻松将BTC，ETH等加密货币转换为法币，无缝切换加密世界和法币世界',
    ),
  },
  {
    label: $t('无限购物'),
    icon: pic4,
    content: $t('在全球超过9000万家Master/Visa卡商户使用您的卡'),
  },
])

const questionList = ref([
  {
    label: $t('Debit卡是信用卡还是借记卡？'),
    expand: true,
    content: $t(
      'Debit卡是一种预付卡。从广义上讲，预付卡与借记卡相同。不同之处在于借记卡与您的银行帐户相关联，但预付卡需要充值。在我们的产品中，您可以使用加密货币进行充值。',
    ),
  },
  {
    label: $t('如何申请Debit卡？'),
    expand: true,
    content: $t(
      '登录APP/Web端后，点击开卡申请后，按照提示步骤选择卡类型后，并提交KYC信息，一般系统会花费2分钟时间来检验，通过之后您将会立刻收到一张Faith卡,点击安全码后可以获得卡片详细信息。',
    ),
  },
  {
    label: $t('如何为我的Debit卡充值？'),
    expand: true,
    content: $t(
      '您可以在应用程序中使用加密货币兑换成USD，比如使用USDT兑换USD至Debit卡中，即可开启全球消费。',
    ),
  },
])
</script>

<style scoped lang="scss">
.card-box {
  font-family: Figtree-Regular;
  .wrap {
    .contain {
      width: 1200px;
      margin: 0 auto;
      height: 100%;
      display: flex;
      .left {
        width: 600px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title,
        .sub-title {
          font-size: 48px;
          color: var(--white-color);
          font-family: Figtree-Bold;
          font-weight: bold;
        }
        .list {
          color: #a0a3b3;
          padding: 20px 0;
          margin-bottom: 20px;
          li {
            height: 26px;
            font-size: 14px;
            span {
              margin-right: 10px;
            }
          }
        }
      }
      .right {
        width: 600px;
        .img {
          width: 600px;
          height: 600px;
        }
      }
      .inner {
        padding: 80px 0;
        height: 100%;
        box-sizing: border-box;
        .header {
          text-align: center;
          font-size: 40px;
          color: #121218;
          font-weight: 700;
        }
        .card-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          padding-top: 100px;
          gap: 40px;
          .card-item {
            width: calc((100% - 80px) / 3);
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            &:hover {
              transform: translateY(-10px);
            }
            img {
              width: 80px;
              height: 100px;
              z-index: 1;
            }
            span {
              padding: 20px 0;
              z-index: 1;
              font-size: 14px;
            }
            &::after {
              display: inline-block;
              content: '';
              height: 80px;
              width: calc(100% - 40px);
              padding: 20px;
              margin: 20px 0;
              position: absolute;
              background-color: #f8f9fb;
              bottom: -20px;
              border-radius: 32px;
            }
          }
        }
        .panel {
          display: flex;
          padding: 40px 0;
          .left {
            width: 579px;
            img {
              width: 579px;
              height: 402px;
            }
          }
          .right {
            flex: 1;
            padding-left: 40px;
            .row-item {
              height: 78px;
              margin: 40px 0 0;
              .row-header {
                height: 28px;
                display: flex;
                align-items: center;
                img {
                  width: 25px;
                  height: 24px;
                }
                span {
                  color: #000;
                  font-size: 18px;
                  font-weight: 700;
                  padding-left: 10px;
                }
              }
              .row-content {
                padding-top: 10px;
                color: #a0a3b3;
                font-size: 14px;
              }
            }
          }
        }
        .question-list {
          .question-item {
            .title {
              display: flex;
              justify-content: space-between;
              color: #000;
              font-size: 18px;
              padding: 20px 0;
              img {
                width: 24px;
                height: 24px;
                cursor: pointer;
              }
            }
            .content {
              padding-bottom: 20px;
              color: #a0a3b3;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
  .dark {
    background-color: var(--dark-bg);
  }
}
.mobile {
  .card-box {
    .wrap {
      height: auto !important;
      .contain {
        width: auto;
        height: auto;
        padding: 0 16px;
        flex-direction: column;
        .left {
          width: auto;
          .title,
          .sub-title {
            font-size: 28px;
            text-align: center;
          }
          .sub-title {
            font-size: 20px;
            margin-top: 10px;
          }
        }
        .right {
          width: auto;
          img {
            width: 352px;
            height: 352px;
          }
        }
        .inner {
          padding: 40px 0;
          .header {
            font-size: 28px;
          }
          .card-list {
            padding-top: 60px;
            flex-direction: column;
            .card-item {
              width: 100%;
            }
          }
        }
      }
      .panel {
        flex-direction: column;
        .left {
          img {
            width: 350px !important;
            height: auto !important;
          }
        }
        .right {
          padding-left: 0px !important;
        }
      }
      .question-list {
        .question-item {
          .title {
            font-size: 16px !important;
          }
          img {
            width: 22px !important;
            height: 22px !important;
          }
          .content {
            font-size: 14px !important;
          }
        }
      }
    }
  }
}
</style>
