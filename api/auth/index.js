import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'
import User from '../models/User'

export const createSalt = () => {
    const salt = CryptoJS.lib.WordArray.random(128 / 8)
    return salt.toString(CryptoJS.enc.Base64)
}

export const encryptPassword = (password, salt) => {
    const key512Bits1000Iterations = CryptoJS.PBKDF2(password, salt, {
        keySize: 512 / 32,
        iterations: 1000,
    })

    return key512Bits1000Iterations.toString(CryptoJS.enc.Base64)
}

export const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 86400, // 24HS
    })
}

export const verifyToken = async (token) => {
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)
        if (!user) return null

        return user._id
    } catch (error) {
        return null
    }
}
