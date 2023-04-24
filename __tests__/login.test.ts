// import { MongoMemoryServer } from 'mongodb-memory-server'
import supertest from 'supertest'
import App from '../src/app'
import { generateToken } from '../src/utils/jwt'

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
  describe('GET: /auth/logout', () => {
    describe('Success', () => {
      it('Logged out', async () => {
        const { body, statusCode } = await supertest(app).get(`/auth/logout`)

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

      it('Email dont Exists', async () => {
        const user = {
          email: 'bob@gmail.com',
          password: '123',
          role: 'moderator'
        }
        const { body, statusCode } = await supertest(app).post('/auth/login').send(user)

        expect(statusCode).toBe(401)
        expect(body).toEqual({ success: false, message: 'Invalid credentials' })
      })
    })

    describe('Success', () => {
      it('should return a 200 & success Obj', async () => {
        const userReturned = {
          _id: '64217b832f3a8692ec4e9bd5',
          email: 'sam@gmail.com',
          password: '$2a$10$kfjwD4Z1LNs/pEF3fd8CWOdtA3ZY2aMLp9gRFij/zKdDGv1shbYSa',
          role: 'moderator',
          createdAt: '2023-03-27T11:17:33.892Z',
          __v: 0
        }

        const token = generateToken({
          id: userReturned._id,
          email: userReturned.email,
          role: userReturned.role
        })

        const { body, statusCode } = await supertest(app).post('/auth/login').send(userObj)

        expect(statusCode).toBe(200)
        expect(body).toEqual({ success: true, data: { user: userReturned, token } })
      })
    })
  })
})
