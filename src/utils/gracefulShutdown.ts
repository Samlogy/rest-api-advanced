import { disconnectMongoDB } from './db'
import { logger } from './logger'
import { signals } from 'constants/signals'

export default async function gracefulShutdown({ signal, server }: { signal: (typeof signals)[number]; server: any }) {
  logger.info(`Got signal ${signal}. Good bye`)
  await server.close()
  await disconnectMongoDB()
  process.exit(0)
}
