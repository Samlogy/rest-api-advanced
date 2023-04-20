import pino from 'pino'

const logger = pino({
  redact: ['hostname'],
  timestamp() {
    return `, ${new Date().toISOString()}`
  }
})
export default logger
