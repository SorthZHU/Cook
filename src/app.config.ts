const iconExt = process.env.TARO_ENV === 'weapp' ? 'png' : 'svg'

export default defineAppConfig({
  entryPagePath: 'pages/home/index',
  pages: [
    'pages/home/index',
    'pages/tutorial/index',
    'pages/order/index',
    'pages/profile/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#6c757d',
    selectedColor: '#007bff',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: 'assets/icons/home.' + iconExt,
        selectedIconPath: 'assets/icons/home-active.' + iconExt
      },
      {
        pagePath: 'pages/tutorial/index',
        text: '教程',
        iconPath: 'assets/icons/tutorial.' + iconExt,
        selectedIconPath: 'assets/icons/tutorial-active.' + iconExt
      },
      {
        pagePath: 'pages/order/index',
        text: '点餐',
        iconPath: 'assets/icons/order.' + iconExt,
        selectedIconPath: 'assets/icons/order-active.' + iconExt
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: 'assets/icons/profile.' + iconExt,
        selectedIconPath: 'assets/icons/profile-active.' + iconExt
      }
    ]
  }
})
