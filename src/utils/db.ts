import mongoose from 'mongoose'
// import { devConfig } from '../../config'

export default async function mongoDB(uri: string) {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(uri)

    console.log('DB connected')
  } catch (err) {
    console.log('Could not connect to db: ', err)
    process.exit(1)
  }
}
