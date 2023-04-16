import { signals } from './constants/signals'
import App from './app'
import env from './config'
import { mongoDB } from './utils/db'
import gracefulShutdown from './utils/gracefulShutdown'
import { logger } from './utils/logger'
import Cache from './utils/cache.utils'

// Handling uncaught Exception
process.on('uncaughtException', (err: Error) => {
  logger.info(`Error: ${err.message}`)
  logger.info(`shutting down the server for handling uncaught exception`)
})

type ISignals = readonly ['SIGINT', 'SIGTERM', 'SIGHUP']

const redisClient = new Cache()
const app = new App().app
const PORT = env.PORT
const MONGODB_URI = env.MONGODB_URI
const RESTART_DELAY = {
  cache: 1000,
  server: 3000,
  db: 5000
}

let server: any

export function createServer(port: string, delay: number) {
  return app
    .listen(port, () => logger.info(`Server started on port ${port}`))
    .on('error', (err: Error) => {
      logger.error(`Error starting server on port ${port}: ${err.message}`)
      setTimeout(() => createServer(port, delay), delay)
    })
}

export function checkSignals(server: any, signals: ISignals) {
  for (let i = 0; i < signals.length; i++) {
    process.on(signals[i], () =>
      gracefulShutdown({
        signal: signals[i],
        server
      })
    )
  }
}

export async function launchApp() {
  try {
    // await mongoDB(MONGODB_URI)
    const server = createServer(PORT, RESTART_DELAY.server)
    checkSignals(server, signals)
    redisClient
  } catch (err: any) {
    logger.error(`Failed to connect to database: ${err.message}`)
    setTimeout(() => createServer(PORT, RESTART_DELAY.server), RESTART_DELAY.db)
  }
}

launchApp()

// unhandled promise rejection
process.on('unhandledRejection', (err: Error) => {
  logger.info(`Shutting down the server for ${err.message}`)
  logger.info(`shutting down the server for unhandle promise rejection`)

  server.close(() => {
    process.exit(1)
  })
})

// launch APP:
// lanuch mongoDB server (Atlas)
// lanuch our app server (Express)
// check for gracefulShutdown (stoping server --> signals)
// lanuch our cache (Redis)
