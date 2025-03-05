<template>
  <el-table
    :data="props.tableData"
    :empty-text="$t('暂无数据')"
    style="width: 100%"
    v-bind="{ ...events, ...$attrs }"
  >
    <template v-for="item of props.tableColumn" :key="item.prop">
      <el-table-column v-bind="item" v-if="!item.hidden">
        <template v-if="item.slot" #default="{ row, index }">
          <slot :name="item.slot" :row="row" :index="index"></slot>
        </template>
        <template v-else-if="item.prop === 'action'" #default="{ row }">
          <!-- 操作栏 -->
          <div
            class="action-cell"
            :style="{ justifyContent: item.align || 'left' }"
          >
            <span
              class="action-item"
              v-for="(action, ind) of item.options"
              :key="ind"
              @click.self.stop="handleAction(item, action, row)"
              >{{ action.label }}</span
            >
          </div>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script setup lang="ts">
const props = defineProps({
  tableData: {
    type: Array as any,
    default: () => [],
  },
  tableColumn: {
    type: Array as any,
    default: () => [],
  },
})
const emits = defineEmits(['sortChange', 'rowClick', 'action'])
const events = {
  onSortChange: (row: any) => {
    emits('sortChange', row)
  },
  onRowClick: (row: any) => {
    emits('rowClick', row)
  },
}
const handleAction = (item: any, action: any, row: any) => {
  if (item.callback && typeof item.callback === 'function') {
    item.callback()
  } else {
    emits('action', { item, row, action })
  }
}
</script>

<style scoped lang="scss">
.action-cell {
  display: flex;
  align-items: center;
  .action-item {
    margin-right: 10px;
    cursor: pointer;
    user-select: none;
    &:last-child {
      margin-right: 0px;
    }
  }
}
</style>
