import request from 'supertest'
import App from '../src/app'
import { launchApp } from '../src/index'

describe('App Launch ', () => {
  // it('DB', async () => {})
  // it('Server', async () => {})
  // it('Cache', async () => {})
  it('', async () => {
    launchApp()
    const app = new App().app
    const res = await request(app).get('/health-check')
    expect(res.body).toEqual({
      message: 'health-check'
    })
  })
})
