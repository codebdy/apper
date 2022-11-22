const loacales = {
  'zh-CN': {
    title: '按钮',
    description: "按钮，可绑定事件",
    settings: {
      title: '标题',
      onClick: "鼠标点击",
      type: {
        title: '类型',
        dataSource: ['填充', '透明', '虚线', '链接', '文本', '默认'],
      },
      block: "充满",
      danger: "警醒",
      disabled: "无效",
      ghost: "透明",
      icon: "图标",
      shape: {
        title: '形状',
        dataSource: ['默认', '圆圈', '圆角'],
      },
      size: {
        title: '尺寸',
        dataSource: ['大', '中', '小'],
      }
    },
  },
  'en-US': {
    title: 'Button',
    settings: {
      type: 'Type',
      title: 'Title',
    },
  }
}

export default loacales;
