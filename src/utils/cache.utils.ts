import Redis from 'ioredis'

export const redisClient = new Redis({
  host: 'localhost',
  port: 6379 // default Redis port
})

export const setCache = async (key: string, value: string, ttlSeconds: number): Promise<boolean> => {
  try {
    await redisClient.set(key, value, 'EX', ttlSeconds)
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export const getCache = async (key: string): Promise<string | null> => {
  try {
    const cache = await redisClient.get(key)
    return cache ? cache.toString() : null
  } catch (err) {
    console.log(err)
    return null
  }
}

export const deleteCache = async (key: string): Promise<boolean> => {
  try {
    await redisClient.del(key)
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}
