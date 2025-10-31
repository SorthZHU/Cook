import { View, Text, Button } from '@tarojs/components'
import { useState } from 'react'
import { api } from '../../utils/api'
import styles from './index.module.scss'

interface ApiTestProps {
  className?: string
}

interface HealthResponse {
  status: string
  message: string
  timestamp: string
  data?: any
}

export default function ApiTest({ className }: ApiTestProps) {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<HealthResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const testHealthApi = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await api.health()
      console.log('API响应:', response.data)
      setResult(response.data)
    } catch (err: any) {
      console.error('API调用失败:', err)
      setError(err.message || '请求失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className={`${styles.container} ${className || ''}`}>
      <View className={styles.header}>
        <Text className={styles.title}>🔧 API接口测试</Text>
        <Text className={styles.subtitle}>测试服务器连接状态</Text>
      </View>

      <View className={styles.testSection}>
        <Button 
          className={styles.testButton}
          onClick={testHealthApi}
          loading={loading}
          disabled={loading}
        >
          {loading ? '测试中...' : '测试健康检查接口'}
        </Button>
      </View>

      {result && (
        <View className={styles.resultSection}>
          <Text className={styles.resultTitle}>✅ 请求成功</Text>
          <View className={styles.resultContent}>
            <View className={styles.resultItem}>
              <Text className={styles.resultLabel}>状态:</Text>
              <Text className={styles.resultValue}>{result.status}</Text>
            </View>
            <View className={styles.resultItem}>
              <Text className={styles.resultLabel}>消息:</Text>
              <Text className={styles.resultValue}>{result.message}</Text>
            </View>
            <View className={styles.resultItem}>
              <Text className={styles.resultLabel}>时间:</Text>
              <Text className={styles.resultValue}>{result.timestamp}</Text>
            </View>
            {result.data && (
              <View className={styles.resultItem}>
                <Text className={styles.resultLabel}>数据:</Text>
                <Text className={styles.resultValue}>
                  {JSON.stringify(result.data, null, 2)}
                </Text>
              </View>
            )}
          </View>
        </View>
      )}

      {error && (
        <View className={styles.errorSection}>
          <Text className={styles.errorTitle}>❌ 请求失败</Text>
          <Text className={styles.errorMessage}>{error}</Text>
          <Text className={styles.errorHint}>
            请检查网络连接或服务器状态
          </Text>
        </View>
      )}

      <View className={styles.infoSection}>
        <Text className={styles.infoTitle}>📋 接口信息</Text>
        <View className={styles.infoContent}>
          <Text className={styles.infoItem}>
            <Text className={styles.infoLabel}>接口地址:</Text>
            <Text className={styles.infoValue}>http://47.114.86.249:3000/api/health</Text>
          </Text>
          <Text className={styles.infoItem}>
            <Text className={styles.infoLabel}>请求方法:</Text>
            <Text className={styles.infoValue}>GET</Text>
          </Text>
          <Text className={styles.infoItem}>
            <Text className={styles.infoLabel}>超时时间:</Text>
            <Text className={styles.infoValue}>10秒</Text>
          </Text>
        </View>
      </View>
    </View>
  )
}