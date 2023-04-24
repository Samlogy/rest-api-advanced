// import { MongoMemoryServer } from 'mongodb-memory-server'
import supertest from 'supertest'
import App from '../src/app'

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
  // beforeAll(async () => {
  //   const mongoServer = await MongoMemoryServer.create()
  //   await mongoose.connect(mongoServer.getUri())
  // })

  // close mongoose server connection
  // afterAll(async () => {
  //   await mongoose.disconnect()
  //   await mongoose.connection.close()
  // })

  describe('GET: /auth/logout', () => {
    // describe('Fail', () => {
    //   it('should return a 500 & error Obj', async () => {
    //     const { body, statusCode } = await supertest(app).get(`/auth/logout`)

    //     expect(statusCode).toBe(500)
    //     expect(body).toEqual({ success: false, message: 'an ocurred while sign Out' })
    //   })
    // })

    describe('Success', () => {
      it('should return a 200 & success Obj', async () => {
        const { body, statusCode } = await supertest(app).get(`/auth/logout`)

        expect(statusCode).toBe(200)
        expect(body).toEqual({ success: true, data: {} })
      })
    })
  })
})
