import { NextFunction, Request, Response } from 'express'
import UserService from '../services/user.service'
import { generateToken } from '../utils/jwt.utils'

export default class AuthController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, role } = req.body
      const existingUser = await this.userService.findOne({ email })

      if (existingUser) {
        return res.status(409).json({ success: false, message: 'Email already in use' })
      }

      const user = await this.userService.create({ email, password })
      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role
      })

      return res.status(201).json({ success: true, data: { user, token } })
    } catch (err) {
      return res.status(500).json({ success: false, message: 'an ocurred while sign Up' })
    }
  }
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      const userExist = await this.userService.findOne({ email })

      if (!userExist) return res.status(401).json({ success: false, message: 'Invalid credentials' })

      const isMatch = await userExist.comparePasswords(password, userExist.password)

      if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' })

      const token = generateToken({
        id: userExist.id,
        email: userExist.email,
        role: userExist.role
      })

      return res.status(200).json({ success: true, data: { user: userExist, token } })
    } catch (err) {
      return res.status(500).json({ success: false, message: 'an ocurred while signIn' })
    }
  }
  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      // delete token
      res.status(200).json({ success: true, data: {} })
    } catch (err) {
      res.status(500).json({ success: false, message: 'an ocurred while sign Out' })
    }
  }
}
