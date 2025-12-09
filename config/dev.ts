import type { UserConfigExport } from '@tarojs/cli'

export default {
  logger: {
    quiet: false,
    stats: true
  },
  mini: {},
  h5: {
    // 代理后端以避免开发环境跨域；目标地址读取环境变量，避免将IP写死进仓库
    // 可设置 DEV_PROXY_TARGET，例如：http://47.114.86.249:3000
    devServer: {
      proxy: {
        '/api': {
          target: process.env.DEV_PROXY_TARGET || 'http://47.114.86.249:3000',
          changeOrigin: true,
          // 如果后端不需要移除 /api 前缀，则不做 pathRewrite
          // pathRewrite: { '^/api': '' },
        },
      },
    },
  }
} satisfies UserConfigExport<'webpack5'>
