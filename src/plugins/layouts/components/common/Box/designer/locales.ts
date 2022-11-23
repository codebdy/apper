import { styleLocales } from "plugin-sdk/locales/styleLocales";

const locales = {
  'zh-CN': {
    title: '盒子',
    props: {
      cursor: "光标",
      onClick: '鼠标点击',
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

export default locales;