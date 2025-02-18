const rootVal = 100
const verticalDesignValue = 375
const horizontalDesignValue = 375
;(function () {
  const baseSize = rootVal // 32
  const docEl = document.documentElement
  const clientWidth = docEl.clientWidth
  //   const clintHeight = docEl.clientHeight;
  const isVertical = true
  //  clientWidth < clintHeight;// true-竖屏 false-横屏
  // const dpr = window.devicePixelRatio || 1; // 获取dpr
  // let scale = 1 / dpr;
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
    const realClientWidth = docEl.clientWidth
    const realValue = realClientWidth === clientWidth ? isVertical : !isVertical
    // profileStoreWithOut().setVertical(realValue);
    const designValue = realValue ? verticalDesignValue : horizontalDesignValue
    docEl.style.fontSize = baseSize * (realClientWidth / designValue) + 'px'
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
