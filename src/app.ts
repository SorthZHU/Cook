import { PropsWithChildren } from 'react'
import Taro, { useLaunch } from '@tarojs/taro'

import './app.scss'

if (process.env.NODE_ENV !== 'production' && Taro.getEnv() === Taro.ENV_TYPE.WEB) {
  import('vconsole').then((mod) => {
    const VConsole = (mod as any).default || mod
    new VConsole()
  }).catch(() => { })
}

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return children
}



export default App
