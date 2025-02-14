<template>
  <div class="label">
    <slot>
      <div class="container">
        <span>{{ pretext || defaultText }}</span>
        <span class="strong">{{ props.arg1 }}</span>
        <span> & ETH </span>
        <span class="strong">{{ props.arg2 }}</span>
        <span> & XRP </span>
      </div>
    </slot>
  </div>
</template>

<script setup>
import { onMounted, reactive, toRefs } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const props = defineProps({
  arg1: {
    type: String,
    default: "1BTC",
  },
  arg2: {
    type: String,
    default: "10,000USDT",
  },
  pretext: {
    type: String,
    default: "",
  },
});
const data = reactive({
  defaultText: "",
});
const { defaultText } = toRefs(data);
onMounted(() => {
  data.defaultText = t("poster.meitiansong");
});
</script>

<style lang="scss" scoped>
.label {
  height: 31.8px;
  .container {
    background-color: #ddd;
    padding: 7.5px;
    box-sizing: border-box;
    height: 31.8px;
    margin: 0 37.5px;
    font-size: 14px;
    text-align: center;
    position: relative;
    border-radius: 2px;
    &::before,
    &::after {
      position: absolute;
      content: "";
      width: 20px;
      height: 26px;
      display: inline-block;
      background-color: #c5c5c5;
    }
    &::before {
      left: -20px;
      bottom: 0px;
      clip-path: polygon(0 0, 20px 0, 20px 26px, 0px 26px, 10px 13px);
    }
    &::after {
      right: -20px;
      bottom: 0px;
      clip-path: polygon(0 0, 20px 0, 10px 13px, 20px 26px, 0px 26px);
    }
    .strong {
      font-weight: bold;
      color: #2e4a9d;
    }
  }
}
</style>
