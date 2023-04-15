import { Request, Response, NextFunction } from 'express'

export const notFoundRoute = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const sendErrorDev = (err: any, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  })
}
const sendErrorProd = (err: any, res: Response) => {
  // Operational, trusted error -> send message to client

  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })
  } else {
    console.error('ERROR', err) // log to the console in the production host
    res.status(500).json({
      status: 'error',
      message: 'something went extremply worng !'
    })
  }
}

const AppError = (res: Response, message: string, status: number) =>
  res.status(status).json({ success: false, message })

const handleCastErrorDB = (res: Response, error: any) => {
  const message = `Invalid ${error.path}: ${error.value}`
  return AppError(res, message, 400)
}
const handleDuplicateFields = (res: Response, error: any) => {
  const message = `Duplicate field value: -${error.keyValue.name}- choose another one`
  return AppError(res, message, 400)
}
const handleValidationError = (res: Response, error: any) => {
  const errors = Object.values(error.errors).map((item: any) => item.message) // iterate over error object to get all the messages
  const message = `Invalid input: ${errors.join(', ')}`
  return AppError(res, message, 400)
}
const handleJWTError = (res: Response, err: any) => {
  const message = `${err.message}, please login again.`
  return AppError(res, message, 401)
}
const handleJWTExpiredError = (res: Response, err: any) => {
  const message = `${err.message}, session expired, please login again.`
  return AppError(res, message, 401)
}
//------------------------------------------------------------------------------------------------------------------------------------------

// Global error Handler middleware (by passing 4 arguments express automaticly assume it's a Global error )
export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  if (process.env.NODE_ENV === 'dev') return sendErrorDev(err, res)
  // HANDLE ERRORS FOR PRODUCTION
  else if (process.env.NODE_ENV === 'prod') {
    let error = { ...err }

    // handle 3 mongo errors : invalid field, duplicate, validation error
    if (error.name === 'CastError') error = handleCastErrorDB(res, error)
    if (error.code === 11000) error = handleDuplicateFields(res, error)
    if (error._message === 'Validation failed') error = handleValidationError(res, error)
    if (error.name === 'JsonWebTokenError') error = handleJWTError(res, error)
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError(res, error)
    sendErrorProd(error, res)
  }
}

// export default function globalErrorHandler(app: Application) {
//   app.use(ErrorHandler);
// }
