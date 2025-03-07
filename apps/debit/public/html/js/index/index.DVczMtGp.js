import {
  d as U,
  k as v,
  a0 as I,
  a as d,
  F as S,
  L as R,
  b as t,
  C as V,
  v as N,
  s as P,
  a1 as j,
  a2 as G,
  G as O,
  g as u,
  t as e,
  _ as B,
  q as J,
  u as K,
  A as q,
  x as M,
  N as Y,
  r as Q,
  w as F,
  I as n,
  y as T,
  e as y,
  D as $,
  a3 as X,
  a4 as A,
  K as W,
  Q as Z,
} from '../.pnpm/.pnpm.Bclsl_Dx.js'
import { u as tt, $ as s, r as et } from '../../assets/index-C6dA6UAt.js'
const st = '' + new URL('../../img/img_top_poster.jpg', import.meta.url).href,
  ot = '' + new URL('../../video/img_top.webm', import.meta.url).href,
  nt = '' + new URL('../../video/img_top.mp4', import.meta.url).href,
  at = { key: 0, class: 'menu' },
  it = ['onClick'],
  lt = U({
    __name: 'index',
    props: {
      data: {
        type: Array,
        default: () => [
          { name: '2025-01-01 14:05:06', value: 56655 },
          { name: '2025-01-01 14:35:06', value: 5665 },
          { name: '2025-01-01 15:05:06', value: 244445 },
          { name: '2025-01-01 15:35:06', value: 2445 },
          { name: '2025-01-01 16:05:06', value: 145 },
        ],
      },
      color: { type: String, default: '#12B37D' },
      showMenus: { type: Boolean, default: !0 },
      showAxis: { type: Boolean, default: !0 },
    },
    emits: ['change'],
    setup(L, { emit: p }) {
      const f = v([
          { label: '1m', value: '1m' },
          { label: '5m', value: '5m' },
          { label: '1H', value: '1H' },
          { label: '1D', value: '1D' },
          { label: '1W', value: '1W' },
        ]),
        x = v('1m'),
        l = L
      function C(i, _ = 1) {
        if (!/^#([A-Fa-f0-9]{3}){1,2}$/i.test(i)) return null
        const c = Math.min(1, Math.max(0, _))
        let o = i.slice(1)
        o.length === 3 &&
          (o = o
            .split('')
            .map((E) => E + E)
            .join(''))
        const r = parseInt(o.substring(0, 2), 16),
          h = parseInt(o.substring(2, 4), 16),
          H = parseInt(o.substring(4, 6), 16)
        return 'rgba('
          .concat(r, ', ')
          .concat(h, ', ')
          .concat(H, ', ')
          .concat(c, ')')
      }
      let a
      const w = v(),
        b = () => {
          P(() => {
            setTimeout(() => {
              a && a.dispose(), (a = j(w.value))
              let i
              function _(r) {
                const h = l.data[r]
                return { name: '', value: [h.name, h.value] }
              }
              let m = []
              for (var c = 0; c < l.data.length; c++) m.push(_(c))
              const o = m.map((r) => r.value[0])
              ;(i = {
                title: { text: '' },
                grid: {
                  top: '4%',
                  bottom: l.showAxis ? '0%' : '2%',
                  left: '4%',
                  right: '4%',
                  containLabel: !0,
                },
                tooltip: {
                  trigger: 'axis',
                  show: l.showAxis,
                  formatter: function (r) {
                    r = r[0]
                    var h = new Date(r.value[0])
                    return (
                      h.getFullYear().toString().padStart(2, '0') +
                      '/' +
                      (h.getMonth() + 1).toString().padStart(2, '0') +
                      '/' +
                      h.getDate().toString().padStart(2, '0') +
                      ' ' +
                      h.getHours().toString().padStart(2, '0') +
                      ':' +
                      h.getMinutes().toString().padStart(2, '0') +
                      ':' +
                      h.getSeconds().toString().padStart(2, '0') +
                      '  ' +
                      r.value[1]
                    )
                  },
                  axisPointer: { animation: !1 },
                },
                xAxis: {
                  type: 'time',
                  splitLine: { show: !1 },
                  boundaryGap: !1,
                  axisLine: {
                    show: l.showAxis,
                    lineStyle: { color: l.color, opacity: 0.5 },
                  },
                  showMinLabel: !0,
                  axisLabel: {
                    show: l.showAxis,
                    color: l.color,
                    showMaxLabel: !0,
                    showMinLabel: !0,
                    hideOverlap: !1,
                    fontSize: g(12),
                    formatter(r) {
                      return O(r).format('HH:mm')
                    },
                  },
                  alignTicks: !0,
                  axisTick: { show: !0 },
                  data: o,
                },
                yAxis: {
                  position: 'right',
                  splitLine: {
                    show: !1,
                    lineStyle: { color: ['#8EEEFF'], opacity: 0.11 },
                  },
                  axisLabel: {
                    show: l.showAxis,
                    color: '#989fb1',
                    fontSize: g(12),
                  },
                  splitNumber: 5,
                },
                series: [
                  {
                    name: '',
                    type: 'line',
                    showSymbol: !1,
                    lineStyle: {
                      color: function (r) {
                        return r.value[1] > 0 ? l.color : 'red'
                      },
                    },
                    itemStyle: {
                      color: function (r) {
                        return r.value[1] > 0 ? l.color : 'red'
                      },
                    },
                    areaStyle: {
                      opacity: 1,
                      color: new G(0, 0, 0, 1, [
                        { offset: 0, color: l.color },
                        { offset: 1, color: C(l.color, 0.05) },
                      ]),
                    },
                    smooth: !0,
                    data: m,
                  },
                ],
              }),
                a.setOption(i)
            }, 100)
          })
        }
      I(
        () => l.data,
        () => {
          b()
        },
        { deep: !0, immediate: !0 },
      )
      function g(i) {
        return document.documentElement.clientWidth > 1200
          ? (window.innerWidth / 1920) * i
          : (window.innerWidth / 375) * i
      }
      const D = p
      window.addEventListener('resize', () => {
        b()
      })
      const k = (i) => {
        ;(x.value = i.value), D('change', i)
      }
      return (i, _) => (
        u(),
        d(
          S,
          null,
          [
            l.showMenus
              ? (u(),
                d('div', at, [
                  (u(!0),
                  d(
                    S,
                    null,
                    V(
                      f.value,
                      (m) => (
                        u(),
                        d(
                          'div',
                          {
                            class: N(
                              'item '.concat(
                                x.value === m.value ? 'active' : '',
                              ),
                            ),
                            key: m.label,
                            onClick: (c) => k(m),
                          },
                          e(m.label),
                          11,
                          it,
                        )
                      ),
                    ),
                    128,
                  )),
                ]))
              : R('', !0),
            t(
              'div',
              {
                class: N('chart '.concat(l.showMenus ? '' : 'no-menus')),
                ref_key: 'chartDom',
                ref: w,
                height: '100%',
              },
              null,
              2,
            ),
          ],
          64,
        )
      )
    },
  }),
  z = B(lt, [['__scopeId', 'data-v-db06e9dd']]),
  rt =
    '' +
    new URL('../../assets/community_img_1-BHfPDRmk.png', import.meta.url).href,
  ct =
    '' +
    new URL('../../assets/community_img_2-D6zVLdKn.png', import.meta.url).href,
  dt =
    '' +
    new URL('../../assets/community_img_3-BWEaATjU.png', import.meta.url).href,
  ut =
    '' +
    new URL('../../assets/index_icon_step1-DrJyr25-.png', import.meta.url).href,
  _t =
    '' +
    new URL('../../assets/index_icon_step2-BtiYJq2F.png', import.meta.url).href,
  mt =
    '' +
    new URL('../../assets/index_icon_step3-DprUeuT3.png', import.meta.url).href,
  ht = { class: 'content-wrapper' },
  vt = { key: 0, class: 'content-wrapper' },
  pt = U({
    __name: 'index',
    props: { speed: { default: 40 } },
    setup(L) {
      const p = L,
        f = v(),
        x = v(0),
        l = v(!1),
        C = v(!1),
        a = v(0),
        w = v(0)
      let b, g
      const D = () => {
          if (!f.value) return
          a.value = f.value.offsetWidth
          const c = f.value.querySelector('.content-wrapper')
          c && ((w.value = c.scrollWidth), (C.value = w.value > a.value))
        },
        k = (c) => {
          g || (g = c)
          const o = c - g
          ;(g = c),
            l.value ||
              ((x.value += (p.speed * o) / 1e3),
              x.value >= w.value && (x.value = 0)),
            (b = requestAnimationFrame(k))
        },
        i = () => {
          l.value = !0
        },
        _ = () => {
          ;(l.value = !1), (g = performance.now())
        },
        m = new ResizeObserver(() => {
          D()
        })
      return (
        J(() => {
          P(() => {
            D(), f.value && m.observe(f.value), (b = requestAnimationFrame(k))
          })
        }),
        K(() => {
          m.disconnect(), cancelAnimationFrame(b)
        }),
        I(
          () => p.speed,
          () => {
            cancelAnimationFrame(b), (b = requestAnimationFrame(k))
          },
        ),
        (c, o) => (
          u(),
          d(
            'div',
            {
              class: 'scroll-container',
              ref_key: 'containerRef',
              ref: f,
              onMouseenter: i,
              onMouseleave: _,
            },
            [
              t(
                'div',
                {
                  class: 'scroll-content',
                  style: q({
                    transform: 'translateX(-'.concat(x.value, 'px)'),
                    transition: l.value ? 'none' : 'transform 0.6s linear',
                  }),
                },
                [
                  t('div', ht, [M(c.$slots, 'default', {}, void 0, !0)]),
                  C.value
                    ? (u(),
                      d('div', vt, [M(c.$slots, 'default', {}, void 0, !0)]))
                    : R('', !0),
                ],
                4,
              ),
            ],
            544,
          )
        )
      )
    },
  }),
  ft = B(pt, [['__scopeId', 'data-v-f0fed078']]),
  bt = { class: 'index-box' },
  gt = { class: 'main-box' },
  xt = { class: 'contain-box' },
  yt = { class: 'left panel' },
  wt = { class: 'title' },
  St = { class: 'sub-title' },
  Dt = { class: 'number-box' },
  kt = { class: 'left item' },
  Ct = { class: 'value' },
  Nt = { class: 'unit' },
  Vt = { class: 'label' },
  Lt = { class: 'middle item' },
  $t = { class: 'value' },
  At = { class: 'unit' },
  Rt = { class: 'label' },
  Ft = { class: 'right item' },
  Tt = { class: 'value' },
  Ut = { class: 'unit' },
  Bt = { class: 'label' },
  Et = { class: 'use-box' },
  Mt = { class: 'right panel' },
  Wt = { class: 'btn-box' },
  zt = { class: 'market-lists' },
  It = { class: 'symbol' },
  Pt = { class: 'price' },
  qt = { class: 'step-box' },
  Ht = { class: 'contain-box' },
  jt = { class: 'title' },
  Gt = { class: 'coin' },
  Ot = { class: 'left' },
  Jt = { class: 'top' },
  Kt = ['src'],
  Yt = { class: 'unit' },
  Qt = { class: 'value' },
  Xt = { class: 'rate' },
  Zt = { class: 'right' },
  te = { style: { height: '3.7rem' } },
  ee = { class: 'goods-box' },
  se = { class: 'sub-title' },
  oe = { class: 'table' },
  ne = { width: '264px' },
  ae = { class: 'item' },
  ie = ['src'],
  le = { class: 'text' },
  re = { class: 'item' },
  ce = { class: 'trend item' },
  de = { class: 'action item' },
  ue = { class: 'addr-box' },
  _e = { class: 'container-box' },
  me = { class: 'header' },
  he = { class: 'sub-title' },
  ve = { class: 'banner-box' },
  pe = ['src'],
  fe = { class: 'title' },
  be = { class: 'sub-title' },
  ge = { class: 'step-box' },
  xe = { class: 'contain-box' },
  ye = { class: 'title' },
  we = { class: 'sub-title' },
  Se = { class: 'content' },
  De = ['src'],
  ke = { class: 'title' },
  Ce = { class: 'sub-title' },
  Ne = { class: 'contain-box', style: { 'margin-top': '1rem' } },
  Ve = { class: 'title' },
  Le = { class: 'sub-title' },
  $e = { class: 'goods-box' },
  Ae = { class: 'gray-box' },
  Re = { class: 'contain-box' },
  Fe = { class: 'text' },
  Te = { class: 'btn-box' },
  Ue = { class: 'btn' },
  Be = U({
    __name: 'index',
    setup(L) {
      const { isPC: p } = Y(tt()),
        f = [],
        x = []
      for (let i = 0; i < 30; i++)
        f.push({ symbol: 'BTC/USDT' + i, price: 88716.9, rate: 4.61 }),
          x.push({
            type: 'BTC',
            symbol:
              'https://img.idcs.io/tenants/12A9904584E555B10EA2ED6258D7C1EE/OtherFile60590046.png',
            price: '98,210.1000',
            rate: 0.42,
            trend: [],
          })
      const l = v([
          { img: rt, title: s('观点'), subtitle: s('顶级投资人观点') },
          {
            img: ct,
            title: s('快讯'),
            subtitle: s('行业前沿信息推送, 7*24小时要闻实时更新'),
          },
          {
            img: dt,
            title: s('文章'),
            subtitle: s('聚合多家财经及科技媒体，提供全面且专业的资讯报道'),
          },
        ]),
        C = v([
          {
            img: ut,
            text: s('第一步：创建账户'),
            subtext: s('一键创建您的Faith账户'),
            btntext: s('注册'),
            color: 'var(--dark-bg)',
            value: 'register',
          },
          {
            img: _t,
            text: s('第二步：购买加密货币'),
            subtext: s('通过一键购币或P2P快捷购买加密货币'),
            btntext: s('购买'),
            color: '',
            value: 'buy',
          },
          {
            img: mt,
            text: s('第三步：开始交易'),
            subtext: s('使用高达500倍杠杆交易加密货币衍生品。'),
            btntext: s('交易'),
            color: '',
            value: 'trade',
          },
        ]),
        a = Q({
          tableData: x || [],
          turnover: { startNum: 0, endNum: 0, unit: 'USD' },
          users: { startNum: 0, endNum: 0, unit: '+' },
          trades: { startNum: 0, endNum: 0, unit: '+' },
          inputVal: '',
          coinList: f || [],
          coinData: {
            logo: new URL('../../assets/crypto/BTC.png', import.meta.url).href,
            title: 'BTC/USDT',
            startNum: 0,
            endNum: 98265.6,
            rate: '1.13',
          },
        }),
        w = (i) => {
          ;(i === 'coin' || i === 'news') && console.log('type', i)
        }
      ;(a.turnover.endNum = 1e7), (a.users.endNum = 1e5), (a.trades.endNum = 10)
      const b = v(),
        g = () => {
          var i
          ;(i = b.value) == null || i.play()
        },
        D = () => {
          et.push({ name: 'register' })
        },
        k = (i) => {
          console.log('item', i)
        }
      return (i, _) => {
        const m = X,
          c = Z
        return (
          u(),
          d('div', bt, [
            t('div', gt, [
              t('div', xt, [
                t('div', yt, [
                  t(
                    'div',
                    wt,
                    e(n(s)('在Debit上交易加密货币、外汇及更多标的')),
                    1,
                  ),
                  t(
                    'div',
                    St,
                    e(
                      n(s)(
                        '100多万平台注册用户，1000多种资产类别，加入我们，一键跟随交易高手投资交易',
                      ),
                    ),
                    1,
                  ),
                  F(
                    t(
                      'div',
                      Dt,
                      [
                        t('div', kt, [
                          t('div', Ct, [
                            y(
                              n(A),
                              {
                                startVal: a.turnover.startNum,
                                endVal: a.turnover.endNum,
                                duration: 2e3,
                                class: 'number',
                              },
                              null,
                              8,
                              ['startVal', 'endVal'],
                            ),
                            t('span', Nt, e(a.turnover.unit), 1),
                          ]),
                          t('div', Vt, '24hr' + e(n(s)('成交量')), 1),
                        ]),
                        t('div', Lt, [
                          t('div', $t, [
                            y(
                              n(A),
                              {
                                startVal: a.users.startNum,
                                endVal: a.users.endNum,
                                duration: 2e3,
                                decimals: 0,
                                class: 'number',
                              },
                              null,
                              8,
                              ['startVal', 'endVal'],
                            ),
                            t('span', At, e(a.users.unit), 1),
                          ]),
                          t('div', Rt, e(n(s)('用户')), 1),
                        ]),
                        t('div', Ft, [
                          t('div', Tt, [
                            y(
                              n(A),
                              {
                                startVal: a.trades.startNum,
                                endVal: a.trades.endNum,
                                duration: 2e3,
                                class: 'number',
                              },
                              null,
                              8,
                              ['startVal', 'endVal'],
                            ),
                            t('span', Ut, e(a.trades.unit), 1),
                          ]),
                          t('div', Bt, e(n(s)('支持的交易对')), 1),
                        ]),
                      ],
                      512,
                    ),
                    [[T, n(p)]],
                  ),
                  F(
                    t(
                      'div',
                      Et,
                      [
                        y(
                          m,
                          {
                            'class': 'my-input',
                            'placeholder': n(s)('邮件/电话'),
                            'inputStyle': 'color: #fff;',
                            'modelValue': a.inputVal,
                            'onUpdate:modelValue':
                              _[0] || (_[0] = (o) => (a.inputVal = o)),
                          },
                          {
                            suffix: $(() => [
                              t(
                                'span',
                                { class: 'register-now', onClick: D },
                                e(n(s)('立即注册')),
                                1,
                              ),
                            ]),
                            _: 1,
                          },
                          8,
                          ['placeholder', 'modelValue'],
                        ),
                      ],
                      512,
                    ),
                    [[T, n(p)]],
                  ),
                ]),
                t('div', Mt, [
                  t(
                    'video',
                    {
                      class: 'video',
                      poster: st,
                      muted: '',
                      onCanplaythrough: g,
                      onEnded: g,
                      ref_key: 'videoRef',
                      ref: b,
                    },
                    _[3] ||
                      (_[3] = [
                        t('source', { src: ot, type: 'video/webm' }, null, -1),
                        t('source', { src: nt, type: 'video/mp4' }, null, -1),
                      ]),
                    544,
                  ),
                ]),
              ]),
              F(
                t(
                  'div',
                  Wt,
                  [
                    t(
                      'div',
                      { class: 'btn', onClick: D },
                      e(n(s)('立即注册')),
                      1,
                    ),
                  ],
                  512,
                ),
                [[T, !n(p)]],
              ),
            ]),
            t('div', zt, [
              y(ft, null, {
                default: $(() => [
                  (u(!0),
                  d(
                    S,
                    null,
                    V(
                      a.coinList,
                      (o, r) => (
                        u(),
                        d('view', { class: 'symbol-item', key: r }, [
                          t('span', It, e(o.symbol), 1),
                          t(
                            'span',
                            Pt,
                            ' (' + e(Number(o.price).toFixed(8)) + ') ',
                            1,
                          ),
                          t(
                            'span',
                            {
                              class: N(
                                'rate '.concat(
                                  parseFloat(o.rate) >= 0
                                    ? 'increase'
                                    : 'decrease',
                                ),
                              ),
                            },
                            e(o.rate) + '%',
                            3,
                          ),
                        ])
                      ),
                    ),
                    128,
                  )),
                ]),
                _: 1,
              }),
            ]),
            t('div', qt, [
              t('div', Ht, [
                t('div', jt, e(n(s)('市场趋势')), 1),
                t('div', Gt, [
                  t('div', Ot, [
                    t('div', Jt, [
                      t(
                        'img',
                        { src: a.coinData.logo, class: 'img' },
                        null,
                        8,
                        Kt,
                      ),
                      t('span', Yt, e(a.coinData.title), 1),
                    ]),
                    t('div', Qt, [
                      y(
                        n(A),
                        {
                          startVal: a.coinData.startNum,
                          endVal: a.coinData.endNum,
                          duration: 2e3,
                          decimals: 4,
                          class: 'number',
                        },
                        null,
                        8,
                        ['startVal', 'endVal'],
                      ),
                      t('span', Xt, [
                        t(
                          'span',
                          {
                            class: N(
                              'val '.concat(
                                Number(a.coinData.rate) > 0
                                  ? 'increase'
                                  : 'decrease',
                              ),
                            ),
                          },
                          e(a.coinData.rate) + '%',
                          3,
                        ),
                        t(
                          'span',
                          {
                            class: N(
                              'iconfont icon-xia '.concat(
                                Number(a.coinData.rate) > 0 ? 'rotate' : '',
                              ),
                            ),
                          },
                          null,
                          2,
                        ),
                      ]),
                    ]),
                  ]),
                  t('div', Zt, e(n(s)('立即交易')), 1),
                ]),
                t('div', te, [y(z)]),
                t('div', ee, [
                  t('div', se, e(n(s)('现货')), 1),
                  t('table', oe, [
                    t('thead', null, [
                      t('tr', null, [
                        t('th', null, e(n(s)('币种')), 1),
                        t('th', null, e(n(s)('价格')), 1),
                        t('th', null, e(n(s)('涨跌幅')), 1),
                        n(p)
                          ? (u(),
                            d(
                              S,
                              { key: 0 },
                              [
                                t('th', ne, e(n(s)('趋势图')), 1),
                                t('th', null, e(n(s)('操作')), 1),
                              ],
                              64,
                            ))
                          : R('', !0),
                      ]),
                    ]),
                    t('tfoot', null, [
                      (u(!0),
                      d(
                        S,
                        null,
                        V(
                          a.tableData.slice(0, 2),
                          (o) => (
                            u(),
                            d('tr', { key: o.type }, [
                              t('td', null, [
                                t('div', ae, [
                                  t(
                                    'img',
                                    { class: 'img', src: o.symbol },
                                    null,
                                    8,
                                    ie,
                                  ),
                                  t('span', le, e(o.type), 1),
                                ]),
                              ]),
                              t('td', null, [t('div', re, e(o.price), 1)]),
                              t(
                                'td',
                                {
                                  class: N(
                                    'rate '.concat(
                                      parseFloat(o.rate) > 0
                                        ? 'rise'
                                        : 'decrease',
                                    ),
                                  ),
                                },
                                [
                                  t(
                                    'div',
                                    {
                                      class: 'item',
                                      style: q({
                                        justifyContent: n(p) ? '' : 'right',
                                      }),
                                    },
                                    e(
                                      o.rate && parseFloat(o.rate) > 0
                                        ? '+ '.concat(o.rate)
                                        : '',
                                    ) + '% ',
                                    5,
                                  ),
                                ],
                                2,
                              ),
                              n(p)
                                ? (u(),
                                  d(
                                    S,
                                    { key: 0 },
                                    [
                                      t('td', ce, [
                                        t('div', null, [
                                          y(z, { showAxis: !1, showMenus: !1 }),
                                        ]),
                                      ]),
                                      t('td', null, [
                                        t('div', de, [
                                          y(c, null, {
                                            default: $(() => [
                                              W(e(n(s)('交易')), 1),
                                            ]),
                                            _: 1,
                                          }),
                                        ]),
                                      ]),
                                    ],
                                    64,
                                  ))
                                : R('', !0),
                            ])
                          ),
                        ),
                        128,
                      )),
                    ]),
                  ]),
                  t(
                    'div',
                    {
                      class: 'btn',
                      onClick: _[1] || (_[1] = (o) => w('coin')),
                    },
                    e(n(s)('查看更多')),
                    1,
                  ),
                ]),
              ]),
            ]),
            t('div', ue, [
              t('div', _e, [
                t('div', me, e(n(s)('在这里读懂区块链')), 1),
                t(
                  'div',
                  he,
                  e(n(s)('圈内人的精神加油站，让加密投资之旅更精彩')),
                  1,
                ),
                t('div', ve, [
                  (u(!0),
                  d(
                    S,
                    null,
                    V(
                      l.value,
                      (o, r) => (
                        u(),
                        d('div', { class: 'item', key: r }, [
                          t('div', null, [
                            t('img', { src: o.img }, null, 8, pe),
                          ]),
                          t('div', fe, e(o.title), 1),
                          t('div', be, e(o.subtitle), 1),
                        ])
                      ),
                    ),
                    128,
                  )),
                ]),
              ]),
            ]),
            t('div', ge, [
              t('div', xe, [
                t('div', ye, e(n(s)('让加密交易，更容易')), 1),
                t('div', we, e(n(s)('仅需3步，即可开始')), 1),
                t('div', Se, [
                  (u(!0),
                  d(
                    S,
                    null,
                    V(
                      C.value,
                      (o, r) => (
                        u(),
                        d('div', { class: 'item', key: r }, [
                          t('div', null, [
                            t('img', { class: 'img', src: o.img }, null, 8, De),
                          ]),
                          t('div', ke, e(o.text), 1),
                          t('div', Ce, e(o.subtext), 1),
                          y(
                            c,
                            {
                              class: 'button',
                              color: o.color,
                              onClick: (h) => k(o),
                            },
                            { default: $(() => [W(e(o.btntext), 1)]), _: 2 },
                            1032,
                            ['color', 'onClick'],
                          ),
                        ])
                      ),
                    ),
                    128,
                  )),
                ]),
              ]),
              t('div', Ne, [
                t('div', Ve, e(n(s)('新闻与观点')), 1),
                t('div', Le, e(n(s)('精选文章、媒体提及和 Faith 采访')), 1),
                t('div', $e, [
                  t(
                    'div',
                    {
                      class: 'btn',
                      onClick: _[2] || (_[2] = (o) => w('news')),
                    },
                    e(n(s)('查看更多')),
                    1,
                  ),
                ]),
              ]),
            ]),
            t('div', Ae, [
              t('div', Re, [
                t(
                  'div',
                  Fe,
                  e(n(s)('与全球交易者一起享受加密货币之旅吧！')),
                  1,
                ),
                t('div', Te, [t('div', Ue, e(n(s)('立即注册')), 1)]),
              ]),
            ]),
          ])
        )
      }
    },
  }),
  We = B(Be, [['__scopeId', 'data-v-1666084d']])
export { We as default }
