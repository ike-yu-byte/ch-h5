<template>
  <div class="invite-box">
    <div class="wrap dark">
      <div class="contain">
        <div class="box">
          <div class="left">
            <div class="title">{{ $t('邀请好友') }}</div>
            <div class="sub-title">
              {{ $t('加入全球最全面，最安全的交易平台') }}
            </div>
          </div>
          <div class="right" v-if="isPC">
            <img src="@/assets/img/invite.png" />
          </div>
        </div>
      </div>
    </div>
    <div class="wrap" style="background: #f8f8f8">
      <div class="contain">
        <div class="table">
          <div class="table-wrap">
            <div class="header">{{ $t('我的邀请') }}</div>
            <div class="content">
              <div class="inner">
                <div class="item">
                  <div class="title">{{ $t('专属二维码海报') }}</div>
                  <div class="cell">
                    <span class="you" @click="handlePoster">{{
                      $t('选择海报')
                    }}</span>
                  </div>
                </div>
                <div class="item">
                  <div class="title">{{ $t('专属邀请码') }}</div>
                  <div class="cell">
                    <span class="zuo">{{ state.code }}</span>
                    <span class="you" @click="handleCopy(state.code)">{{
                      $t('复制')
                    }}</span>
                  </div>
                </div>
                <div class="item">
                  <div class="title">{{ $t('专属邀请链接') }}</div>
                  <div class="cell">
                    <span class="zuo">{{ state.addr }}</span>
                    <span class="you" @click="handleCopy(state.addr)">{{
                      $t('复制')
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, h } from 'vue'
import { Modal } from 'common-components'
import { $t } from '@/i18n'
import { useDeviceStore } from '@/store'
import Poster from './poster.vue'
import { useCopy } from 'common-assets'

const { isPC } = toRefs(useDeviceStore())

const state = reactive({
  code: 'QH9906',
  addr: 'https://www.faith-bit.com/user/register?intiveCode=QH9906',
})

const handleCopy = (str: string) => {
  useCopy(str)
}

const handlePoster = () => {
  Modal.open({
    showHeader: false,
    showBtn: false,
    title: '',
    content: h(Poster, { code: state.code }),
    draggable: false,
    closeOnClickModal: true,
    className: 'poster-modal',
  })
}
</script>

<style scoped lang="scss">
.invite-box {
  .wrap {
    .contain {
      width: 1200px;
      margin: 0 auto;
      .box {
        display: flex;
        padding: 40px 0;
        justify-content: space-between;
        .left {
          display: flex;
          justify-content: center;
          flex-direction: column;
          color: var(--white-color);
          .title {
            font-size: 40px;
          }
          .sub-title {
            margin-top: 12px;
          }
        }
        .right {
          img {
            width: 361px;
            height: 241px;
          }
        }
      }
      .table {
        padding: 40px 0;
        .table-wrap {
          border-radius: 24px 24px 24px 24px;
          overflow: hidden;
          .header {
            height: 50px;
            line-height: 50px;
            font-weight: 700;
            background-color: var(--dark-bg);
            color: var(--white-color);
            padding: 0 40px;
            font-family: Figtree-Bold;
          }
          .content {
            padding: 20px;
            background-color: var(--white-color);
            .inner {
              height: 100%;
              background-color: #f8faff;
              border-radius: 10px 10px 10px 10px;
              padding: 20px 50px;
              display: flex;
              .item {
                flex: 1;
                .title {
                  color: var(--gray-color);
                }
                .cell {
                  margin-top: 25px;
                  font-size: 12px;
                  display: flex;
                  .zuo {
                    max-width: 230px;
                    margin-right: 10px;
                    word-break: break-all;
                    color: var(--gray-color);
                  }
                  .you {
                    color: var(--dark-color);
                    cursor: pointer;
                  }
                }
              }
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
  .invite-box {
    .wrap {
      .contain {
        padding: 0 16px;
        width: auto;
        .table {
          padding-top: 0;
          .table-wrap {
            border-radius: 0px 0px 0px 0px;
            .header {
              background-color: unset;
              color: var(--dark-color);
              padding: 0;
            }
            .content {
              height: auto;
              padding: 0px;
              .inner {
                flex-direction: column;
                padding: 0px;
                .item {
                  .title {
                    font-size: 16px;
                    margin-top: 25px;
                  }
                  .cell {
                    margin-top: 0px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
