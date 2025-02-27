<template>
  <div class="mustknown-box">
    <div class="sub-title">{{ $t('请仔细阅读本声明') }}</div>
    <div class="content">
      <div v-html="html" class="root"></div>
    </div>
    <div class="accept">
      <Checkbox v-model="state.agreedGuide" @change="handleChange">{{
        $t('我同意遵守平台《用户反洗钱反恐金融手册》并严格履行相关义务')
      }}</Checkbox>
    </div>
    <div class="accept">
      <Checkbox v-model="state.agreedStatic" @change="handleChange">{{
        $t('我同意平台采集个人数据')
      }}</Checkbox>
    </div>
    <div class="tips">({{ $t('全部勾选以上选项后进入到支付环节') }})</div>
    <div class="accept" style="margin-bottom: 20px">
      <Checkbox v-model="state.noshow" @change="handleChange">{{
        $t('三天内不再提示')
      }}</Checkbox>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mockData } from './mock'
import { ref, reactive } from 'vue'
import Checkbox from 'common-components/checkbox'

const $t = (window as any).$t
const html = ref('')
html.value = mockData

const emits = defineEmits(['change'])

const handleChange = (val: any) => {
  emits('change', val)
}

const state = reactive({
  agreedGuide: false,
  agreedStatic: false,
  noshow: false,
})

defineExpose({
  state,
})
</script>

<style scoped lang="scss">
.mustknown-box {
  width: 462px;
  .sub-title {
    text-align: center;
    font-size: 14px;
    color: #999;
  }
  .content {
    width: 432px;
    height: 240px;
    background-color: #f5f5f5;
    margin-top: 22px;
    border-radius: 4px;
    overflow: hidden;
    padding: 20px;
    cursor: default;
    .root {
      height: 100%;
      overflow: auto;
      color: rgba(54, 70, 109, 0.75);
      font-size: 14px;
      line-height: 22px !important;
    }
  }
  .tips {
    font-size: 14px;
    color: #999;
    text-align: center;
    margin-top: 10px;
  }
  .accept {
    padding: 20px 0 0px;
  }
}
.mobile {
  .mustknown-box {
    width: 300px;
    .content {
      width: auto;
    }
  }
}
</style>
