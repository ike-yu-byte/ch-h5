<template>
  <div class="table-box">
    <div class="cate-lists">
      <el-button
        v-for="item of cates"
        :key="item"
        text
        :style="`color: ${currentCate === item ? 'var(--white-color)' : ''};background-color: ${currentCate === item ? 'var(--dark-color)' : '#F8F8F8'}`"
        @click="handleCateChange(item)"
        >{{ item }}</el-button
      >
    </div>
    <div class="input-box" v-show="!isPC">
      <el-input
        v-model="inputVal"
        :placeholder="$t('搜索')"
        :suffix-icon="Search"
        clearable
        @input="handleInput"
      ></el-input>
    </div>
    <el-table
      :data="tableData"
      :empty-text="$t('暂无数据')"
      style="width: 100%"
      @row-click="handleRowClick"
      @sortChange="handleSortChange"
    >
      <template v-for="item of tableColumn" :key="item.prop">
        <el-table-column v-bind="item" v-if="!item.hidden">
          <template v-if="item.prop === 'action'" #default="{ row }">
            <span @click="handleRowClick(row)">{{ $t('去交易') }}</span>
          </template>
          <template v-else-if="item.prop === 'Symbol'" #default="{ row }">
            <span
              @click.self.stop="handleCollected(row)"
              :class="`star iconfont ${row.star ? 'icon-shoucang2' : 'icon-shoucang1'}`"
            ></span
            ><span>{{ row[item.prop] }}</span>
          </template>
          <template v-else-if="item.prop === 'Rose'" #default="{ row }">
            <span :class="`${row[item.prop] < 0 ? 'decrease' : 'increase'}`"
              >{{
                row[item.prop] < 0
                  ? row[item.prop].toFixed(2)
                  : '+' + row[item.prop].toFixed(2)
              }}%</span
            >
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { $t } from '@/i18n'
import { ref, watch, toRefs, computed } from 'vue'
import { mockData } from './mock'
import router from '@/router'
import { useDeviceStore } from '@/store'
import { Search } from '@element-plus/icons-vue'

const { isPC } = toRefs(useDeviceStore())

const inputVal = ref('')

const props = defineProps({
  type: {
    type: String,
    default: '',
  },
})

watch(
  () => props.type,
  () => {
    if (props.type === 'custom') {
      tableData.value = []
      if (isPC.value) {
        cates.forEach((item) => {
          const target = mockData.find((row) => row.Code === item) as any
          target.TradeVarietyList.forEach((item2: any) => {
            if (item2.star) {
              tableData.value.push({ star: false, ...item2 })
            }
          })
        })
      } else {
        cates.forEach((item) => {
          const target = mockData.find((row) => row.Code === item) as any
          target.TradeVarietyList.forEach((item2: any) => {
            if (item2.star && item2.Symbol.includes(inputVal.value)) {
              tableData.value.push({ star: false, ...item2 })
            }
          })
        })
      }
    } else {
      if (isPC.value) {
        tableData.value = mockData
          .find((item) => item.Code === currentCate.value)
          ?.TradeVarietyList.map((item) => ({
            star: false, // 是否收藏了
            ...item,
          })) as any
      } else {
        tableData.value = mockData
          .find((item) => item.Code === currentCate.value)
          ?.TradeVarietyList.map((item) => ({
            star: false, // 是否收藏了
            ...item,
          }))
          .filter((item) => item.Symbol.includes(inputVal.value)) as any
      }
    }
  },
)
const handleCollected = (row: any) => {
  row.star = !row.star
  // 在这里调用接口更改状态
}

console.log(handleCollected)

const cates = mockData.map((item: any) => item.Code)

const currentCate = ref(cates[0])

const tableColumn = computed(() => [
  {
    prop: 'Symbol',
    label: $t('交易对'),
    hidden: false,
  },
  {
    prop: 'Newest',
    label: $t('最新价'),
    sortable: true,
    hidden: false,
  },
  {
    prop: 'Rose',
    label: $t('24H涨跌'),
    sortable: true,
    hidden: false,
  },
  {
    prop: 'Low',
    label: $t('24H最低价'),
    sortable: true,
    hidden: !isPC.value,
  },
  {
    prop: 'Last24TradeQuantity',
    label: $t('24H成交量'),
    sortable: true,
    hidden: !isPC.value,
  },
  {
    prop: 'Last24TradeQuantity',
    label: $t('24H成交额'),
    sortable: true,
    hidden: !isPC.value,
  },
  {
    prop: 'action',
    label: $t('操作'),
    hidden: !isPC.value,
  },
])

const tableData = ref<Array<any>>([])

if (isPC.value) {
  tableData.value = mockData
    .find((item) => item.Code === currentCate.value)
    ?.TradeVarietyList.map((item) => ({
      star: false, // 是否收藏了
      ...item,
    })) as any
} else {
  tableData.value = mockData
    .find((item) => item.Code === currentCate.value)
    ?.TradeVarietyList.map((item) => ({
      star: false, // 是否收藏了
      ...item,
    }))
    .filter((item) => item.Symbol.includes(inputVal.value)) as any
}

const handleSortChange = (event: any) => {
  const { order, prop } = event
  console.log('排序改变', order, prop)
}

const handleRowClick = (row: any) => {
  router.push({ name: 'panel', params: { symbol: row.Symbol } })
}

const handleCateChange = (item: any) => {
  currentCate.value = item
  if (isPC.value) {
    tableData.value = mockData
      .find((item) => item.Code === currentCate.value)
      ?.TradeVarietyList.map((item) => ({
        star: false, // 是否收藏了
        ...item,
      })) as any
  } else {
    tableData.value = mockData
      .find((item) => item.Code === currentCate.value)
      ?.TradeVarietyList.map((item) => ({
        star: false, // 是否收藏了
        ...item,
      }))
      .filter((item) => item.Symbol.includes(inputVal.value)) as any
  }
}

const handleInput = (val: string) => {
  tableData.value = mockData
    .find((item) => item.Code === currentCate.value)
    ?.TradeVarietyList.map((item) => ({
      star: false, // 是否收藏了
      ...item,
    }))
    .filter((item) => item.Symbol.includes(val)) as any
}
</script>

<style scoped lang="scss">
:deep(.cell) {
  font-size: 14px;
  font-family: Figtree-Regular;
  color: rgb(0, 17, 60);
}
.star {
  margin-right: 7px;
  cursor: pointer;
}
.decrease {
  color: rgb(227, 85, 66);
  font-weight: 700;
}
.increase {
  color: rgb(18, 179, 125);
  font-weight: 700;
}
.input-box {
  margin: 10px;
}
:deep(.el-table__row) {
  height: 62px;
}
.mobile {
  .cate-lists {
    padding: 0 10px;
  }
}
:deep(.el-input__wrapper:hover) {
  box-shadow: var(--dark-color) 0px 0px 0px 1px;
  border: none;
}
:deep(.el-input__wrapper) {
  box-shadow: var(--dark-color) 0px 0px 0px 1px;
  border: none;
}
</style>
