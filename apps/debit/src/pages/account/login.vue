<template>
  <div class="login-box">
    <div class="container">
      <div class="title">{{ $t('登录') }}</div>
      <div class="content">
        <div class="left item">
          <div class="tab-box">
            <div
              :class="`tab ${state.currentTab === tab.value ? 'active' : ''}`"
              v-for="(tab, index) of tabs"
              :key="index"
              @click="handleChangeTab(tab)"
            >
              {{ tab.label }}
            </div>
          </div>
          <div class="form-box">
            <el-form
              ref="formRef"
              :model="formValue"
              label-width="auto"
              class="demo-dynamic"
            >
              <el-form-item
                v-for="(item, index) of state.currentTab === 'email'
                  ? emailForm
                  : phoneForm"
                :key="state.currentTab + index"
                :prop="item.prop"
                :label="item.label"
                :rules="item.rules"
              >
                <template
                  v-if="item.type === 'password' || item.type === 'input'"
                >
                  <div class="the-item">
                    <div class="prefix" v-if="item.prefix">
                      <!-- 方式一 -->
                      <!-- <component
                        :modelValue="(formValue as any)[item.prefix.prop]"
                        :is="item.prefix.component"
                        @change="
                          (val: any) => handleChangeItem(item.prefix, val)
                        "
                      >
                      </component> -->
                      <!-- 方式二 -->
                      <component
                        :is="
                          item.prefix.render({
                            modelValue: (formValue as any)[item.prefix.prop],
                            onChange: (val: any) =>
                              handleChangeItem(item.prefix, val),
                          })
                        "
                      ></component>
                    </div>
                    <div class="action">
                      <el-input
                        v-model="(formValue as any)[item.prop]"
                        size="large"
                        :type="item.type"
                        :show-password="item.type === 'password'"
                        :clearable="true"
                        :placeholder="item.placeholder || ''"
                      >
                      </el-input>
                    </div>
                  </div>
                </template>
              </el-form-item>
            </el-form>
          </div>
          <div class="btn-wrap">
            <div class="forget-box" @click="handleForgetPwd">
              {{ $t('忘记密码') }}
            </div>
            <div class="submit-box">
              <el-button @click="submitForm">{{ $t('登录') }}</el-button>
            </div>
            <div class="text-box">
              <span class="no-account">{{ $t('没有账号') }}?</span>
              <span class="register" @click="handleRegister">{{
                $t('注册')
              }}</span>
            </div>
          </div>
        </div>
        <div class="right item">
          <div class="title">{{ $t('使用二维码登录') }}</div>
          <div class="sub-title">{{ $t('使用手机App扫描二维码') }}</div>
          <div class="qr-box">
            <Erweima
              style="width: 176px; height: 176px"
              :text="state.qrtext"
              @refresh="handleRefresh"
            ></Erweima>
            <img
              src="@/assets/img/login-phone.png"
              style="width: 90px; height: 180px"
            />
          </div>
        </div>
      </div>
    </div>
    <Vcode
      :show="codeShow"
      @success="handleSuccess"
      @close="handleClose"
      :successText="$t('验证通过')"
      :failText="$t('验证失败')"
      :sliderText="$t('拖动滑块完成拼图')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, h } from 'vue'
import { $t } from '@/i18n'
import type { FormInstance } from 'element-plus'
import SelectCountry from '@/components/selectCountry/index.vue'
import Erweima from '@/components/erweima/index.vue'
import Vcode from 'vue3-puzzle-vcode'
import router from '@/router'
import { useMemberStore } from '@/store'
import { ElMessage } from 'element-plus'
import { Modal } from 'common-components'
import sendVerify from 'common-components/sendVerify/index.vue'
import noVerify from 'common-components/noVerify/index.vue'

const { setProfile, clearProfile } = useMemberStore()
clearProfile()
localStorage.removeItem('token')

const formRef = ref<FormInstance>()

const codeShow = ref(false)

