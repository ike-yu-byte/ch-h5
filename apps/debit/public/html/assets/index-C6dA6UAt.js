const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      '../js/index/index.DVczMtGp.js',
      '../js/.pnpm/.pnpm.Bclsl_Dx.js',
      '.pnpm-Cq8bnd90.css',
      './index-BLfM8F1H.css',
      '../js/404/404.CxMEt5Cx.js',
    ]),
) => i.map((i) => d[i])
import {
  c as pe,
  d as E,
  W as Y,
  r as _e,
  o as ve,
  a as u,
  b as o,
  e as y,
  f as oe,
  g as c,
  h as fe,
  i as ge,
  j as z,
  k as v,
  z as be,
  l as he,
  E as me,
  m as ye,
  n as ke,
  p as Se,
  t as _,
  _ as A,
  q as Ce,
  s as Pe,
  u as we,
  w as je,
  v as $,
  x as ne,
  y as xe,
  A as Oe,
  B as D,
  F as P,
  C as O,
  D as m,
  G as $e,
  H as le,
  I as C,
  J as Ee,
  K as U,
  L as I,
  P as se,
  M as Ae,
  N as H,
  O as Te,
  Q as Le,
  R as Me,
  S as Ie,
  T as De,
  U as Ue,
  V as Be,
  X as Fe,
  Y as Ne,
  Z as Re,
  $ as Qe,
} from '../js/.pnpm/.pnpm.Bclsl_Dx.js'
function In() {
  import.meta.url, import('_').catch(() => 1), (async function* () {})().next()
}
;(function () {
  const t = document.createElement('link').relList
  if (t && t.supports && t.supports('modulepreload')) return
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) a(n)
  new MutationObserver((n) => {
    for (const s of n)
      if (s.type === 'childList')
        for (const d of s.addedNodes)
          d.tagName === 'LINK' && d.rel === 'modulepreload' && a(d)
  }).observe(document, { childList: !0, subtree: !0 })
  function l(n) {
    const s = {}
    return (
      n.integrity && (s.integrity = n.integrity),
      n.referrerPolicy && (s.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === 'use-credentials'
        ? (s.credentials = 'include')
        : n.crossOrigin === 'anonymous'
          ? (s.credentials = 'omit')
          : (s.credentials = 'same-origin'),
      s
    )
  }
  function a(n) {
    if (n.ep) return
    n.ep = !0
    const s = l(n)
    fetch(n.href, s)
  }
})()
const Ye = 'modulepreload',
  ze = function (e, t) {
    return new URL(e, t).href
  },
  K = {},
  Z = function (t, l, a) {
    let n = Promise.resolve()
    if (l && l.length > 0) {
      const d = document.getElementsByTagName('link'),
        i = document.querySelector('meta[property=csp-nonce]'),
        r =
          (i == null ? void 0 : i.nonce) ||
          (i == null ? void 0 : i.getAttribute('nonce'))
      n = Promise.allSettled(
        l.map((b) => {
          if (((b = ze(b, a)), b in K)) return
          K[b] = !0
          const f = b.endsWith('.css'),
            w = f ? '[rel="stylesheet"]' : ''
          if (a)
            for (let p = d.length - 1; p >= 0; p--) {
              const x = d[p]
              if (x.href === b && (!f || x.rel === 'stylesheet')) return
            }
          else if (
            document.querySelector('link[href="'.concat(b, '"]').concat(w))
          )
            return
          const h = document.createElement('link')
          if (
            ((h.rel = f ? 'stylesheet' : Ye),
            f || (h.as = 'script'),
            (h.crossOrigin = ''),
            (h.href = b),
            r && h.setAttribute('nonce', r),
            document.head.appendChild(h),
            f)
          )
            return new Promise((p, x) => {
              h.addEventListener('load', p),
                h.addEventListener('error', () =>
                  x(new Error('Unable to preload CSS for '.concat(b))),
                )
            })
        }),
      )
    }
    function s(d) {
      const i = new Event('vite:preloadError', { cancelable: !0 })
      if (((i.payload = d), window.dispatchEvent(i), !i.defaultPrevented))
        throw d
    }
    return n.then((d) => {
      for (const i of d || []) i.status === 'rejected' && s(i.reason)
      return t().catch(s)
    })
  },
  He = { lang: 'العربية', title: { lang: 'لغة' } },
  Ve = {},
  Je = Object.assign(Ve, He),
  We = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: Je },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  Xe = { lang: 'Deutsch', title: { lang: 'Sprache' } },
  Ge = {},
  Ke = Object.assign(Ge, Xe),
  Ze = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: Ke },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  qe = { lang: 'English', title: { lang: 'Language' } },
  et = {},
  tt = { ...et, ...qe },
  ot = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: tt },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  nt = { lang: 'Español', title: { lang: 'Idiomas' } },
  lt = {},
  st = Object.assign(lt, nt),
  at = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: st },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  ct = { lang: 'Français', title: { lang: 'Langue' } },
  it = {},
  rt = Object.assign(it, ct),
  ut = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: rt },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  dt = { lang: 'العربية', title: { lang: 'لغة' } },
  pt = {
    '行情': '行情',
    '快捷交易': '快捷交易',
    '交易': '交易',
    '现货交易': '现货交易',
    '使用完整交易功能，买卖数字货币': '使用完整交易功能，买卖数字货币',
    '闪兑交易': '闪兑交易',
    '现货兑换，一键完成交易': '现货兑换，一键完成交易',
    '盘前现货交易': '盘前现货交易',
    'Debit卡': 'Debit卡',
    '首页': '首页',
    '登录': '登录',
    '注册': '注册',
    '暂无数据': '暂无数据',
    '语言': '语言',
  },
  _t = Object.assign(pt, dt),
  vt = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: _t },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  ft = { lang: 'العربية', title: { lang: 'لغة' } },
  gt = {
    '行情': '行情',
    '快捷交易': '快捷交易',
    '交易': '交易',
    '现货交易': '现货交易',
    '使用完整交易功能，买卖数字货币': '使用完整交易功能，买卖数字货币',
    '闪兑交易': '闪兑交易',
    '现货兑换，一键完成交易': '现货兑换，一键完成交易',
    '盘前现货交易': '盘前现货交易',
    'Debit卡': 'Debit卡',
    '首页': '首页',
    '登录': '登录',
    '注册': '注册',
    '暂无数据': '暂无数据',
    '语言': '语言',
  },
  bt = Object.assign(gt, ft),
  ht = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: bt },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  mt = { lang: '日本語', title: { lang: '言語' } },
  yt = {},
  kt = Object.assign(yt, mt),
  St = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: kt },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  Ct = { lang: '한국어', title: { lang: '언어' } },
  Pt = {},
  wt = Object.assign(Pt, Ct),
  jt = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: wt },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  xt = { lang: 'Português', title: { lang: 'língua' } },
  Ot = {},
  $t = Object.assign(Ot, xt),
  Et = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: $t },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  At = { lang: 'Русский', title: { lang: 'Язык' } },
  Tt = {},
  Lt = Object.assign(Tt, At),
  Mt = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: Lt },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  It = { lang: 'ภาษาไทย', title: { lang: 'ภาษา' } },
  Dt = {},
  Ut = Object.assign(Dt, It),
  Bt = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: Ut },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  Ft = { lang: 'Türkçe', title: { lang: 'dil' } },
  Nt = {},
  Rt = Object.assign(Nt, Ft),
  Qt = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: Rt },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  Yt = { lang: 'Türkçe', title: { lang: 'dil' } },
  zt = {},
  Ht = Object.assign(zt, Yt),
  Vt = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: Ht },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  Jt = { lang: '简体中文', title: { lang: '语言' } },
  Wt = {
    '行情': '行情',
    '快捷交易': '快捷交易',
    '交易': '交易',
    '现货交易': '现货交易',
    '使用完整交易功能，买卖数字货币': '使用完整交易功能，买卖数字货币',
    '闪兑交易': '闪兑交易',
    '现货兑换，一键完成交易': '现货兑换，一键完成交易',
    '盘前现货交易': '盘前现货交易',
    'Debit卡': 'Debit卡',
  },
  Xt = { ...Wt, ...Jt },
  Gt = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: Xt },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  Kt = { lang: '繁體中文', title: { lang: '語言' }, 暂无数据: '暂无数据' },
  Zt = {
    '行情': '行情',
    '快捷交易': '快捷交易',
    '交易': '交易',
    '现货交易': '现货交易',
    '使用完整交易功能，买卖数字货币': '使用完整交易功能，买卖数字货币',
    '闪兑交易': '闪兑交易',
    '现货兑换，一键完成交易': '现货兑换，一键完成交易',
    '盘前现货交易': '盘前现货交易',
    'Debit卡': 'Debit卡',
    '首页': '首页',
    '登录': '登录',
    '注册': '注册',
    '暂无数据': '暂无数据',
    '语言': '语言',
    '快捷买币': '快捷买币',
    '折算货币': '折算货币',
    '在Debit上交易加密货币、外汇及更多标的':
      '在Debit上交易加密货币、外汇及更多标的',
    '100多万平台注册用户，1000多种资产类别，加入我们，一键跟随交易高手投资交易':
      '100多万平台注册用户，1000多种资产类别，加入我们，一键跟随交易高手投资交易',
    '成交量': '成交量',
    '用户': '用户',
    '支持的交易对': '支持的交易对',
    '邮件/电话': '邮件/电话',
    '立即注册': '立即注册',
    '市场趋势': '市场趋势',
    '关于': '关于',
    '公告中心': '公告中心',
    '邀请好友': '邀请好友',
    '服务': '服务',
    '费率': '费率',
    '其他': '其他',
    '帮助中心': '帮助中心',
    '数字资产介绍': '数字资产介绍',
    '联系我们': '联系我们',
    '商务合作': '商务合作',
    '免责声明': '免责声明',
    '比特币和数字资产的价格每天都在波动，数字资产交易可能被视为一种高风险活动。':
      '比特币和数字资产的价格每天都在波动，数字资产交易可能被视为一种高风险活动。',
    '交易者在评估与这些活动相关的风险时，应恪尽职守，保持良好的判断力。':
      '交易者在评估与这些活动相关的风险时，应恪尽职守，保持良好的判断力。',
    '本公司并不寻求将数字资产作为投资替代品，也不以此进行招揽。':
      '本公司并不寻求将数字资产作为投资替代品，也不以此进行招揽。',
    '交易数字资产的决定完全取决于客户自己的独立判断。':
      '交易数字资产的决定完全取决于客户自己的独立判断。',
    '立即交易': '立即交易',
    '现货': '现货',
    '币种': '币种',
    '价格': '价格',
    '涨跌幅': '涨跌幅',
    '趋势图': '趋势图',
    '操作': '操作',
    '查看更多': '查看更多',
    '在这里读懂区块链': '在这里读懂区块链',
    '圈内人的精神加油站，让加密投资之旅更精彩':
      '圈内人的精神加油站，让加密投资之旅更精彩',
    '观点': '观点',
    '顶级投资人观点': '顶级投资人观点',
    '聚合多家财经及科技媒体，提供全面且专业的资讯报道':
      '聚合多家财经及科技媒体，提供全面且专业的资讯报道',
    '行业前沿信息推送, 7*24小时要闻实时更新':
      '行业前沿信息推送, 7*24小时要闻实时更新',
    '快讯': '快讯',
    '文章': '文章',
    '让加密交易，更容易': '让加密交易，更容易',
    '仅需3步，即可开始': '仅需3步，即可开始',
    '第三步：开始交易': '第三步：开始交易',
    '第二步：购买加密货币': '第二步：购买加密货币',
    '第一步：创建账户': '第一步：创建账户',
    '使用高达500倍杠杆交易加密货币衍生品。':
      '使用高达500倍杠杆交易加密货币衍生品。',
    '通过一键购币或P2P快捷购买加密货币': '通过一键购币或P2P快捷购买加密货币',
    '一键创建您的Faith账户': '一键创建您的Faith账户',
    '新闻与观点': '新闻与观点',
    '精选文章、媒体提及和 Faith 采访': '精选文章、媒体提及和 Faith 采访',
    '与全球交易者一起享受加密货币之旅吧！':
      '与全球交易者一起享受加密货币之旅吧！',
    '购买': '购买',
  },
  qt = Object.assign(Zt, Kt),
  eo = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: qt },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  q = Object.assign({
    './locales/ar.ts': We,
    './locales/de.ts': Ze,
    './locales/en.ts': ot,
    './locales/es.ts': at,
    './locales/fr.ts': ut,
    './locales/id.ts': vt,
    './locales/it.ts': ht,
    './locales/ja.ts': St,
    './locales/ko.ts': jt,
    './locales/pt.ts': Et,
    './locales/ru.ts': Mt,
    './locales/th.ts': Bt,
    './locales/tr.ts': Qt,
    './locales/vi.ts': Vt,
    './locales/zh.ts': Gt,
    './locales/zhHK.ts': eo,
  }),
  B = {}
