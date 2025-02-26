<template>
  <div class="menu" v-if="props.showMenus">
    <div
      :class="`item ${currentVal === item.value ? 'active' : ''}`"
      v-for="item of menus"
      :key="item.label"
      @click="handleClick(item)"
    >
      {{ item.label }}
    </div>
  </div>
  <div
    :class="`chart ${props.showMenus ? '' : 'no-menus'}`"
    ref="chartDom"
    height="100%"
  ></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { nextTick, watch, ref } from 'vue'
import dayjs from 'dayjs'

const menus = ref([
  {
    label: '1m',
    value: '1m',
  },
  {
    label: '5m',
    value: '5m',
  },
  {
    label: '1H',
    value: '1H',
  },
  {
    label: '1D',
    value: '1D',
  },
  {
    label: '1W',
    value: '1W',
  },
])
const currentVal = ref('1m')

const props = defineProps({
  data: {
    type: Array,
    default: () => [
      {
        name: '2025-01-01 14:05:06',
        value: 56655,
      },
      {
        name: '2025-01-01 14:35:06',
        value: 5665,
      },
      {
        name: '2025-01-01 15:05:06',
        value: 244445,
      },
      {
        name: '2025-01-01 15:35:06',
        value: 2445,
      },
      {
        name: '2025-01-01 16:05:06',
        value: 145,
      },
    ],
  },
  color: {
    type: String,
    default: '#12B37D', // 绿色
  },
  showMenus: {
    type: Boolean,
    default: true,
  },
  showAxis: {
    type: Boolean,
    default: true,
  },
})

function hexToRGBA(hex, alpha = 1) {
  // 输入验证
  const hexRegex = /^#([A-Fa-f0-9]{3}){1,2}$/i
  if (!hexRegex.test(hex)) return null

  // 处理透明度范围
  const validAlpha = Math.min(1, Math.max(0, alpha))

  // 去除#号并处理缩写格式
  let hexPart = hex.slice(1)
  if (hexPart.length === 3) {
    hexPart = hexPart
      .split('')
      .map((c) => c + c)
      .join('')
  }

  // 解析颜色分量
  const r = parseInt(hexPart.substring(0, 2), 16)
  const g = parseInt(hexPart.substring(2, 4), 16)
  const b = parseInt(hexPart.substring(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${validAlpha})`
}

let myChart

const chartDom = ref()
const initChart = () => {
  nextTick(() => {
    setTimeout(() => {
      if (!chartDom.value) return
      if (myChart) {
        myChart.dispose()
      }
      myChart = echarts.init(chartDom.value)
      let option

      function randomData(i) {
        now = new Date(+now + oneDay)
        value = value + Math.random() * 21 - 10
        const item: any = props.data[i]
        return {
          name: '',
          value: [
            // [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
            // Math.round(value),
            item.name,
            item.value,
          ],
        }
      }
      let data = []
      let now = new Date(1997, 9, 3)
      let oneDay = 24 * 3600 * 1000
      let value = Math.random() * 1000
      for (var i = 0; i < props.data.length; i++) {
        data.push(randomData(i))
      }

      const xAxis = data.map((item) => {
        return item.value[0]
      })
      option = {
        title: {
          text: '',
        },
        grid: {
          top: '4%',
          bottom: props.showAxis ? '0%' : '2%', //也可设置left和right设置距离来控制图表的大小
          left: '4%',
          right: '4%',
          containLabel: true,
        },
        tooltip: {
          trigger: 'axis',
          show: props.showAxis,
          formatter: function (params) {
            params = params[0]
            var date = new Date(params.value[0])
            return (
              date.getFullYear().toString().padStart(2, '0') +
              '/' +
              (date.getMonth() + 1).toString().padStart(2, '0') +
              '/' +
              date.getDate().toString().padStart(2, '0') +
              ' ' +
              date.getHours().toString().padStart(2, '0') +
              ':' +
              date.getMinutes().toString().padStart(2, '0') +
              ':' +
              date.getSeconds().toString().padStart(2, '0') +
              '  ' +
              params.value[1]
            )
          },
          axisPointer: {
            animation: false,
          },
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false,
          },
          boundaryGap: false, // 边界间隙
          axisLine: {
            // 轴线设置
            show: props.showAxis, // 显示轴线
            lineStyle: {
              color: props.color,
              opacity: 0.5,
            },
          },
          showMinLabel: true,
          axisLabel: {
            show: props.showAxis,
            color: props.color, //更改坐标轴文字颜色
            showMaxLabel: true, // 强制显示最大标签
            showMinLabel: true, // 强制显示最小标签
            hideOverlap: false,
            fontSize: getSize(12), //更改坐标轴文字大小
            formatter(val) {
              return dayjs(val).format('HH:mm')
            },
          },
          alignTicks: true,
          axisTick: {
            show: true,
          },
          data: xAxis,
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
            show: props.showAxis,
            color: '#989fb1', //更改坐标轴文字颜色
            fontSize: getSize(12), //更改坐标轴文字大小
          },
          splitNumber: 5,
        },
        series: [
          {
            name: '',
            type: 'line',
            showSymbol: false,
            lineStyle: {
              color: function (params) {
                const val = params.value[1]
                if (val > 0) {
                  return props.color
                } else {
                  return 'red'
                }
              },
            },
            itemStyle: {
              color: function (params) {
                const val = params.value[1]
                if (val > 0) {
                  return props.color
                } else {
                  return 'red'
                }
              },
            },
            areaStyle: {
              opacity: 1,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: props.color,
                },
                {
                  offset: 1,
                  color: hexToRGBA(props.color, 0.05),
                },
              ]),
            },
            smooth: true,
            data: data,
          },
        ],
      }

      myChart.setOption(option)
    }, 100)
  })
}

watch(
  () => props.data,
  () => {
    initChart()
  },
  {
    deep: true,
    immediate: true,
  },
)

function getSize(num: number) {
  const width = document.documentElement.clientWidth
  if (width > 1200) {
    return (window.innerWidth / 1920) * num
  } else {
    return (window.innerWidth / 375) * num
  }
}
const emits = defineEmits(['change'])

window.addEventListener('resize', () => {
  initChart()
})

const handleClick = (item: any) => {
  currentVal.value = item.value
  emits('change', item)
}
</script>

<style scoped lang="scss">
.menu {
  display: flex;
  .item {
    font-size: 14px;
    padding: 4px 15px;
    font-weight: normal;
    font-family: Figtree-Regular;
    color: rgb(160, 163, 179);
    line-height: 21px;
    cursor: pointer;
  }
  .active {
    background-color: rgba(143, 149, 179, 0.1);
    color: rgb(0, 17, 60);
    border-radius: 3px;
  }
}
.chart {
  width: 100%;
  height: calc(100% - 30px - 40px);
  margin-top: 40px;
}
.no-menus {
  height: 100%;
  margin-top: 0px;
}
</style>
