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
            <!-- <template v-if="state.currentTab === 'email'"> -->
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
            <!-- </template> -->
            <!-- <template v-else>
              <div></div>
            </template> -->
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
              <span class="register">{{ $t('注册') }}</span>
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
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, h } from 'vue'
import { $t } from '@/i18n'
import type { FormInstance } from 'element-plus'
import SelectCountry from '@/components/selectCountry/index.vue'
import Erweima from '@/components/erweima/index.vue'

const formRef = ref<FormInstance>()

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

const handleForgetPwd = () => {}

const handleRefresh = () => {
  state.qrtext = (Math.random() * 100000000).toString()
}
</script>

<style scoped lang="scss">
.login-box {
  height: calc(100vh - 60px);
  .container {
    width: 1200px;
    height: auto;
    margin: 20px auto 0;
    .title {
      font-size: 44px;
      font-weight: 700;
      height: 70px;
      line-height: 70px;
    }
    .content {
      display: flex;
      gap: 120px;
      justify-content: center;
      .left {
        width: 460px;
        .tab-box {
          display: flex;
          flex: 1;
          gap: 30px;
          padding: 20px 0;
          .tab {
            padding: 0 18px;
            height: 45px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: var(--text-color);
            cursor: pointer;
          }
          .active {
            color: var(--dark-color);
            background-color: #f4f4f7;
            border-radius: 45px;
            font-family: Figtree-Regular;
          }
        }
        .form-box {
          :deep(.el-form-item) {
            display: flex;
            flex-direction: column;
          }
          :deep(.el-form-item__label-wrap) {
            margin: 0px !important;
          }
          :deep(.el-icon) {
            width: 16px;
            height: 16px;
          }
          .the-item {
            width: 100%;
            display: flex;
            column-gap: 30px;
            .prefix {
              width: 134px;
            }
            .action {
              flex: 1;
            }
          }
        }
        .btn-wrap {
          .forget-box {
            height: 22px;
            margin-bottom: 30px;
            cursor: pointer;
          }
          :deep(.el-button) {
            width: 100%;
            height: 40px;
            border-radius: 8px !important;
          }
          padding-bottom: 10px;
          text-align: right;
          font-size: 14px;
          color: var(--dark-color);
        }
        .text-box {
          margin-top: 24px;
          text-align: center;
          .no-account {
            color: var(--text-color);
          }
          .register {
            color: var(--dark-color);
            margin-left: 10px;
          }
        }
      }
      .right {
        width: 305px;
        font-family: Figtree-Regular;
        .title {
          font-size: 32px;
          line-height: 50px;
          height: 50px;
        }
        .sub-title {
          font-size: 16px;
          color: var(--text-color);
          padding-top: 16px;
        }
        .qr-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 60px;
        }
      }
    }
  }
}
.mobile {
  .login-box {
    height: auto;
    padding-bottom: 100px;
    .container {
      width: auto;
      padding: 0 20px;
      .title {
        font-size: 28px;
      }
      .content {
        display: flex;
        flex-direction: column;
        gap: 40px;
        .left {
          width: 100%;
          .tab-box {
            gap: 10px;
          }
        }
      }
    }
  }
}
</style>
