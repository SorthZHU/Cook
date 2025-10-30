export default defineAppConfig({
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
        iconPath: 'assets/icons/home.svg',
        selectedIconPath: 'assets/icons/home-active.svg'
      },
      {
        pagePath: 'pages/tutorial/index',
        text: '教程',
        iconPath: 'assets/icons/tutorial.svg',
        selectedIconPath: 'assets/icons/tutorial-active.svg'
      },
      {
        pagePath: 'pages/order/index',
        text: '点餐',
        iconPath: 'assets/icons/order.svg',
        selectedIconPath: 'assets/icons/order-active.svg'
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: 'assets/icons/profile.svg',
        selectedIconPath: 'assets/icons/profile-active.svg'
      }
    ]
  }
})