// 滑动二维码验证通过
const handleSuccess = () => {
  codeShow.value = false
  // 开启验证码验证
  Modal.open({
    content: h(sendVerify, {
      type: state.currentTab,
      api: () => {}, // 这个api是传给组件发送验证码的
      onSuccess(obj: any) {
        // 拿到了验证码后在这里调接口
        // 注意：弹窗点击了确认且弹窗中表单验证通过后在这里回调
        console.log('验证码', obj.code)

        // 注意： 在这里需要调用接口验证验证码正确性，逻辑需要自己处理
        // ElMessage({
        //   message: $t('验证成功'),
        //   type: 'success',
        //   duration: 1000,
        // })
        Modal.close()
        let data = {}
        if (state.currentTab === 'phone') {
          data = {
            prefix: formValue.prefix,
            phone: formValue.phone,
            password: formValue.password,
          }
        }
        if (state.currentTab === 'email') {
          data = {
            email: formValue.phone,
            password: formValue.password,
          }
        }
        console.log('submit!', data)
        // 调用登录接口后的
        // pinia存储个人信息
        setProfile({
          email: 'test@qq.com',
          phone: '',
          google: '', // 谷歌验证器
          // 根据邮箱、手机号、谷歌验证器绑定了几个来确定来确定账号安全等级
          id: '8282247', // 用户id，用于邀请好友
          avatar: '', // 头像图片地址
          token: '',
          time: window.$format(new Date(), 'YYYY-MM-DD HH:mm:ss'), // 最近登录时间，用于账户安全配置页面显示
        })
        localStorage.setItem('token', 'xxxxxxxxxx')
        ElMessage({
          type: 'success',
          message: $t('登录成功'),
          duration: 1000,
        })
        router.push({
          name: 'index',
        })
      },
      onFail() {
        // 处理点击无法获取
        Modal.close()
        // 打开未收到验证码
        Modal.open({
          content: h(noVerify, {}),
          title: $t('未收到手机/邮箱验证码') + '?',
          confirmText: $t('安全选项申请'),
          onConfirm: () => {
            Modal.close()
            router.push({
              name: 'safe',
            })
          },
        })
      },
    }),
    draggable: false,
    title: $t('安全验证'),
    onConfirm: (obj: any) => {
      obj.compRef.value.handleVerify()
    },
  })
}

const handleClose = () => {
  codeShow.value = false
}

const emailForm: Array<any> = [
  {
    label: $t('邮箱'),
    prop: 'email',
    type: 'input',
    rules: [
      {
        required: true,
        message: $t('请输入邮箱地址'),
        trigger: 'blur',
      },
      {
        type: 'email',
        message: $t('请输入正确的邮箱地址'),
        trigger: ['blur', 'change'],
      },
    ],
    placeholder: $t('请输入邮箱地址'),
  },
  {
    label: $t('密码'),
    prop: 'password',
    type: 'password',
    placeholder: $t('请输入密码'),
    rules: [
      {
        required: true,
        message: $t('请输入密码'),
        trigger: 'blur',
      },
    ],
  },
]

const phoneForm = [
  {
    label: $t('手机号'),
    prop: 'email',
    type: 'input',
    rules: [
      {
        required: true,
        message: $t('请输入手机号'),
        trigger: 'blur',
      },
    ],
    placeholder: $t('请输入手机号'),
    prefix: {
      component: SelectCountry,
      prop: 'prefix',
      render(props: any) {
        return h(SelectCountry, props)
      },
    },
  },
  {
    label: $t('密码'),
    prop: 'password',
    type: 'password',
    placeholder: $t('请输入密码'),
    rules: [
      {
        required: true,
        message: $t('请输入密码'),
        trigger: 'blur',
      },
    ],
  },
]

const formValue = reactive<{
  email: string
  password: string
  phone: string
  prefix: string
}>({
  email: '',
  password: '',
  phone: '',
  prefix: '+86',
})

const submitForm = () => {
  if (!formRef.value) return
  formRef.value.validate((valid) => {
    if (valid) {
      // 弹出人机安全校验
      codeShow.value = true
    } else {
      console.log('error submit!')
    }
  })
}

const state = reactive({
  currentTab: 'phone',
  qrtext: '3A184F0F8328C73A5020E9A7742D0410', // 二维码内容
})

const tabs = ref<any>([
  {
    label: $t('手机'),
    value: 'phone',
  },
  {
    label: $t('邮箱'),
    value: 'email',
  },
])

const handleChangeTab = (tab: any) => {
  state.currentTab = tab.value
}

const handleChangeItem = (item: any, val: string) => {
  ;(formValue as any)[item.prop] = val
}

const handleForgetPwd = () => {
  router.push({
    name: 'forgetPwd',
  })
}

const handleRefresh = () => {
  // 这里要请求后端获取真实的二维码id
  state.qrtext = (Math.random() * 100000000).toString()
}

const handleRegister = () => {
  router.push({
    name: 'register',
  })
}
</script>

<style scoped lang="scss">
@import './style.scss';
</style>
