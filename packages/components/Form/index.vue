<template>
  <div class="myform-wrap">
    <template v-for="(group, index) of props.tempConfig" :key="index">
      <div class="group" v-if="!group.hidden">
        {{ group.label }}
      </div>
      <div class="children" :style="{}">
        <template v-for="item of group.children" :key="item.key">
          <div
            class="myform-item"
            :style="{ 'grid-column': `span ${item.width || 12}` }"
          >
            <template v-if="item.type === 'select'">
              <!-- <div style="height: 100px"></div> -->
              <ElSelect
                v-model="item.value"
                placement="bottom-start"
                class="my-select"
              >
                <ElOption
                  v-for="(option, index) of item.options"
                  :key="index"
                  :label="option.label"
                  :value="option.value"
                />
              </ElSelect>
            </template>
            <template v-else-if="item.type === 'textarea'">
              <ElInput
                v-model="item.value"
                type="textarea"
                show-word-limit
                :maxlength="item.max || 1000"
                :autosize="{
                  minRows: item.minRows || 10,
                  maxRows: item.maxRows || 100,
                }"
              />
            </template>
            <template v-else-if="item.type === 'upload'">
              <ElUpload :show-file-list="false">
                <div>上传</div>
              </ElUpload>
            </template>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { ElSelect, ElOption, ElInput, ElUpload } from 'element-plus'
const props = defineProps({
  tempConfig: {
    type: Array,
    default: () => [
      // {
      //     label: '',
      //     hidden: false,
      //     children: [
      //         {
      //             label: '',
      //             type: '',
      //             key: '',
      //             value: ''
      //         }
      //     ]
      // }
    ],
  },
})
</script>

<style lang="scss" scoped>
.myform-wrap {
  box-sizing: content-box;
  .children {
    display: grid;
    grid-row-gap: 20px;
    .myform-item {
      clear: both;
    }
  }
}
@import '@packages/assets/style/element.scss';
</style>
