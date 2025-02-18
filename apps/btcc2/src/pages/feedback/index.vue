<template>
  <div class="index">
    <Header @right="show = !show" />
    <div class="content">
      <Form :tempConfig="template" class="myform" />
      <Footer />
    </div>
    <div class="kefu iconfont icon-zaixiankefu"></div>
    <Popup
      v-model:show="show"
      position="right"
      :style="{ width: '60%', height: '100%' }"
    >
      <List
        :lists="langOptions"
        :currentVal="locale"
        @close="handleClose"
        @select="handleSelect"
      ></List>
    </Popup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Popup } from 'vant'
import { langs, cloneDeep } from '@packages/assets'
import Form from '@packages/components/Form/index.vue'
import List from '@packages/components/langList/index.vue'
import Header from '@/components/header/index.vue'
import Footer from '@/components/footer/index.vue'
import { tempConfig } from './config'

const template = ref(cloneDeep(tempConfig))
const { locale } = useI18n()
const show = ref(false)
const langOptions = ref(cloneDeep(langs))

const handleClose = (val) => {
  show.value = val
}

const handleSelect = (item) => {
  locale.value = item.value
  localStorage.setItem('lang', locale.value)
  location.reload()
}
</script>

<style lang="scss" scoped>
.index {
  .content {
    max-height: calc(100vh - 56px);
    overflow: scroll;
    .myform {
      padding: 0 30px;
    }
  }
}
.kefu {
  position: fixed;
  bottom: 30px;
  right: 3%;
  font-size: 20px;
  color: #284193;
  font-size: 30px;
}
</style>