for (const e in q) {
  const t = e.split('/').pop().replace('.ts', '')
  B[t] = Object.assign({}, B[t], q['./locales/'.concat(t, '.ts')].default)
}
console.log('messages', B)
const V = pe({
    locale: localStorage.getItem('lang') || 'zhHK',
    legacy: !1,
    messages: B,
  }),
  ae = V.global,
  to = ae.t,
  S = ae.t,
  M = [
    {
      name: 'home',
      url: 'http://192.168.0.101:5001/index',
      activeRule: '/home',
    },
    {
      name: 'feedback',
      url: 'http://192.168.0.101:5001/feedback',
      activeRule: '/feedback',
    },
  ],
  Q = [
    { label: 'English', value: 'en' },
    { label: '日本語', value: 'ja' },
    { label: '中文繁體', value: 'zhHK' },
    { label: '한국어', value: 'ko' },
    { label: 'ภาษาไทย', value: 'th' },
    { label: 'Español', value: 'es' },
    { label: 'Spanyol', value: 'id' },
    { label: 'Tiếng Việt', value: 'vi' },
    { label: 'Italiano', value: 'it' },
    { label: 'Русский язык', value: 'ru' },
    { label: 'Deutsch', value: 'de' },
  ],
  oo = E({
    __name: 'index',
    setup(e) {
      const { bus: t } = Y,
        l = (d) => {
          console.log('主应用收到arg', d)
        }
      t.$on('email', l)
      const a = () => {
          t.$emit('msg', 'from parent'),
            console.log(
              '子应用上的window内容',
              document.querySelector(
                'iframe[name='.concat(s.currentChild.name, ']'),
              ).contentWindow,
            )
        },
        n = () => {
          s.index < M.length - 1 ? s.index++ : (s.index = 0),
            (s.currentChild = M[s.index])
        },
        s = _e({ currentChild: {}, index: 0 })
      return (
        (s.currentChild = M[M.length - 1]),
        (s.index = M.length - 1),
        ve(() => {
          t.$off('message', l)
        }),
        (d, i) => {
          const r = oe('WujieVue')
          return (
            c(),
            u('div', null, [
              o('div', { onClick: a }, '按钮'),
              o('div', { onClick: n }, '切换'),
              y(
                r,
                {
                  width: '100%',
                  height: '100%',
                  name: s.currentChild.name,
                  url: s.currentChild.url,
                  sync: !1,
                  degrade: !1,
                  attrs: { src: 'http://192.168.0.101:5000/' },
                  props: { data: 'ike', methods: 'bangbangda' },
                },
                null,
                8,
                ['name', 'url'],
              ),
            ])
          )
        }
      )
    },
  }),
  no = V.global,
  lo = no.t,
  so = [
    { path: '/', redirect: '/index' },
    { path: '/subapp', name: 'SubApp', component: oo },
    {
      path: '/index',
      name: 'index',
      component: () =>
        Z(
          () => import('../js/index/index.DVczMtGp.js'),
          __vite__mapDeps([0, 1, 2, 3]),
          import.meta.url,
        ),
      meta: { title: lo('首页') },
    },
    {
      path: '/404',
      name: '404',
      component: () =>
        Z(
          () => import('../js/404/404.CxMEt5Cx.js'),
          __vite__mapDeps([4, 1, 2]),
          import.meta.url,
        ),
      meta: { title: '404' },
    },
    { path: '/:pathMach(.*)', redirect: '/404' },
  ],
  J = fe({ history: ge(), routes: so })
