import type { UserConfigExport } from '@tarojs/cli'

export default {
  logger: {
    quiet: false,
    stats: true
  },
  mini: {},
  h5: {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://47.114.86.249:3000',
          changeOrigin: true,
          // 如果后端不需要移除 /api 前缀，则不做 pathRewrite
          // pathRewrite: { '^/api': '' },
        },
      },
    },
  }
} satisfies UserConfigExport<'webpack5'>
