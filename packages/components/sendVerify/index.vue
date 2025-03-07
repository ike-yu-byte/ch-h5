<template>
  <div class="login-box">
    <div class="container">
      <div class="content">
        <div class="left item">
          <div class="form-box">
            <el-form
              ref="formRef"
              :model="formValue"
              label-width="auto"
              class="demo-dynamic"
            >
              <el-form-item
                v-for="(item, index) of props.type === 'email'
                  ? emailForm
                  : phoneForm"
                :key="props.type + index"
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
                        <template #suffix>
                          <TimeBtn @send="handleSendCode"></TimeBtn>
                        </template>
                      </el-input>
                    </div>
                  </div>
                </template>
              </el-form-item>
            </el-form>
          </div>
          <div class="tips" @click="handleClick">{{ $t('无法获取') }}?</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import TimeBtn from '../timeBtn/index.vue'
import { ElMessage } from 'element-plus'

const $t = (window as any).$t

const emits = defineEmits(['success', 'fail'])

const handleSendCode = ({ start }) => {
  console.log('调用接口获取验证码')
  props?.api?.()?.then((res: any) => {
    console.log('res', res)
    start() // 开始倒计时
    ElMessage({
      type: 'success',
      message: $t('验证码发送成功'),
    })
  })
  start() // 接口走通后记得把这个去掉
}

const props = defineProps({
  type: {
    type: String,
    default: 'phone',
  },
  api: {
    type: Function,
  },
})

const formRef = ref<FormInstance>()

const handleVerify = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      emits('success', { code: formValue.code, type: props.type })
    }
  })
}

const emailForm: Array<any> = [
  {
    label: $t('邮箱验证码'),
    prop: 'code',
    type: 'input',
    rules: [
      {
        required: true,
        message: $t('请输入验证码'),
        trigger: 'blur',
      },
    ],
    placeholder: $t('请输入验证码'),
  },
]

const phoneForm = [
  {
    label: $t('手机验证码'),
    prop: 'code',
    type: 'input',
    rules: [
      {
        required: true,
        message: $t('请输入验证码'),
        trigger: 'blur',
      },
    ],
    placeholder: $t('请输入验证码'),
  },
]

const formValue = reactive<{
  code: string
}>({
  code: '',
})

const handleChangeItem = (item: any, val: string) => {
  ;(formValue as any)[item.prop] = val
}

const handleClick = () => {
  emits('fail')
}

defineExpose({
  handleVerify,
})
</script>

<style scoped lang="scss">
.login-box {
  height: auto;
  .container {
    height: auto;
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
        .tips {
          font-size: 14px;
          color: var(--dark-color);
          cursor: pointer;
        }
      }
    }
  }
}
.mobile {
  .login-box {
    height: auto;
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
