import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class UsersController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theUser: User = await User.findOrFail(params.id)
            return theUser;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await User.query().paginate(page, perPage)
            } else {
                return await User.query() //lista todos los elementos
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theUser: User = await User.create(body);
        return theUser;
    }

    public async update({ params, request }: HttpContextContract) {
        const theUser: User = await User.findOrFail(params.id);
        const body = request.body();
        theUser.username = body.username;
        theUser.email = body.email;
        return await theUser.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theUser: User = await User.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await theUser.delete();
    }
}
