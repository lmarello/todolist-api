import { signToken } from '../auth'
import User from '../models/User'

export const signIn = async (req, res) => {
    const notFound = () => {
        return res
            .status(400)
            .json({ message: 'Usuario y/o contraseña incorrecta.' })
    }

    try {
        const { email, password } = req.body

        const userDb = await User.findOne({ email })

        if (!userDb) return notFound()

        const isValid = User.comparePassword(
            userDb.salt,
            userDb.password,
            password
        )

        if (!isValid) return notFound()

        const token = signToken(userDb._id)
        return res.json({ token })
    } catch (error) {
        return notFound()
    }
}

export const signUp = async (req, res) => {
    try {
        const { name, username, email, password } = req.body

        const userDb = await User.findOne({ email })

        if (userDb)
            return res.status(400).json({ message: 'Usuario ya registrado.' })

        const { encryptedPassword, salt } = User.encryptPassword(password)

        const newUser = new User({
            name,
            username,
            email,
            password: encryptedPassword,
            salt,
        })

        const user = await newUser.save()
        const token = signToken(user._id)

        return res.json({ token })
    } catch (error) {
        return res.status(400).json({
            message: 'Error al crear el usuario.',
            error: error.message,
        })
    }
}
