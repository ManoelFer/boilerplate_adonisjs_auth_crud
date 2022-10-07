import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CreateUser from 'App/Validators/User/CreateUserValidator'
import UpdateUser from 'App/Validators/User/UpdateUserValidator'

import User from 'App/Models/User'


export default class UsersController {
    public async index({ response }: HttpContextContract) {
        const users = await User.all()

        return response.ok(users)
    }

    public async store({ request, response }: HttpContextContract) {
        const data = request.all()

        await request.validate(CreateUser)

        try {
            const user = await User.create(data)

            return response.ok(user)
        } catch (error) {
            response.badRequest({
                message: 'Falha na criação do usuário',
                error: error.message,
            })
        }
    }

    public async show({ response, params }: HttpContextContract) {
        try {
            const users = await User.findOrFail(params.id)

            return response.ok(users)
        } catch (error) {
            response.notFound({
                message: 'Usuário não encontrado',
                error: error.message,
            })
        }
    }

    public async update({ params, request, response }: HttpContextContract) {
        const data = request.all()

        await request.validate(UpdateUser)

        try {
            const user = await User.findByOrFail('id', params.id)

            await user.merge(data).save()

            return response.ok(user)
        } catch (error) {
            response.badRequest({
                message: 'Falha na atualização do usuário',
                error: error.message,
            })
        }
    }

    public async destroy({ params, response }: HttpContextContract) {
        try {
            const user = await User.findByOrFail('id', params.id)

            await user.delete()

            return response.ok(user)
        } catch (error) {
            response.badRequest({
                message: 'Falha na exclusão do usuário',
                error: error.message,
            })
        }
    }
}

