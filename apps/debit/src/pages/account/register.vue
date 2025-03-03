<template>
  <div class="login-box">
    <div class="container">
      <div class="content">
        <div class="left item">
          <div class="title">{{ $t('注册') }}</div>
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
                        <template #suffix v-if="item.code">
                          <TimeBtn @send="handleSendCode"></TimeBtn>
                        </template>
                      </el-input>
                    </div>
                  </div>
                </template>
              </el-form-item>
            </el-form>
          </div>
          <div class="btn-wrap">
            <div class="forget-box">
              <el-checkbox v-model="formValue.agreed">{{
                $t('注册即同意交易所用户协议')
              }}</el-checkbox>
            </div>
            <div class="submit-box">
              <el-button @click="submitForm" :disabled="!formValue.agreed">{{
                $t('注册')
              }}</el-button>
            </div>
            <div class="text-box">
              <span class="no-account">{{ $t('已有账号') }}?</span>
              <span class="register" @click="handleRegister">{{
                $t('立即登录')
              }}</span>
            </div>
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
import router from '@/router'
import TimeBtn from 'common-components/timeBtn/index.vue'
import { useRoute } from 'vue-router'

const { query }: any = useRoute()
console.log('query', query)

const formRef = ref<FormInstance>()

const handleSendCode = () => {
  console.log('调用接口获取验证码')
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
    label: $t('验证码'),
    prop: 'code',
    type: 'input',
    placeholder: $t('请输入验证码'),
    rules: [
      {
        required: true,
        message: $t('请输入验证码'),
        trigger: 'blur',
      },
    ],
    code: true,
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
  {
    label: $t('推荐人ID'),
    prop: 'invited',
    type: 'input',
    placeholder: $t('请输入推荐人ID'),
    rules: [
      {
        required: false,
        message: $t('请输入推荐人ID'),
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
    label: $t('验证码'),
    prop: 'code',
    type: 'input',
    placeholder: $t('请输入验证码'),
    rules: [
      {
        required: true,
        message: $t('请输入验证码'),
        trigger: 'blur',
      },
    ],
    code: true,
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
  {
    label: $t('推荐人ID'),
    prop: 'invited',
    type: 'input',
    placeholder: $t('请输入推荐人ID'),
    rules: [
      {
        required: false,
        message: $t('请输入推荐人ID'),
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
  code: string
  agreed: boolean
  invited: string
}>({
  email: '',
  password: '',
  phone: '',
  prefix: '+86',
  code: '',
  invited: query.code || '',
  agreed: false,
})

const submitForm = () => {
  if (!formRef.value) return
  formRef.value.validate((valid) => {
    if (valid) {
      let data = {}
      if (state.currentTab === 'phone') {
        data = {
          password: '',
          phone: '',
          prefix: '+86',
          code: '',
          invited: '',
        }
      }
      if (state.currentTab === 'email') {
        data = {
          email: '',
          password: '',
          prefix: '+86',
          code: '',
          invited: '',
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
    label: $t('手机注册'),
    value: 'phone',
  },
  {
    label: $t('邮箱注册'),
    value: 'email',
  },
])

const handleChangeTab = (tab: any) => {
  state.currentTab = tab.value
}

const handleChangeItem = (item: any, val: string) => {
  ;(formValue as any)[item.prop] = val
}

const handleRegister = () => {
  router.push({
    name: 'login',
  })
}
</script>

<style scoped lang="scss">
@import './style.scss';
.forget-box {
  text-align: left;
}
</style>
