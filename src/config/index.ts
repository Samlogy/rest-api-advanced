import dotenv from 'dotenv'

dotenv.config({ path: `./src/config/.env.${process.env.NODE_ENV}` })

export default {
  PORT: process.env.PORT || '',
  REDIS_PORT: process.env.REDIS_PORT || '',
  REDIS_HOST: process.env.REDIS_HOST || '',
  MONGODB_URI: process.env.MONGODB_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  ENCRYPTION_SECRET: process.env.ENCRYPTION_SECRET || ''
}
