<template>
  <div class="safe-box">
    <AccountTab class="contain"></AccountTab>
    <div class="wrap">
      <div class="contain person">
        <div class="left">
          <img
            class="avatar"
            :src="profile.avatar"
            v-if="profile.avatar"
            @click="handleSelectAvatar"
          />
          <span class="avatar" v-else @click="handleSelectAvatar">
            <div class="icon iconfont icon-yunshangchuan"></div>
            <div class="text">{{ $t('上传头像') }}</div>
          </span>
        </div>
        <div class="right">
          <div class="account">
            <span>Hi,{{ profile.email || profile.phone }}</span>
            <span class="id">ID: {{ profile.id }}</span>
            <span class="copy" @click="useCopy(profile.id)">
              <span
                class="iconfont icon-fuzhi"
                style="margin-right: 4px"
              ></span>
              <span>{{ $t('复制') }}</span>
            </span>
          </div>
          <div class="time">{{ $t('最近登录') }} {{ profile.time }}</div>
          <div class="rank">
            <span>{{ $t('安全级别') }}</span
            ><SafeLevel :value="safeLevel"></SafeLevel>
          </div>
        </div>
      </div>
    </div>
    <PanelBox :title="$t('双重身份验证')" class="contain interval"></PanelBox>
    <PanelBox :title="$t('安全密码管理')" class="contain interval"></PanelBox>
    <PanelBox :title="$t('安全记录')" class="contain interval"></PanelBox>
  </div>
</template>

<script setup lang="ts">
import AccountTab from '@/components/accountTab'
import PanelBox from 'common-components/panelbox/index'
import { useMemberStore } from '@/store'
import { toRefs, computed } from 'vue'
import { handleChooseFile, useCopy } from 'common-assets/utils'
import SafeLevel from 'common-components/safeLevel/index'

const { profile } = toRefs(useMemberStore())
const { setProfile } = useMemberStore()

const safeLevel = computed(() => {
  const keys = ['email', 'phone', 'google']
  let i = 0
  for (let key of keys) {
    if (profile.value[key]) {
      i++
    }
  }
  return i
})

const handleSelectAvatar = () => {
  handleChooseFile(
    {
      multiple: true,
      accept: 'image/png, image/jpeg, image/svg+xml, .png, .jpg, .jpeg, .svg',
      maxSize: 5 * 1024 * 1024,
    },
    (files: any) => {
      const file = files[0]
      const url = URL.createObjectURL(file)

      setProfile({
        ...profile.value,
        avatar: url, // 这里只是回显刚上传的图片，刷新网页后该图片链接会失效
      })

      // 注意：调用接口后要返回新头像地址

      const formData = new FormData()
      formData.append('file', file)
      setProfile({
        ...profile.value,
        avatar: url, // url换成图库中地址
      })
    },
  )
}
</script>

<style scoped lang="scss">
.safe-box {
  font-family: Figtree-Regular;
  .wrap {
    background-color: var(--dark-color);
    height: 90px;
    padding: 45px 0;
  }
  .contain {
    width: 1200px;
    margin: 0px auto;
  }
  .interval {
    margin: 50px auto 0;
    &:last-child {
      margin-bottom: 50px;
    }
  }
  .person {
    display: flex;
    height: 100%;
    column-gap: 35px;
    .left {
      width: 83px;
      .avatar {
        width: 83px;
        height: 83px;
        border: 1px solid var(--light-border3);
        display: inline-block;
        border-radius: 50%;
        background: #f3f4f6;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .text {
          font-size: 14px;
          color: var(--text-color);
        }
        .icon {
          font-size: 22px;
          color: var(--text-color);
        }
      }
    }
    .right {
      flex: 1;
      .account {
        color: var(--white-color);
        font-size: 14px;
        height: auto;
        .id {
          border: 1px solid var(--light-border3);
          padding: 5px 10px;
          border-radius: 15px;
          font-weight: 500;
          margin: 0 10px;
        }
        .copy {
          cursor: pointer;
        }
      }
      .time,
      .rank {
        color: var(--menu-color);
        font-size: 14px;
        margin-top: 10px;
      }
      .rank {
        display: flex;
        align-items: center;
        column-gap: 4px;
      }
    }
  }
}
</style>
