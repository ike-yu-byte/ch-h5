import { useDeviceStore } from '@/store'
const rootVal = 100
const pcDesign = 1920
const divideNumber = 1200 // PC端、移动端分割线
const mobileDesign = 375
;(function () {
  const docEl = document.documentElement
  const scale = 1
  const metaEl: any = document.querySelector('meta[name="viewport"]')
  metaEl.setAttribute(
    'content',
    'width=device-width,initial-scale=' +
      scale +
      ',maximum-scale=' +
      scale +
      ', minimum-scale=' +
      scale +
      ',user-scalable=no',
  )
  function setRem() {
    const clientWidth = docEl.clientWidth
    let fontSize = 100

    if (clientWidth > divideNumber) {
      // 计算PC端大小
      fontSize = (clientWidth / pcDesign) * rootVal
    } else {
      // 计算移动端大小
      fontSize = (clientWidth / mobileDesign) * rootVal
    }
    docEl.style.fontSize = fontSize + 'px'
    setTimeout(() => {
      const { setIsPC } = useDeviceStore()
      setIsPC(clientWidth > divideNumber ? true : false)
      document.body.className = clientWidth > divideNumber ? 'pc' : 'mobile'
    }, 100)
  }
  setRem()
  window.addEventListener(
    'resize',
    function () {
      setRem()
    },
    false,
  )
})()
