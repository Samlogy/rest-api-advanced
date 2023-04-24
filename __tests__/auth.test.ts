import { Application } from 'express'
import supertest from 'supertest'
import App from '../src/app'
import UserService from '../src/services/user.service'
import { generateToken } from '../src/utils/jwt'

// create express app instance
let app: Application
beforeAll(() => {
  app = new App().app
})

describe('AUTH', () => {
  describe('GET: /auth/logout', () => {
    describe('Success', () => {
      it('Logged out', async () => {
        const user = {
          id: '64217b832f3a8692ec4e9bd5',
          email: 'sam@gmail.com',
          role: 'moderator'
        }
        const token = generateToken(user)
        const { body, statusCode } = await supertest(app).get(`/auth/logout`).set('Authorization', `Bearer ${token}`)

        expect(statusCode).toBe(200)
        expect(body).toEqual({ success: true, data: {} })
      })
    })
  })

  describe('GET: /auth/login', () => {
    describe('Fail', () => {
      it('wrong password', async () => {
        const user = {
          email: 'sam@gmail.com',
          password: '12003',
          role: 'moderator'
        }
        const { body, statusCode } = await supertest(app).post('/auth/login').send(user)

        expect(statusCode).toBe(401)
        expect(body).toEqual({ success: false, message: 'Invalid credentials' })
      })

      it('Email do not Exist', async () => {
        const user = {
          email: 'bob@gmail.com',
          password: '123',
          role: 'moderator'
        }
        const { body, statusCode } = await supertest(app).post('/auth/login').send(user)

        expect(statusCode).toBe(401)
        expect(body).toEqual({ success: false, message: 'Invalid credentials' })
      })

      it('Login 500', async () => {
        const user = {
          email: 'sam@gmail.com',
          password: '123',
          role: 'moderator'
        }

        const spy = jest.spyOn(UserService.prototype, 'create').mockRejectedValueOnce(new Error('DB error'))

        const { body, statusCode } = await supertest(app).post('/auth/login').send(user)

        expect(statusCode).toBe(500)
        expect(body).toEqual({ success: false, message: 'an ocurred while signIn' })

        spy.mockRestore()
      })
    })

    describe('Success', () => {
      it('should return a 200 & success Obj', async () => {
        const user = {
          email: 'sam@gmail.com',
          password: '123',
          role: 'moderator'
        }

        const { body, statusCode } = await supertest(app).post('/auth/login').send(user)

        expect(statusCode).toBe(201)
        expect(body.success).toBe(true)
        expect(body.data.user.email).toBe(user.email)
        expect(body.data.user.role).toBe(user.role)
        expect(body.data.token).toBeTruthy()
      })
    })
  })

  describe('GET: /auth/register', () => {
    describe('Fail', () => {
      it('Email already exists', async () => {
        const user = {
          email: 'sam@gmail.com',
          password: '123',
          role: 'moderator'
        }
        const { body, statusCode } = await supertest(app).post(`/auth/register`).send(user)

        expect(statusCode).toBe(409)
        expect(body).toBe({ success: false, message: 'Email already in use' })
      })

      it('Register 500', async () => {
        const user = {
          email: 'sam@gmail.com',
          password: '123',
          role: 'moderator'
        }

        const spy = jest.spyOn(UserService.prototype, 'create').mockRejectedValueOnce(new Error('DB error'))

        const { body, statusCode } = await supertest(app).post('/auth/register').send(user)

        expect(statusCode).toBe(500)
        expect(body).toEqual({ success: false, message: 'an ocurred while sign Up' })

        spy.mockRestore()
      })
    })

    describe('Success', () => {
      it('User Registred', async () => {
        const user = {
          email: 'som@gmail.com',
          password: '123',
          role: 'moderator'
        }

        const { body, statusCode } = await supertest(app).post(`/auth/register`).send(user)

        expect(statusCode).toBe(201)
        expect(body.success).toBe(true)
        expect(body.data.user.email).toBe(user.email)
        expect(body.data.user.role).toBe(user.role)
        expect(body.data.token).toBeTruthy()
      })
    })
  })
})
