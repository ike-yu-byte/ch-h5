<template>
  <div class="banner">
    <div class="texts">
      <div class="title">{{ props.title || defaultTitle }}</div>
      <div class="sub_title">{{ props.subTitle || defaultSubTitle }}</div>
      <Label></Label>
      <div class="pic">
        <img src="@/assets/img/gift.png" class="img" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Label from "@/components/label/index.vue";
import { onMounted, reactive, toRefs } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  subTitle: {
    type: String,
    default: "",
  },
});
const data = reactive({
  defaultTitle: "",
  defaultSubTitle: "",
});
const { defaultTitle, defaultSubTitle } = toRefs(data);
onMounted(() => {
  data.defaultTitle = t("poster.fuli");
  data.defaultSubTitle = t("poster.xingyun");
});
</script>

<style lang="scss" scoped>
.banner {
  height: 400px;
  background-image: url(@/assets/img/s_banner.png);
  background-size: contain;
  padding: 0 11.25px;
  .texts {
    height: 181.3px;
    font-family: PingFang SC;
    color: #333;
    .title {
      font-size: 40px;
      color: #333;
      text-align: center;
      padding-top: 20px;
      height: 50px;
    }
    .sub_title {
      font-size: 40px;
      height: 48px;
      font-weight: bold;
      color: #2e4a9d;
      text-align: center;
      margin-bottom: 16px;
      transform: translateY(-4px);
    }
    .pic {
      margin-top: 15px;
      height: 216px;
      .img {
        height: 218px;
      }
    }
  }
}
</style>
