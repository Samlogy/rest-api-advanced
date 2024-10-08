import jwt from 'jsonwebtoken'
import env from '../config'

interface User {
  id: string
  email: string
  role: string
}

const secret = env.JWT_SECRET || 'jwt-secret'

// Generate a JWT token for a user
export const generateToken = (data: User, expiresIn = '1h'): string => {
  return jwt.sign({ id: data.id, email: data.email, role: data.role }, secret, {
    expiresIn
  })
}

// Verify and decode a JWT token
export const decodeToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, secret)
    return decoded
  } catch (error) {
    return null
  }
}
