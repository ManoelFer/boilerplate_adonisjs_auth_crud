import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class AuthController {
    public async login({ request, auth, response }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')

        // Lookup user manually
        const user = await User.query().where('email', email).first()

        if (user) {
            const token = await auth.use('api').attempt(email, password)

            return response.status(200).json({ token: token.token, user: user.serialize() })
        } else {
            return response.unauthorized({ message: "Invalid email or password" })
        }

    }
}
