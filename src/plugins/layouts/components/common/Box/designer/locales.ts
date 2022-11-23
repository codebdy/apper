import { styleLocales } from "plugin-sdk/locales/styleLocales";

const locales = {
  'zh-CN': {
    title: '盒子',
    props: {
      cursor: "光标",
      onClick: '鼠标点击',
      'component-group': '组件属性',
      style: styleLocales['zh-CN']
    },
  },
  'en-US': {
    title: 'Box',
    props: {
      cursor: "Cursor",
      onClick: "on Click",
      style: styleLocales['en-US']
    },
  },
}

export const BoxLocales = locales

export default locales;