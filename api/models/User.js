import { Schema, model } from 'mongoose'
import { encryptPassword, createSalt } from '../auth'

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        salt: String,
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

userSchema.statics.encryptPassword = (password) => {
    console.log(createSalt)
    const salt = createSalt()
    const encryptedPassword = encryptPassword(password, salt)
    return { encryptedPassword, salt }
}

userSchema.statics.comparePassword = (salt, password, receivedPassword) => {
    const encryptedPassword = encryptPassword(receivedPassword, salt)
    if (encryptedPassword === password) return true
    return false
}

export default model('User', userSchema)
