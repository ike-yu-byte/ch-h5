import i18n from '@/i18n'
const $t = i18n.global.t
export const menu = [
  // 页脚各种菜单
  {
    label: $t('lists.chanpin'),
    value: 'product',
    children: [
      {
        label: $t('subLists.yongjiuheyue'),
        value: '', // 路径
      },
      {
        label: $t('subLists.xianhuo'),
        value: '', // 路径
      },
      {
        label: $t('subLists.yongjiuheyue'),
        value: '', // 路径
      },
    ],
  },
  {
    label: $t('lists.fuwu'),
    children: [
      {
        label: $t('subLists.yaoqinghaoyou'),
        value: '', // 路径
      },
      {
        label: $t('subLists.vip'),
        value: '', // 路径
      },
      {
        label: $t('subLists.jishishuju'),
        value: '', // 路径
      },
      {
        label: $t('subLists.hangqing'),
        value: '', // 路径
      },
    ],
  },
  {
    label: $t('lists.zhinan'),
    children: [
      {
        label: $t('subLists.guanfangbuluo'),
        value: '', // 路径
      },
      {
        label: $t('subLists.bangzhuzhongxin'),
        value: '', // 路径
      },
      {
        label: $t('subLists.zixun'),
        value: '', // 路径
      },
      {
        label: $t('subLists.xueyuan'),
        value: '', // 路径
      },
      {
        label: $t('subLists.nft'),
        value: '', // 路径
      },
    ],
  },
  {
    label: $t('lists.guanyuwomen'),
    children: [
      {
        label: $t('subLists.guanyuwomen'),
        value: '', // 路径
      },
      {
        label: $t('subLists.dongtai'),
        value: '', // 路径
      },
      {
        label: $t('subLists.gonggaozhongxin'),
        value: '', // 路径
      },
      {
        label: $t('subLists.anquan'),
        value: '', // 路径
      },
    ],
  },
  {
    label: $t('lists.xieyishengmin'),
    children: [
      {
        label: $t('subLists.fuwutiaokuan'),
        value: '', // 路径
      },
      {
        label: $t('subLists.yinsixieyi'),
        value: '', // 路径
      },
      {
        label: $t('subLists.fengxiantishi'),
        value: '', // 路径
      },
    ],
  },
  {
    label: $t('lists.kehufuwu'),
    children: [
      {
        label: $t('subLists.xianshangkefu'),
        value: '', // 路径
      },
      {
        label: $t('subLists.youjiangfankui'),
        value: '', // 路径
      },
      {
        label: 'support@btcc.com',
        value: '', // 路径
      },
    ],
  },
]
