<template>
  <div>
    <div @click="handleSend">按钮</div>
    <div @click="handleChange">切换</div>
    <WujieVue
      width="100%"
      height="100%"
      :name="state.currentChild.name"
      :url="state.currentChild.url"
      :sync="false"
      :degrade="false"
      :attrs="{ src: 'http://192.168.0.101:5000/' }"
      :props="{ data: 'ike', methods: 'bangbangda' }"
    />
  </div>
</template>

<script setup lang="ts">
import { subApps } from "@/config";
import { reactive, onBeforeUnmount } from "vue";
import wujieVue from "wujie-vue3";

const { bus } = wujieVue;

const handleMessage = (arg: any) => {
  console.log("主应用收到arg", arg);
  // 处理事件...
};

bus.$on("email", handleMessage);

const handleSend = () => {
  bus.$emit("msg", "from parent");
  console.log('子应用上的window内容', (document.querySelector(`iframe[name=${state.currentChild.name}]`) as any).contentWindow)
};

const handleChange = () => {
  if (state.index < (subApps.length - 1)) {
    state.index++
  } else {
    state.index = 0;
  }
  state.currentChild = subApps[state.index]
}

const state = reactive<any>({
  currentChild: {},
  index: 0
});
state.currentChild = subApps[subApps.length - 1];
state.index = subApps.length - 1;

onBeforeUnmount(() => {
  bus.$off("message", handleMessage);
});
</script>
