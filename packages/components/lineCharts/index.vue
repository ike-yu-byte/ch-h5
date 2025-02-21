<template>
  <div class="circle-wrap">
    <div ref="dom" class="target-dom" v-if="props.xData.length"></div>
    <div v-else class="no-data">{{ $t('暂无数据') }}</div>
  </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, watch, nextTick, onBeforeUnmount } from 'vue'
defineOptions({
  name: 'LineCharts',
})

const props = defineProps({
  legend: {
    type: Boolean,
    default: false,
  },
  xData: {
    type: Array,
    default: () => ['1', '2', '3', '4', '5', '6', '7', '8'],
  },
  areaStyle: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Array<any>,
    default: () => [
      {
        label: '数据一',
        data: [3, 4, 5, 1, 2, 6, 7, 8],
        color: [
          {
            offset: 0,
            color: 'RGBA(69, 241, 158, 0.6)',
          },
          {
            offset: 1,
            color: 'RGBA(69, 241, 158, 0)',
          },
        ],
      },
      {
        label: '数据二',
        data: [6, 8, 10, 2, 4, 16, 17, 18],
        color: [
          {
            offset: 0,
            color: 'RGBA(30, 214, 255, 0.6)',
          },
          {
            offset: 1,
            color: 'RGBA(30, 214, 255, 0)',
          },
        ],
      },
    ],
  },
})
const dom = ref(null)

let instance = null
let observer = null

watch(
  () => props.data,
  () => {
    initEcharts()
  },
  {
    deep: true,
    immediate: true,
  },
)
let timer = null
// let currentIndex = -1
function initEcharts() {
  nextTick(() => {
    if (instance) {
      instance.dispose()
      instance = null
    }
    if (!props.xData?.length) return
    instance = echarts.init(dom.value)
    const tempData = []
    const options = {
      tooltip: {
        trigger: 'axis',
        show: true,
      },
      legend: {
        textStyle: {
          color: '#fff',
        },
        left: '0%',
        show: props.legend,
      },
      grid: {
        top: '4%',
        bottom: '0%', //也可设置left和right设置距离来控制图表的大小
        left: '0%',
        right: '4%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false, // 边界间隙
        axisLine: {
          // 轴线设置
          show: true, // 显示轴线
          lineStyle: {
            color: '#989fb1',
            opacity: 0.5,
          },
        },
        axisLabel: {
          color: '#989fb1', //更改坐标轴文字颜色
          fontSize: getSize(12), //更改坐标轴文字大小
          interval: 0,
        },
        data: props.xData,
        alignTicks: true,
        axisTick: {
          show: true,
        },
      },
      yAxis: {
        position: 'right',
        splitLine: {
          show: false,
          lineStyle: {
            color: ['#8EEEFF'],
            opacity: 0.11,
          },
        },
        axisLabel: {
          color: '#989fb1', //更改坐标轴文字颜色
          fontSize: getSize(12), //更改坐标轴文字大小
        },
        splitNumber: 5,
      },
      series: [],
    }
    props.data.forEach((item) => {
      tempData.push({
        name: item.label,
        type: 'line',
        // smooth: true,
        symbol: 'circle',
        symbolSize: getSize(6),
        itemStyle: {
          shadowColor: '#fff',
          shadowBlur: 10,
          color: item.itemColor,
        },
        smooth: true,
        // label: {
        //     show: true,
        //     position: 'right',
        //     color: '#fff'
        // },
        areaStyle: {
          opacity: props.areaStyle ? 1 : 0,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: item.color?.[0]?.offset,
              color: item.color?.[0]?.color,
            },
            {
              offset: item.color?.[1]?.offset,
              color: item.color?.[1]?.color,
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: item.data,
        tooltip: {
          show: true,
        },
      })
    })
    options.series = tempData
    instance.setOption(options)
    // instance.dispatchAction({
    //   type: "showTip", // 根据 tooltip 的配置项显示提示框。
    //   // seriesIndex: 0,
    //   dataIndex: 0,
    // });
    // startTooltipLoop(instance); // 开启轮播
  })
}

function getSize(num: number) {
  return (window.innerWidth / 1920) * num
}

onMounted(() => {
  initEcharts()
  observer = new ResizeObserver((entries) => {
    for (let entry of entries) {
      // 假设echarts实例已经挂载在chartContainer上
      if (entry.target === dom.value) {
        // instance.resize();
        initEcharts()
        console.log('重新绘line图')
      }
    }
  })
  observer.observe(dom.value)
})

// function switchTooltip(myChart) {
//   // 取消之前高亮的图形
//   // myChart.dispatchAction({
//   //   type: "downplay",
//   //   seriesIndex: 1,
//   //   dataIndex: currentIndex,
//   // });

//   currentIndex = (currentIndex + 1) % 31
//   // 高亮当前图形
//   myChart.dispatchAction({
//     type: 'highlight',
//     seriesIndex: 1,
//     dataIndex: currentIndex,
//   })
//   // 显示tooltip
//   myChart.dispatchAction({
//     type: 'showTip',
//     seriesIndex: 1,
//     dataIndex: currentIndex,
//   })
//   console.log('执行轮播', currentIndex)
// }

// function startTooltipLoop(myChart) {
//   clearInterval(timer)
//   timer = setInterval(() => switchTooltip(myChart), 3000)
// }

// function closeSwitchTooltip() {
//   timer = undefined
//   clearInterval(timer)
// }

// 开启轮播
// startTooltipLoop(myChart);

onBeforeUnmount(() => {
  observer?.disconnect()
  clearInterval(timer)
})
</script>

<style scoped lang="scss">
.circle-wrap {
  height: 100%;
  width: 100%;
  position: relative;
  .no-data {
    color: #a8abb2;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .target-dom {
    height: 100%;
    width: 100%;
  }
}
</style>
