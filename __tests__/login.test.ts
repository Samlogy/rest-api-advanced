import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import supertest from 'supertest'
import App from '../src/app'
import UserService from '../src/services/user.service'
import { generateToken } from '../src/utils/jwt.utils'

const app = new App().app

// beforeAll(async () => {
//   await launchApp()
// })

const userObj = {
  email: 'sam@gmail.com',
  password: '123',
  role: 'moderator'
}

describe('AUTH', () => {
  // open mongoose server connection
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
  })

  // close mongoose server connection
  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
  })

  describe('GET: /auth/logout', () => {
    describe('Fail', () => {
      it('should return a 500 & error Obj', async () => {
        const { body, statusCode } = await supertest(app).get(`/auth/logout`)

        expect(statusCode).toBe(500)
        expect(body).toBe({ success: false, message: 'an ocurred while sign Out' })
      })
    })

    describe('Success', () => {
      it('should return a 200 & success Obj', async () => {
        const { body, statusCode } = await supertest(app).get(`/auth/logout`)

        expect(statusCode).toBe(200)
        expect(body).toBe({ success: true, data: {} })
      })
    })
  })

  describe('GET: /auth/login', () => {
    const userService = new UserService()
    describe('Fail', () => {
      it('should return a 500 & error Obj', async () => {
        await userService.findOne({ email: userObj.email })
        const { body, statusCode } = await supertest(app).get(`/auth/login`)

        expect(statusCode).toBe(500)
        expect(body).toBe({ success: false, message: 'an ocurred while signIn' })
      })

      it('should return a 401 & error Obj', async () => {
        const userExist = await userService.findOne({ email: userObj.email })
        const { body, statusCode } = await supertest(app).get(`/auth/login`)

        expect(statusCode).toBe(401)
        expect(body).toBe({ success: false, message: 'Invalid credentials' })
      })
    })

    describe('Success', () => {
      it('should return a 200 & success Obj', async () => {
        const user = await userService.findOne({ email: userObj.email })
        const { body, statusCode } = await supertest(app).get(`/auth/login`)

        const token = generateToken({
          id: user.id,
          email: user.email,
          role: user.role
        })

        expect(statusCode).toBe(200)
        expect(body).toBe({ success: true, data: { user, token } })
      })
    })
  })

  describe('GET: /auth/register', () => {
    const userService = new UserService()
    describe('Fail', () => {
      it('should return a 409 & error Obj', async () => {
        const { body, statusCode } = await supertest(app).post(`/auth/register`)

        expect(statusCode).toBe(409)
        expect(body).toBe({ success: false, message: 'Email already in use' })
      })

      it('should return a 500 & error Obj', async () => {
        await userService.findOne({ email: userObj.email })
        const { body, statusCode } = await supertest(app).get(`/auth/register`)

        expect(statusCode).toBe(500)
        expect(body).toBe({ success: false, message: 'an ocurred while sign Up' })
      })
    })

    describe('Success', () => {
      it('should return a 200 & success Obj', async () => {
        const user = await userService.create({ email: userObj.email, password: userObj.password })
        const token = generateToken({
          id: user.id,
          email: user.email,
          role: user.role
        })
        const { body, statusCode } = await supertest(app).get(`/auth/register`)

        expect(statusCode).toBe(201)
        expect(body).toBe({ success: true, data: { user, token } })
      })
    })
  })
})
