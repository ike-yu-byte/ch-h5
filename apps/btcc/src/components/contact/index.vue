<template>
  <div class="contact">
    <div class="title">{{ props.title || $t("titles.zimeiti") }}</div>
    <div class="contact-box">
      <span
        :class="`icon iconfont ${item.icon}`"
        v-for="(item, index) of props.data"
        :key="index"
        :src="item.icon"
        @click="handleClick(item)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { contacts } from "@/components/contact/config.ts";
const props = defineProps({
  data: {
    type: Array,
    default: () => contacts,
  },
  title: {
    type: String,
    default: "",
  },
});
function handleClick(item) {
  //   window.open(item.value);
  location.href = item.value;
}
</script>

<style lang="scss" scoped>
.contact {
  background-color: #232528;
  border-top: 0.5px solid rgba(211, 211, 211, 0.2);
  .title {
    height: 64px;
    font-size: 16px;
    padding: 0 16px;
    line-height: 64px;
    color: #ddd;
  }
  .contact-box {
    padding: 0 16px 20px;
    display: flex;
    gap: 36px;
    border-bottom: 0.5px solid rgba(211, 211, 211, 0.2);
    .icon {
      font-size: 24px;
      color: rgba(211, 211, 211, 0.7);
      cursor: pointer;
    }
  }
}
</style>
