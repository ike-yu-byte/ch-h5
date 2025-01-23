<template>
  <div class="list-wrap">
    <div class="header">
      <span class="title">{{ $t("title.lang") }}</span>
      <Icon name="cross" class="close" @click.native="handleClose"></Icon>
    </div>
    <div class="lang-items">
      <Button
        v-for="(item, index) of lists"
        plain
        :key="index"
        :color="item.value === props.currentVal ? '#2e4a9d' : null"
        @click.native="handleClick(item)"
        class="btn-item"
      >
        {{ item.label }}
      </Button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { Button, Icon } from "vant";
const props = defineProps({
  lists: {
    type: Array,
    default: () => [],
  },
  currentVal: {
    type: String,
    default: "",
  },
});
const { lists } = props;

const emits = defineEmits(["close", "select"]);
const handleClose = () => {
  emits("close", false);
};

const handleClick = (item) => {
  emits("select", item);
};
</script>

<style lang="scss" scoped>
.list-wrap {
  padding: 0 10px;
  margin: 0;
  .header {
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f1f1f1;
    .title {
      font-size: 20px;
    }
    position: relative;
    .close {
      height: 26px;
      width: 26px;
      position: relative;
      &::before {
        font-size: 26px;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
  .lang-items {
    margin: 20px 0;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    max-height: calc(100vh - 57px - 40px);
    overflow: scroll;
    .btn-item {
      width: calc(50% - 5px);
    }
  }
}
</style>
