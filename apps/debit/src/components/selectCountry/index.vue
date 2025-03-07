<template>
  <div class="phone-wrap">
    <slot>
      <el-select
        :modelValue="props.modelValue"
        :placeholder="$t('请选择')"
        filterable
        size="large"
        class="default-slot"
        :filter-method="filterMethod"
        @change="handleChange"
      >
        <el-option
          v-for="(item, index) in options"
          :key="item.value + index"
          :label="`${item.value}`"
          :value="item.value"
        >
          <div class="the-item">
            <span>{{ item.label }}</span>
            <span>{{ item.value }}</span>
          </div>
        </el-option>
      </el-select>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import MockCountry from '@/mock/json/country.json'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})
const options = shallowRef<any>([])
const allOptions = shallowRef<any>(
  MockCountry.map((item) => {
    return {
      ...item,
      label: item.Name,
      value: '+' + item.Areacode,
    }
  }),
)
options.value = MockCountry.map((item) => {
  return {
    ...item,
    label: item.Name,
    value: '+' + item.Areacode,
  }
})

const filterMethod = (val: string) => {
  options.value = allOptions.value.filter((item: any) => {
    return item.label.includes(val)
  })
}

const emits = defineEmits(['change'])

const handleChange = (val: string) => {
  emits('change', val)
}
</script>

<style scoped lang="scss">
.the-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
