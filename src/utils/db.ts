import mongoose from 'mongoose'
import { logger } from './logger'

export async function mongoDB(uri: string) {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(uri)
    logger.info('Connected to database')
  } catch (err) {
    logger.error(err)
    process.exit(1)
  }
}

export function disconnectMongoDB() {
  return mongoose.connection.close()
}