J.beforeEach((e, t, l) => {
  l()
})
J.afterEach((e) => {
  document.title = e.meta.title || ''
})
const F = J
z(
  'memberStore',
  () => {
    const e = v()
    return {
      profile: e,
      setProfile: (n) => {
        e.value = n
      },
      clearProfile: () => {
        e.value = {}
      },
      handleLoginFail: () => {
        F.push({ name: 'login' })
      },
    }
  },
  {
    persist: { key: 'memberStore', storage: localStorage, paths: ['profile'] },
  },
)
const ee = { ...he, ...be },
  ao = { ...ye, ...me },
  co = z(
    'localeStore',
    () => {
      const e = v(ee)
      return {
        elLocale: e,
        setLocale: (l) => {
          e.value = l.includes('zh') ? ee : ao
        },
      }
    },
    {
      persist: {
        key: 'localeStore',
        storage: localStorage,
        paths: ['elLocale'],
      },
    },
  ),
  W = z(
    'deviceStore',
    () => {
      const e = v(!0)
      return {
        isPC: e,
        setIsPC: (l) => {
          e.value = l
        },
      }
    },
    { persist: { key: 'deviceStore', storage: localStorage, paths: ['isPC'] } },
  ),
  ce = ke()
ce.use(Se)
const X =
    'data:image/png;base64,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',
  io = '' + new URL('../img/msg.png', import.meta.url).href,
  ro = '' + new URL('nodata-lUghgP_z.png', import.meta.url).href,
  uo = { class: 'empty-box' },
  po = ['src'],
  _o = { class: 'text' },
  vo = E({
    __name: 'index',
    props: {
      pic: { type: String, default: ro },
      text: { type: String, default: to('暂无数据') },
    },
    setup(e) {
      const t = e
      return (l, a) => (
        c(),
        u('div', uo, [
          o('img', { src: t.pic, class: 'pic' }, null, 8, po),
          o('span', _o, _(t.text), 1),
        ])
      )
    },
  }),
  fo = A(vo, [['__scopeId', 'data-v-0a50cc4c']]),
  go = E({
    __name: 'index',
    props: {
      enableTooltip: { type: Boolean, default: !0 },
      delay: { type: Number, default: 200 },
    },
    setup(e) {
      const t = e,
        l = v(),
        a = v(!1),
        n = v(!1),
        s = v(''),
        d = v({ left: '0px', top: '0px' })
      let i = null
      const r = () => {
          if (!l.value) return
          const p = l.value.querySelector('.ellipsis-content')
          p && (n.value = p.scrollWidth > p.clientWidth)
        },
        b = () => {
          var x, j
          const p =
            (x = l.value) == null
              ? void 0
              : x.querySelector('.ellipsis-content')
          return (
            ((j = p == null ? void 0 : p.textContent) == null
              ? void 0
              : j.trim()) || ''
          )
        },
        f = (p) => {
          t.enableTooltip &&
            (i = setTimeout(() => {
              r(), n.value && ((s.value = b()), k(p), (a.value = !0))
            }, t.delay))
        },
        w = () => {
          clearTimeout(i), (a.value = !1)
        },
        k = (p) => {
          d.value = {
            left: ''.concat(p.pageX + 10, 'px'),
            top: ''.concat(p.pageY + 10, 'px'),
          }
        },
        h = new MutationObserver(() => {
          r()
        })
      return (
        Ce(() => {
          Pe(() => {
            r(),
              l.value &&
                h.observe(l.value, {
                  childList: !0,
                  subtree: !0,
                  characterData: !0,
                })
          })
        }),
        we(() => {
          h.disconnect()
        }),
        window.addEventListener('resize', r),
        (p, x) => (
          c(),
          u(
            'div',
            { class: 'ellipsis-container', ref_key: 'containerRef', ref: l },
            [
              o(
                'div',
                {
                  class: $(['ellipsis-content', { 'text-ellipsis': n.value }]),
                  onMouseenter: f,
                  onMouseleave: w,
                },
                [ne(p.$slots, 'default', {}, void 0, !0)],
                34,
              ),
              je(
                o(
                  'div',
                  { class: 'custom-tooltip', style: Oe(d.value) },
                  _(s.value),
                  5,
                ),
                [[xe, a.value]],
              ),
            ],
            512,
          )
        )
      )
    },
  }),
  bo = A(go, [['__scopeId', 'data-v-9ea6e2e1']]),
  ho = { class: 'notice-box' },
  mo = { class: 'right' },
  yo = { class: 'title one-line' },
  ko = { class: 'time' },
  So = E({
    __name: 'index',
    setup(e) {
      const t = []
      for (let a = 0; a < 10; a++)
        t.push({
          pic: '',
          title: '您昨日的收益已经超过多少元，您昨日的收益已经超过多少元，',
          time: '2025-02-20 12:30:21',
        })
      const l = v([])
      return (
        (l.value = t),
        (a, n) => (
          c(),
          u('div', ho, [
            l.value.length
              ? (c(!0),
                u(
                  P,
                  { key: 0 },
                  O(
                    l.value,
                    (s) => (
                      c(),
                      u('div', { class: 'notice-item', key: s.title }, [
                        n[0] ||
                          (n[0] = o(
                            'div',
                            { class: 'left' },
                            [o('img', { src: io, class: 'pic' })],
                            -1,
                          )),
                        o('div', mo, [
                          y(
                            bo,
                            null,
                            {
                              default: m(() => [o('span', yo, _(s.title), 1)]),
                              _: 2,
                            },
                            1024,
                          ),
                          o('div', ko, _(s.time), 1),
                        ]),
                      ])
                    ),
                  ),
                  128,
                ))
              : (c(), D(fo, { key: 1 })),
          ])
        )
      )
    },
  }),
  Co = A(So, [['__scopeId', 'data-v-9d7fa855']])
