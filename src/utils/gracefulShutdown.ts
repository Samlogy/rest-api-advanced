import { signals } from 'constants/signals'
import Cache from './cache'
import { disconnectMongoDB } from './db'
import logger from './logger'

export default async function gracefulShutdown({ signal, server }: { signal: (typeof signals)[number]; server: any }) {
  const redisClient = new Cache()
  logger.info(`Got signal ${signal}. Good bye`)
  await server.close()
  await redisClient.close()
  await disconnectMongoDB()
  process.exit(0)
}
