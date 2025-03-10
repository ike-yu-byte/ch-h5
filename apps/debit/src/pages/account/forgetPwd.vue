<template>
  <div class="login-box">
    <div class="container">
      <div class="content">
        <div class="left item">
          <div class="title">{{ $t('忘记密码') }}</div>
          <div class="tip">{{ $t('重置密码后，24小时禁止提币和OTC转出') }}</div>
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
              <el-button @click="submitForm">{{ $t('下一步') }}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, h, toRefs } from 'vue'
import { $t } from '@/i18n'
import type { FormInstance } from 'element-plus'
import SelectCountry from '@/components/selectCountry/index.vue'
import { Modal } from 'common-components'
import sendVerify from 'common-components/sendVerify/index.vue'
import noVerify from 'common-components/noVerify/index.vue'
import newPassword from 'common-components/newPassword/index.vue'
import { useMemberStore } from '@/store'
import { ElMessage } from 'element-plus'
import router from '@/router'

const formRef = ref<FormInstance>()

const { setProfile } = useMemberStore()
const { profile } = toRefs(useMemberStore())

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
]

const formValue = reactive<{
  email: string
  phone: string
  prefix: string
}>({
  email: 'ike_yu@qq.com',
  phone: '',
  prefix: '86',
})

const submitForm = () => {
  if (!formRef.value) return
  formRef.value.validate((valid) => {
    if (valid) {
      let data = {}
      if (state.currentTab === 'phone') {
        data = {
          prefix: formValue.prefix,
          phone: formValue.phone,
        }
      }
      if (state.currentTab === 'email') {
        data = {
          email: formValue.phone,
        }
      }
      Modal.open({
        content: h(sendVerify, {
          type: state.currentTab,
          onSuccess(obj: any) {
            // 拿到了验证码后在这里调接口
            // 注意：弹窗点击了确认且弹窗中表单验证通过后在这里回调
            console.log('验证码', obj.code)
            // 在这里调用后端接口
            ElMessage({
              message: $t('验证成功'),
              type: 'success',
              duration: 1000,
            })
            // ElMessage({
            //   message: $t('验证失败'),
            //   type: 'error',
            //   duration: 1000,
            // })
            // 成功后
            Modal.close()
            // 如果验证码经后台校验发现为真, 则打开输入新密码弹窗
            Modal.open({
              content: h(newPassword, {
                type: state.currentTab,
                onSuccess: (obj: any) => {
                  // 拿到了新密码后
                  console.log('新密码', obj)
                  // 成功调用接口保存新密码后
                  ElMessage({
                    message: $t('密码修改成功'),
                    type: 'success',
                    duration: 1000,
                  })
                  //   ElMessage({
                  //     message: $t('密码修改失败'),
                  //     type: 'success',
                  //     duration: 1000,
                  //   })
                  Modal.close()
                  //   后端需要返回最新token等个人账号信息，之前token作废
                  // pinia存储个人信息
                  setProfile({
                    ...profile.value,
                    phone: '',
                    email: '',
                    avatar: '',
                    token: '',
                  })
                  localStorage.setItem('token', 'xxxxxxxxxx')
                  //   router.push({
                  //     name: 'login',
                  //   })
                },
              }),
              title: $t('修改密码'),
              onConfirm: (obj: any) => {
                obj.compRef.value.handleVerify()
              },
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
        title: $t('安全验证'),
        onConfirm: (obj: any) => {
          obj.compRef.value.handleVerify()
        },
      })
      console.log('submit!', data)
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
    label: $t('手机找回'),
    value: 'phone',
  },
  {
    label: $t('邮箱找回'),
    value: 'email',
  },
])

const handleChangeTab = (tab: any) => {
  state.currentTab = tab.value
}

const handleChangeItem = (item: any, val: string) => {
  ;(formValue as any)[item.prop] = val
}

const handleForgetPwd = () => {}
</script>

<style scoped lang="scss">
@import './style.scss';
.login-box {
  display: flex;
  align-items: center;
  .container {
    .title {
      text-align: left;
    }
    .tip {
      margin-top: 14px;
      padding: 5px 10px;
      background-color: rgb(255, 249, 232);
      color: var(--text-color);
      font-size: 14px;
      line-height: 22px;
      border-radius: 4px;
    }
  }
}
</style>