function ie(e, t = new WeakMap()) {
  if (typeof e != 'object' || e === null) return e
  if (e instanceof Date) return new Date(e)
  if (e instanceof RegExp) return new RegExp(e)
  if (t.get(e)) return t.get(e)
  let l = new e.constructor()
  t.set(e, l)
  for (let a in e) e.hasOwnProperty(a) && (l[a] = ie(e[a], t))
  return l
}
const re = (e, t = 'YYYY-MM-DD hh:mm:ss A') => $e(e).format(t),
  Po = [
    {
      Id: 'M716wsg8Q0eMmw-ksWkyjA',
      Code: 'USD',
      Rate: 1,
      Sign: '$',
      Precision: 2,
    },
    {
      Id: 'IRRrehXkSGhrclmeFkdA',
      Code: 'IRR',
      Rate: 0,
      Sign: ' تومان',
      Precision: 2,
    },
  ]
function ue() {
  const e = v([]),
    t = v('')
  return {
    coinList: e,
    getCoinData: () => {
      e.value = Po.map((a) => ({ label: a.Code, value: a.Code }))
    },
    currentCoin: t,
  }
}
const wo = { class: 'lang-box' },
  jo = { class: 'left panel' },
  xo = { class: 'lang-item' },
  Oo = { class: 'right panel' },
  $o = { class: 'lang-item' },
  Eo = E({
    __name: 'index',
    setup(e) {
      const { locale: t } = le(),
        l = v(ie(Q)),
        { coinList: a, getCoinData: n, currentCoin: s } = ue()
      return (
        n(),
        (d, i) => (
          c(),
          u('div', wo, [
            o('div', jo, [
              o('div', xo, _(d.$t('语言')), 1),
              (c(!0),
              u(
                P,
                null,
                O(
                  l.value,
                  (r) => (
                    c(),
                    u(
                      'div',
                      {
                        class: $(
                          'lang-item '.concat(C(t) === r.value ? 'active' : ''),
                        ),
                        key: r.value,
                      },
                      _(r.label),
                      3,
                    )
                  ),
                ),
                128,
              )),
            ]),
            o('div', Oo, [
              o('div', $o, _(d.$t('折算货币')), 1),
              (c(!0),
              u(
                P,
                null,
                O(
                  C(a),
                  (r) => (
                    c(),
                    u(
                      'div',
                      {
                        class: $(
                          'lang-item '.concat(C(s) === r.value ? 'active' : ''),
                        ),
                        key: r.value,
                      },
                      _(r.label),
                      3,
                    )
                  ),
                ),
                128,
              )),
            ]),
          ])
        )
      )
    },
  }),
  Ao = A(Eo, [['__scopeId', 'data-v-217b34ed']]),
  To = { class: 'sidebar-box' },
  Lo = { class: 'btn' },
  Mo = { class: 'btn register-btn' },
  Io = ['onClick'],
  Do = { class: 'left' },
  Uo = { class: 'text' },
  Bo = { class: 'lang-box' },
  Fo = { class: 'header-box' },
  No = { class: 'left' },
  Ro = ['onClick'],
  Qo = ['onClick'],
  Yo = { class: 'left' },
  zo = ['onClick'],
  Ho = { class: 'left' },
  Vo = E({
    name: 'Sidebar',
    __name: 'index',
    emits: ['close'],
    setup(e, { emit: t }) {
      var x
      const l = t,
        { locale: a } = le(),
        { coinList: n, getCoinData: s, currentCoin: d } = ue()
      s()
      const i = v(!1),
        r = v(1),
        b = v([
          { label: '语言', value: 1 },
          { label: '折算货币', value: 2 },
        ]),
        f = v([
          { label: '行情', value: '' },
          { label: '快捷买币', value: '' },
          { label: '交易', value: '' },
          { label: '盘前现货交易', value: '' },
          { label: 'Debit卡', value: '' },
          {
            label:
              (x = Q.find((j) => j.value === a.value)) == null
                ? void 0
                : x.label,
            value: 'lang',
            icon: 'icon-lang',
          },
        ]),
        w = (j) => {
          j.value === 'lang' ? (i.value = !0) : (h(), F.push({ name: j.value }))
        },
        k = (j) => {
          d.value = j.value
        },
        h = () => {
          l('close')
        },
        p = () => {
          ;(i.value = !1), h()
        }
      return (j, L) => {
        const G = Ee,
          de = se
        return (
          c(),
          u('div', To, [
            o('div', { class: 'header' }, [
              L[1] || (L[1] = o('img', { src: X, class: 'logo' }, null, -1)),
              o('span', { class: 'close iconfont icon-cha', onClick: h }),
            ]),
            o('div', Lo, [
              y(
                G,
                { class: 'mobile-btn', color: 'transparent' },
                { default: m(() => [U(_(j.$t('登录')), 1)]), _: 1 },
              ),
            ]),
            o('div', Mo, [
              y(
                G,
                { class: 'mobile-btn', color: '#FFFFFF' },
                { default: m(() => [U(_(j.$t('注册')), 1)]), _: 1 },
              ),
            ]),
            (c(!0),
            u(
              P,
              null,
              O(
                f.value,
                (g) => (
                  c(),
                  u(
                    'div',
                    { class: 'menu-item', key: g.label, onClick: (N) => w(g) },
                    [
                      o('div', Do, [
                        g.icon
                          ? (c(),
                            u(
                              'span',
                              {
                                key: 0,
                                class: $('icon iconfont '.concat(g.icon || '')),
                              },
                              null,
                              2,
                            ))
                          : I('', !0),
                        o('span', Uo, _(j.$t(''.concat(g.label))), 1),
                      ]),
                      L[2] ||
                        (L[2] = o(
                          'span',
                          { class: 'right iconfont icon-you' },
                          null,
                          -1,
                        )),
                    ],
                    8,
                    Io,
                  )
                ),
              ),
              128,
            )),
            y(
              de,
              {
                'show': i.value,
                'onUpdate:show': L[0] || (L[0] = (g) => (i.value = g)),
                'position': 'right',
              },
              {
                default: m(() => [
                  o('div', Bo, [
                    o('div', Fo, [
                      o('div', No, [
                        (c(!0),
                        u(
                          P,
                          null,
                          O(
                            b.value,
                            (g) => (
                              c(),
                              u(
                                'span',
                                {
                                  class: $(
                                    'cate '.concat(
                                      g.value === r.value ? 'active' : '',
                                    ),
                                  ),
                                  key: g.label,
                                  onClick: (N) => (r.value = g.value),
                                },
                                _(j.$t(''.concat(g.label))),
                                11,
                                Ro,
                              )
                            ),
                          ),
                          128,
                        )),
                      ]),
                      o('span', {
                        class: 'right iconfont icon-cha',
                        onClick: Ae(p, ['stop']),
                      }),
                    ]),
                    r.value === 1
                      ? (c(!0),
                        u(
                          P,
                          { key: 0 },
                          O(
                            C(Q),
                            (g) => (
                              c(),
                              u(
                                'div',
                                {
                                  class: $('menu-item'),
                                  key: g.label,
                                  onClick: (N) => w(g),
                                },
                                [
                                  o('div', Yo, [
                                    o(
                                      'span',
                                      {
                                        class: $(
                                          'text '.concat(
                                            C(a) === g.value ? 'active' : '',
                                          ),
                                        ),
                                      },
                                      _(g.label),
                                      3,
                                    ),
                                  ]),
                                ],
                                8,
                                Qo,
                              )
                            ),
                          ),
                          128,
                        ))
                      : I('', !0),
                    r.value === 2
                      ? (c(!0),
                        u(
                          P,
                          { key: 1 },
                          O(
                            C(n),
                            (g) => (
                              c(),
                              u(
                                'div',
                                {
                                  class: $('menu-item'),
                                  key: g.label,
                                  onClick: (N) => k(g),
                                },
                                [
                                  o('div', Ho, [
                                    o(
                                      'span',
                                      {
                                        class: $(
                                          'text '.concat(
                                            C(d) === g.value ? 'active' : '',
                                          ),
                                        ),
                                      },
                                      _(g.label),
                                      3,
                                    ),
                                  ]),
                                ],
                                8,
                                zo,
                              )
                            ),
                          ),
                          128,
                        ))
                      : I('', !0),
                  ]),
                ]),
                _: 1,
              },
              8,
              ['show'],
            ),
          ])
        )
      }
    },
  }),
  Jo = A(Vo, [['__scopeId', 'data-v-e0e1b94f']]),
  Wo = { class: $('header-box') },
  Xo = { class: 'left-box' },
  Go = { key: 0, class: 'nav-list' },
  Ko = ['onClick'],
  Zo = { class: 'label' },
  qo = { class: 'pop-content' },
  en = ['onClick'],
  tn = { class: 'line first' },
  on = { class: 'label' },
  nn = { class: 'line' },
  ln = { class: 'label' },
  sn = { class: 'nav-item' },
  an = { class: 'label' },
  cn = { class: 'right-box' },
  rn = { class: 'notice-content' },
  un = { class: 'lang-content' },
  dn = E({
    name: 'TopHeader',
    __name: 'index',
    setup(e) {
      const { isPC: t } = H(W()),
        l = v(!1),
        a = v([
          { label: '行情', value: '' },
          { label: '快捷交易', value: '' },
          {
            label: '交易',
            value: '',
            children: [
              {
                label: '现货交易',
                icon: 'icon-trade',
                text: '使用完整交易功能，买卖数字货币',
                value: '',
              },
              {
                label: '闪兑交易',
                icon: 'icon-flash',
                text: '现货兑换，一键完成交易',
                value: '',
              },
            ],
          },
          { label: '盘前现货交易', value: '' },
          { label: 'Debit卡', value: '' },
        ]),
        n = (i) => {
          F.push({ name: i.value })
        },
        s = () => {
          console.log('点击菜单'), (l.value = !0)
        },
        d = () => {
          l.value = !1
        }
      return (i, r) => {
        const b = Te,
          f = Le,
          w = se
        return (
          c(),
          u('div', Wo, [
            o('div', Xo, [
              r[6] || (r[6] = o('img', { src: X, class: 'logo' }, null, -1)),
              C(t)
                ? (c(),
                  u('div', Go, [
                    (c(!0),
                    u(
                      P,
                      null,
                      O(a.value, (k) => {
                        var h
                        return (
                          c(),
                          u(
                            P,
                            { key: k.value },
                            [
                              (h = k.children) != null && h.length
                                ? (c(),
                                  D(
                                    b,
                                    {
                                      key: 1,
                                      placement: 'top-start',
                                      title: '',
                                      width: 'auto',
                                      trigger: 'hover',
                                    },
                                    {
                                      reference: m(() => [
                                        o('div', sn, [
                                          o(
                                            'span',
                                            an,
                                            _(i.$t(''.concat(k.label))),
                                            1,
                                          ),
                                          r[5] ||
                                            (r[5] = o(
                                              'span',
                                              {
                                                class: 'icon iconfont icon-xia',
                                              },
                                              null,
                                              -1,
                                            )),
                                        ]),
                                      ]),
                                      default: m(() => [
                                        o('div', qo, [
                                          (c(!0),
                                          u(
                                            P,
                                            null,
                                            O(
                                              k.children,
                                              (p) => (
                                                c(),
                                                u(
                                                  'div',
                                                  {
                                                    class: 'content-item',
                                                    onClick: (x) => n(k),
                                                    key: p.value,
                                                  },
                                                  [
                                                    o('div', tn, [
                                                      o(
                                                        'span',
                                                        {
                                                          class: $(
                                                            'pic iconfont '.concat(
                                                              p.icon,
                                                            ),
                                                          ),
                                                        },
                                                        null,
                                                        2,
                                                      ),
                                                      o(
                                                        'span',
                                                        on,
                                                        _(
                                                          i.$t(
                                                            ''.concat(p.label),
                                                          ),
                                                        ),
                                                        1,
                                                      ),
                                                      r[3] ||
                                                        (r[3] = o(
                                                          'span',
                                                          {
                                                            class:
                                                              'icon iconfont icon-you',
                                                          },
                                                          null,
                                                          -1,
                                                        )),
                                                    ]),
                                                    o('div', nn, [
                                                      r[4] ||
                                                        (r[4] = o(
                                                          'span',
                                                          { class: 'pic' },
                                                          null,
                                                          -1,
                                                        )),
                                                      o(
                                                        'span',
                                                        ln,
                                                        _(
                                                          i.$t(
                                                            ''.concat(p.text),
                                                          ),
                                                        ),
                                                        1,
                                                      ),
                                                    ]),
                                                  ],
                                                  8,
                                                  en,
                                                )
                                              ),
                                            ),
                                            128,
                                          )),
                                        ]),
                                      ]),
                                      _: 2,
                                    },
                                    1024,
                                  ))
                                : (c(),
                                  u(
                                    'div',
                                    {
                                      key: 0,
                                      class: 'nav-item',
                                      onClick: (p) => n(k),
                                    },
                                    [
                                      o(
                                        'span',
                                        Zo,
                                        _(i.$t(''.concat(k.label))),
                                        1,
                                      ),
                                    ],
                                    8,
                                    Ko,
                                  )),
                            ],
                            64,
                          )
                        )
                      }),
                      128,
                    )),
                  ]))
                : I('', !0),
            ]),
            o('div', cn, [
              C(t)
                ? (c(),
                  u(
                    P,
                    { key: 0 },
                    [
                      y(
                        f,
                        {
                          color: '#FFFFFF',
                          onClick:
                            r[0] || (r[0] = (k) => n({ value: 'login' })),
                        },
                        { default: m(() => [U(_(i.$t('登录')), 1)]), _: 1 },
                      ),
                      y(
                        f,
                        {
                          color: '#2F3031',
                          onClick:
                            r[1] || (r[1] = (k) => n({ value: 'register' })),
                        },
                        { default: m(() => [U(_(i.$t('注册')), 1)]), _: 1 },
                      ),
                      y(
                        b,
                        {
                          placement: 'top-start',
                          title: '',
                          width: 'auto',
                          trigger: 'hover',
                        },
                        {
                          reference: m(
                            () =>
                              r[7] ||
                              (r[7] = [
                                o(
                                  'span',
                                  { class: 'btn iconfont icon-icon_top_post' },
                                  null,
                                  -1,
                                ),
                              ]),
                          ),
                          default: m(() => [o('div', rn, [y(Co)])]),
                          _: 1,
                        },
                      ),
                      y(
                        b,
                        {
                          placement: 'top-start',
                          title: '',
                          width: 'auto',
                          trigger: 'hover',
                        },
                        {
                          reference: m(
                            () =>
                              r[8] ||
                              (r[8] = [
                                o(
                                  'span',
                                  {
                                    class: 'btn iconfont icon-icon_top_globle',
                                  },
                                  null,
                                  -1,
                                ),
                              ]),
                          ),
                          default: m(() => [o('div', un, [y(Ao)])]),
                          _: 1,
                        },
                      ),
                    ],
                    64,
                  ))
                : (c(),
                  u(
                    P,
                    { key: 1 },
                    [
                      o('span', {
                        class: 'menu iconfont icon-yidongduan_caidan',
                        onClick: s,
                      }),
                      y(
                        w,
                        {
                          'show': l.value,
                          'onUpdate:show':
                            r[2] || (r[2] = (k) => (l.value = k)),
                          'position': 'right',
                        },
                        { default: m(() => [y(Jo, { onClose: d })]), _: 1 },
                        8,
                        ['show'],
                      ),
                    ],
                    64,
                  )),
            ]),
          ])
        )
      }
    },
  }),
  pn = A(dn, [['__scopeId', 'data-v-eceaa39a']]),
  _n = { class: 'footer-box' },
  vn = { class: 'container' },
  fn = { class: 'footer-top' },
  gn = { class: 'cate' },
  bn = { class: 'describe' },
  hn = { class: 'title' },
  mn = { class: 'content' },
  yn = E({
    __name: 'index',
    setup(e) {
      const { isPC: t } = H(W()),
        l = v([]),
        a = v({
          businessEmail: 'business@debit.com',
          supportEmail: 'support@debit.com',
        }),
        n = v([
          {
            label: S('关于'),
            value: 'about',
            children: [
              { label: S('公告中心'), value: '' },
              { label: S('邀请好友'), value: '' },
            ],
          },
          {
            label: S('服务'),
            value: 'service',
            children: [{ label: S('费率'), value: '' }],
          },
          {
            label: S('其他'),
            value: 'other',
            children: [
              { label: S('帮助中心'), value: '' },
              { label: S('数字资产介绍'), value: '' },
            ],
          },
          {
            label: S('联系我们'),
            value: 'contact',
            children: [
              {
                label: S('商务合作') + ': ' + a.value.businessEmail,
                value: 'mailto:' + a.value.businessEmail,
              },
              {
                label: S('联系我们') + ': ' + a.value.supportEmail,
                value: 'mailto:' + a.value.supportEmail,
              },
            ],
          },
        ]),
        s = (d) => {
          d.value.includes('mailto') && (location.href = d.value)
        }
      return (d, i) => {
        const r = Ie,
          b = Me
        return (
          c(),
          u('div', _n, [
            o('div', vn, [
              i[1] ||
                (i[1] = o(
                  'div',
                  { class: 'icons' },
                  [o('img', { class: 'logo', src: X })],
                  -1,
                )),
              o('div', fn, [
                C(t)
                  ? (c(!0),
                    u(
                      P,
                      { key: 0 },
                      O(
                        n.value,
                        (f) => (
                          c(),
                          u('div', { class: 'item', key: f.value }, [
                            o('div', gn, _(f.label), 1),
                            (c(!0),
                            u(
                              P,
                              null,
                              O(
                                f.children,
                                (w) => (
                                  c(),
                                  u(
                                    'div',
                                    { class: 'menu', key: w.value, onClick: s },
                                    _(w.label),
                                    1,
                                  )
                                ),
                              ),
                              128,
                            )),
                          ])
                        ),
                      ),
                      128,
                    ))
                  : (c(),
                    D(
                      b,
                      {
                        'key': 1,
                        'style': { width: '100%' },
                        'modelValue': l.value,
                        'onUpdate:modelValue':
                          i[0] || (i[0] = (f) => (l.value = f)),
                      },
                      {
                        default: m(() => [
                          (c(!0),
                          u(
                            P,
                            null,
                            O(
                              n.value,
                              (f) => (
                                c(),
                                D(
                                  r,
                                  {
                                    title: f.label,
                                    name: f.label,
                                    key: f.value,
                                  },
                                  {
                                    default: m(() => [
                                      (c(!0),
                                      u(
                                        P,
                                        null,
                                        O(
                                          f.children,
                                          (w) => (
                                            c(),
                                            u(
                                              'div',
                                              {
                                                class: 'menu',
                                                key: w.value,
                                                onClick: s,
                                              },
                                              _(w.label),
                                              1,
                                            )
                                          ),
                                        ),
                                        128,
                                      )),
                                    ]),
                                    _: 2,
                                  },
                                  1032,
                                  ['title', 'name'],
                                )
                              ),
                            ),
                            128,
                          )),
                        ]),
                        _: 1,
                      },
                      8,
                      ['modelValue'],
                    )),
              ]),
              o('div', bn, [
                o('div', hn, _(C(S)('免责声明')), 1),
                o(
                  'div',
                  mn,
                  _(
                    C(S)(
                      '比特币和数字资产的价格每天都在波动，数字资产交易可能被视为一种高风险活动。',
                    ),
                  ) +
                    ' ' +
                    _(
                      C(S)(
                        '交易者在评估与这些活动相关的风险时，应恪尽职守，保持良好的判断力。',
                      ),
                    ) +
                    ' ' +
                    _(
                      C(S)(
                        '本公司并不寻求将数字资产作为投资替代品，也不以此进行招揽。',
                      ),
                    ) +
                    ' ' +
                    _(C(S)('交易数字资产的决定完全取决于客户自己的独立判断。')),
                  1,
                ),
              ]),
              i[2] ||
                (i[2] = o(
                  'div',
                  { class: 'copy-right' },
                  ' Copyright © 2025 Faith Limited. All rights reserved. ',
                  -1,
                )),
            ]),
          ])
        )
      }
    },
  }),
  kn = A(yn, [['__scopeId', 'data-v-d483537e']]),
  Sn = E({
    name: 'Layout',
    __name: 'index',
    setup(e) {
      const t = v(!1),
        l = v(),
        a = (s) => {
          var i
          ;((i = s.target) == null ? void 0 : i.scrollTop) > 100
            ? (t.value = !0)
            : (t.value = !1)
        },
        n = () => {
          l.value.scrollTo({ top: 0, behavior: 'smooth' })
        }
      return (s, d) => (
        c(),
        u(
          'div',
          { class: 'layout-box', onScroll: a, ref_key: 'layout', ref: l },
          [
            y(pn, {
              style: {
                'position': 'fixed',
                'left': '0',
                'right': '0',
                'top': '0',
                'z-index': '2',
              },
            }),
            ne(s.$slots, 'default', {}, void 0, !0),
            y(kn),
            t.value
              ? (c(),
                u('div', {
                  key: 0,
                  class: 'back-box iconfont icon-backtop',
                  onClick: n,
                }))
              : I('', !0),
          ],
          544,
        )
      )
    },
  }),
  Cn = A(Sn, [['__scopeId', 'data-v-8d002a08']]),
  Pn = E({
    __name: 'App',
    setup(e) {
      const { elLocale: t } = H(co()),
        l = v('light')
      return (a, n) => {
        const s = oe('router-view'),
          d = De,
          i = Ue
        return (
          c(),
          D(
            i,
            { locale: C(t) },
            {
              default: m(() => [
                y(
                  d,
                  { theme: l.value },
                  {
                    default: m(() => [
                      y(Cn, null, { default: m(() => [y(s)]), _: 1 }),
                    ]),
                    _: 1,
                  },
                  8,
                  ['theme'],
                ),
              ]),
              _: 1,
            },
            8,
            ['locale'],
          )
        )
      }
    },
  }),
  wn = A(Pn, [['__scopeId', 'data-v-f5e0c61b']]),
  jn = (e) => {
    var a
    const t = new Date().getTime(),
      l = { method: e.method, params: e.params }
    if (Object.prototype.hasOwnProperty.call(e, 'callback')) {
      const n = ''.concat(e.method, '_').concat(t)
      e.callback.bind(e),
        (window[n] = e.callback),
        (l.callback = 'window.'.concat(n)),
        console.log('window', window[n])
    }
    try {
      ;(a = window == null ? void 0 : window.Report) == null ||
        a.postMessage(JSON.stringify(l))
    } catch (n) {
      console.log('err', n)
    }
  },
  te = 100,
  xn = 1920,
  R = 1200,
  On = 375
