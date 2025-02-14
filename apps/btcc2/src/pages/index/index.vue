<template>
  <div class="index">
    <Header @right="show = !show" />
    <div class="content">
      <div>子应用</div>
      <Poster class="poster" />
      <div class="luck">
        <TextSwiper @right="handleViewPrize">
          <template #left>
            <img src="@/assets/img/coin.png" class="swiper-left" />
          </template>
        </TextSwiper>
        <div class="rotate-panel">
          <LuckyWheel @change="handleWeelChange" />
        </div>
      </div>
      <Rules />
      <Footer />
    </div>
    <img src="@/assets/img/feed.svg" class="feedback" />
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
    <Popup v-model:show="showPrize">
      <div class="prize-box">
        <div class="title">{{ $t("titles.zhongjiang") }}</div>
        <div class="detail">
          <div class="name">1ETHETH</div>
          <div class="time">2024-06-27 12:00:00</div>
        </div>
      </div>
    </Popup>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { Popup } from "vant";
import { langs, cloneDeep } from "@packages/assets";
import List from "@packages/components/langList/index.vue";
import TextSwiper from "@packages/components/textSwiper/index.vue";
import LuckyWheel from "@packages/components/luckyWhell/index.vue";
import Poster from "@/components/poster/index.vue";
import Header from "@/components/header/index.vue";
import Rules from "@/components/rules/index.vue";
import Footer from "@/components/footer/index.vue";
import { showToast } from "vant";

const { locale, t } = useI18n();
const show = ref(false);
const showPrize = ref(false);
const langOptions = ref(cloneDeep(langs));

const handleClose = (val) => {
  show.value = val;
};

const handleSelect = (item) => {
  locale.value = item.value;
  localStorage.setItem("lang", locale.value);
  location.reload();
};

// 查看奖励
const handleViewPrize = () => {
  const flag = true; // 有无中奖信息
  if (flag) {
    showPrize.value = true;
  } else {
    showToast({
      type: "fail",
      message: t("tooltip.meiyoujiang"),
    });
  }
};

function handleWeelChange(data) {
  console.log("大转盘结果", data);
}
</script>

<style lang="scss" scoped>
.index {
  .content {
    max-height: calc(100vh - 56px);
    overflow: scroll;
    .poster {
      margin-bottom: 40px;
    }
    .luck {
      background-color: #f5f5f5;
      padding: 0 16px 20px;
      height: auto;
      .rotate-panel {
        padding-top: 40px;
        border-top: 1px dashed #ccc;
      }
    }
  }
}
.swiper-left {
  width: 33.48px;
  height: 26.5px;
}
.prize-box {
  width: 200px;
  height: 200px;
  border-radius: 8px;
  overflow: scroll;
  .title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }
  .detail {
    font-size: 16px;
    color: #aaa;
    padding: 10px;
  }
}
.feedback {
  width: 36px;
  height: 46px;
  position: fixed;
  bottom: 80px;
  right: 2%;
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
