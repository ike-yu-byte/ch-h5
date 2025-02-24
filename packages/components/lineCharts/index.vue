<template>
  <div class="circle-wrap">
    <div ref="dom" class="target-dom" v-if="props.data.length"></div>
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
  data: {
    type: Array,
    default: () => [
      {
        name: '1',
        value: 8,
      },
      {
        name: '2',
        value: 4,
      },
      {
        name: '3',
        value: 5,
      },
      {
        name: '4',
        value: 1,
      },
      {
        name: '5',
        value: 2,
      },
      {
        name: '6',
        value: 6,
      },
      {
        name: '7',
        value: 7,
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

    instance = echarts.init(dom.value)
    let data = []
    let xData = props.data.map((item: any) => {
      data.push(item.value)
      return item.name
    })
    data = []
    xData = []
    for (let i = 0; i < 100; i++) {
      data.push(Math.random() * 1000)
      xData.push(i)
    }
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
        data: xData,
        alignTicks: true,
        axisTick: {
          show: true,
        },
        splitNumber: 5,
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

    options.series = [
      {
        data,
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
        name: '',
        type: 'line',
        symbol: 'circle',
        symbolSize: getSize(6),
        itemStyle: {
          shadowColor: '#fff',
          shadowBlur: 10,
          color: 'green',
        },
        smooth: true,
        areaStyle: {
          opacity: 1,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'RGBA(69, 241, 158, 0.6)',
            },
            {
              offset: 1,
              color: 'RGBA(69, 241, 158, 0)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        tooltip: {
          show: true,
        },
      },
    ]
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
