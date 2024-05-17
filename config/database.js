import mongoose, { mongo } from 'mongoose'

let connected = false

const connectDB = async () => {
    mongoose.set('strictQuery' , true)

    if(connected){
        console.log('MongoDB is already conected')
        return
    }


    try{
        await mongoose.connect(process.env.MONGODB_URI)
        connected = true
        console.log('MongoDB is connected...')
    }
    catch(error){
        console.log(error)
    }
}

export default connectDB