import request from 'supertest'
import App from '../src/app'

describe('Test app.ts', () => {
  it('Catch-all route', async () => {
    const app = new App().app
    const res = await request(app).get('/health-check')
    expect(res.body).toEqual({
      message: 'health-check'
    })
  })
})
