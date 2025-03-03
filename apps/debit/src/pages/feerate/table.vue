<template>
  <div class="table-wrap">
    <el-table
      :data="props.data"
      style="width: 100%; height: 100%"
      :empty-text="$t('暂无数据')"
      v-bind="$attrs"
    >
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        :align="item.align || ''"
        v-for="(item, index) of props.column"
        :key="index"
      >
        <template v-if="item.slot" #default="{ row, index }">
          <slot :name="item.slot" :row="row" :index="index"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  column: {
    type: Array as any,
    default: () => [],
  },
  data: {
    type: Array as any,
    default: () => [],
  },
})
</script>

<style scoped lang="scss">
.table-wrap {
  width: 100%;
  height: 100%;
}
</style>
