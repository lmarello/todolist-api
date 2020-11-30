import { verifyToken } from '../auth'

export const isAuthenticated = async (req, res, next) => {
    const token = req.headers['access-token']

    if (!token) return res.status(403).json({ message: 'No token provided' })

    const userId = await verifyToken(token)

    if (!userId) return res.status(401).json({ message: 'Unauthorize' })

    req.userId = userId

    next()
}
