import Redis from 'ioredis'
import { logger } from './logger'

export default class Cache {
  private redisClient: Redis

  constructor() {
    this.redisClient = new Redis({
      host: 'localhost',
      port: 6379
    })
  }

  async get(key: string): Promise<string | null> {
    try {
      const cache = await this.redisClient.get(key)
      return cache ? cache.toString() : null
    } catch (err) {
      logger.error('cache: ', err)
      return null
    }
  }

  async set(key: string, value: string, ttlSeconds: number): Promise<boolean> {
    try {
      await this.redisClient.set(key, value, 'EX', ttlSeconds)
      return true
    } catch (err) {
      logger.error('cache: ', err)
      return false
    }
  }

  async delete(key: string): Promise<boolean> {
    try {
      await this.redisClient.del(key)
      return true
    } catch (err) {
      logger.error('cache: ', err)
      return false
    }
  }

  async flush(): Promise<string | null> {
    try {
      return await this.redisClient.flushall()
    } catch (err) {
      logger.error('cache: ', err)
      return null
    }
  }
}