;(function () {
  const e = document.documentElement,
    t = 1
  document
    .querySelector('meta[name="viewport"]')
    .setAttribute(
      'content',
      'width=device-width,initial-scale=' +
        t +
        ',maximum-scale=' +
        t +
        ', minimum-scale=' +
        t +
        ',user-scalable=no',
    )
  function a() {
    const n = e.clientWidth
    let s = 100
    n > R ? (s = (n / xn) * te) : (s = (n / On) * te),
      (e.style.fontSize = s + 'px'),
      setTimeout(() => {
        const { setIsPC: d } = W()
        d(n > R), (document.body.className = n > R ? 'pc' : 'mobile')
      }, 100)
  }
  a(),
    window.addEventListener(
      'resize',
      function () {
        a()
      },
      !1,
    )
})()
const $n = ['color'],
  En = ['href'],
  An = E({
    __name: 'index',
    props: { name: { default: '' }, color: { default: '' } },
    setup(e) {
      const t = e
      return (l, a) => (
        c(),
        u(
          'svg',
          { 'aria-hidden': 'true', 'class': 'svg-icon', 'color': t.color },
          [o('use', { href: '#icon-'.concat(t.name) }, null, 8, En)],
          8,
          $n,
        )
      )
    },
  }),
  Tn = A(An, [['__scopeId', 'data-v-ffe5f4d4']])
console.log('version', Be)
const { setupApp: Ln } = Y
M.forEach((e) => {
  Ln({ name: e.name, url: e.url, exec: !0, alive: !0 })
})
function Mn(e) {
  console.log('native回调', e)
}
jn({ method: 'hello', params: { name: 'vite' }, callback: Mn })
const T = Fe(wn)
T.config.globalProperties.$format = re
window.$format = re
T.use(F)
T.use(ce)
T.use(V)
T.use(Ne)
T.use(Re)
T.use(Y)
T.use(Qe)
T.component('SvgIcon', Tn)
T.mount('#app')
export { S as $, In as __vite_legacy_guard, F as r, W as u }
