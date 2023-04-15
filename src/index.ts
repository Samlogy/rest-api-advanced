import { signals } from './constants/signals'
import App from './app'
import env from './config'
import { mongoDB } from './utils/db'
import gracefulShutdown from './utils/gracefulShutdown'
import { logger } from './utils/logger'
// import { redisClient } from './utils/cache.utils'

// Handling uncaught Exception
process.on('uncaughtException', (err) => {
  logger.info(`Error: ${err.message}`)
  logger.info(`shutting down the server for handling uncaught exception`)
})

const app = new App().app
const PORT = env.PORT
const MONGODB_URI = env.MONGODB_URI

let server: any

mongoDB(MONGODB_URI)
  .then(() => {
    const server = app.listen(PORT, () => logger.info(`App is listening`))

    for (let i = 0; i < signals.length; i++) {
      process.on(signals[i], () =>
        gracefulShutdown({
          signal: signals[i],
          server
        })
      )
    }
    // redisClient
    // })
    return server
  })
  .catch((err) => console.error(`Failed to connect to database: ${err.message}`))

// unhandled promise rejection
process.on('unhandledRejection', (err: Error) => {
  logger.info(`Shutting down the server for ${err.message}`)
  logger.info(`shutting down the server for unhandle promise rejection`)

  server.close(() => {
    process.exit(1)
  })
})
