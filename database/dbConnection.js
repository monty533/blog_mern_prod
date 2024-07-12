import mongoose from 'mongoose'
import colors from 'colors'

export const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL)
    console.log(`connect to mongo database successfully ${conn.connection.host}`)
  } catch (error) {
    console.log(`error in mongo ${error}`.bgRed.white)
  }
}