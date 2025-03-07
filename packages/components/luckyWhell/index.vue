<template>
  <div class="wrap">
    <div class="whell" v-if="show">
      <LuckyWheel
        ref="myLucky"
        width="3rem"
        height="3rem"
        :prizes="prizes"
        :blocks="blocks"
        :buttons="buttons"
        :defaultConfig="defaultConfig"
        @start="startCallback"
        @end="endCallback"
      ></LuckyWheel>
    </div>
    <!-- 注意：LuckyWheel硬性要求要在各项目中通过app.use全局引入 -->
    <slot>
      <div class="whell-content">
        <div class="content-box">
          <div>
            <img src="@packages/assets/img/icon_count.png" />
            <span
              ><b>{{ restTime }}</b
              >{{ `  ${$t('poster.daojishi')}` }}</span
            >
          </div>
          <div>
            <img src="@packages/assets/img/icon_time.png" />
            <span
              >{{ $t('poster.jinrishengyu') }}
              <b>{{ restTimes + $t('poster.ci') }}</b></span
            >
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>
<script>
import btc from '@/assets/img/prize/icon_btc.svg'
import eth from '@/assets/img/prize/icon_eth.svg'
import usdt from '@/assets/img/prize/icon_usdt.svg'
import xrp from '@/assets/img/prize/icon_xrp.svg'
const defaultData = [
  { text: '0.2', unit: 'USDT', src: usdt },
  { text: '0.5', unit: 'USDT', src: usdt },
  { text: '100', unit: 'XRP', src: xrp },
  { text: '1', unit: 'USDT', src: usdt },
  { text: '5', unit: 'USDT', src: usdt },
  { text: '1', unit: 'ETH', src: eth },
  { text: '1', unit: 'BTC', src: btc },
  { text: '0.1', unit: 'USDT', src: usdt },
]
</script>
<script setup>
import { ref, reactive, toRefs, watch, unref, onMounted } from 'vue'
import bg from '@packages/assets/img/circle.png'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
  data: {
    type: Array,
    default: () => defaultData,
  },
  duration: {
    // 几秒后抽奖结束,单位毫秒
    type: Number,
    default: 10000,
  },
  text: {
    type: String,
    default: '',
  },
  times: {
    // 剩余抽奖次数
    type: Number,
    default: 1,
  },
})

// 动态加载前端存储好的奖品图片
// function getPic(addr) {
//   const module = import.meta.glob(`@/assets/img/prize/*`);
//   for (let path in module) {
//     if (path.includes(addr)) {
//       return new URL(path, import.meta.url).href;
//     }
//   }
// }
const defaultText = ref('')
const show = ref(false)
onMounted(() => {
  show.value = false
  setTimeout(() => {
    defaultText.value = t('poster.lijichoujiang')
    data.buttons[0].fonts[0].text = defaultText.value
    show.value = true
  }, 100)
})

const propsData = (props.data || []).map((item, index) => ({
  fonts: [
    {
      text: item.text + item.unit,
      top: '50%',
      fontSize: '0.13rem',
      fontColor: item.fontColor || (index % 2 === 0 ? '#fff' : '#18986f'),
    },
  ],
  imgs: [
    {
      src: item.src,
      // getPic(item.unit.toLowerCase()),
      // prizePng[item.unit.toLowerCase()]
      top: '14%',
      width: '0.3rem',
      height: '0.3rem',
    },
  ],
  index,
}))
const data = reactive({
  restTime: '00:00', // 倒计时,
  restTimes: props.times, // 剩余抽奖次数
  blocks: [
    {
      padding: '0.13rem',
      background: 'transparent',
      imgs: [
        {
          // 边框
          src: bg,
          width: '100%',
          height: '100%',
        },
        {
          // 背景
          src: bg,
          width: '100%',
          height: '100%',
          rotate: true, // 背景图片跟着旋转
        },
      ],
    },
  ],
  prizes: propsData,
  buttons: [
    {
      radius: '35%',
      pointer: true,
      fonts: [
        {
          text: props.text,
          top: '-0.1rem',
          fontSize: '0.16rem',
          fontColor: '#cd5c5c',
        },
      ],
    },
  ],
  defaultConfig: {
    offsetDegree: 360 / propsData.length / 2,
  },
})

watch(
  () => props.times,
  (newVal) => {
    data.restTimes = unref(newVal)
  },
  {
    immediate: true,
    deep: true,
  },
)

const { blocks, prizes, buttons, defaultConfig, restTime, restTimes } =
  toRefs(data)
const myLucky = ref(null)

function startCallback() {
  if (data.restTimes <= 0) {
    return
  }
  // 调用抽奖组件的play方法开始游戏
  myLucky.value.play()
  data.restTimes -= 1

  function timeFormat(seconds) {
    const minute = parseInt(seconds / 60)
    const second = seconds % 60
    return (
      minute.toString().padStart(2, '0') +
      ':' +
      second.toString().padStart(2, '0')
    )
  }

  let seconds = props.duration / 1000
  data.restTime = timeFormat(seconds)
  // 模拟调用接口异步抽奖
  const timer = setInterval(() => {
    seconds = seconds - 1
    console.log('走这里')
    data.restTime = timeFormat(seconds)
    if (seconds === 0) {
      // 假设后端返回的中奖索引是0
      const index = parseInt(Math.random() * 10)
      // 调用stop停止旋转并传递中奖索引
      myLucky.value.stop(index)
      clearTimeout(timer)
    }
  }, 1000)
}
const emit = defineEmits(['change'])
function endCallback(prize) {
  emit('change', prize)
}
</script>

<style lang="scss" scoped>
.wrap {
  padding-top: 20px;
  .whell {
    display: flex;
    justify-content: center;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: -20px;
      transform: translateX(-50%);
      display: block;
      height: 50px;
      width: 30px;
      background: url(@packages/assets/img/cursor.png) no-repeat;
      background-size: contain;
      z-index: 999;
    }
  }
  .whell-content {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    .content-box {
      height: 140px;
      width: 313px;
      background-color: #fff;
      font-size: 15px;
      box-sizing: border-box;
      padding: 20px;
      border-radius: 8px;
      div {
        height: 24px;
        padding: 8px 18px;
        margin-bottom: 10px;
        background-color: #f3f3f3;
        border-radius: 4px;
        display: flex;
        align-items: center;
        img {
          height: 24px;
          width: 24px;
          margin-right: 10px;
        }
        b {
          color: rgb(46, 74, 157);
        }
      }
    }
  }
}
</style>
