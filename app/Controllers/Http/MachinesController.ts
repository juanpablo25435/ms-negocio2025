import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Machine from 'App/Models/Machine';

export default class MachinesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theMachine: Machine = await Machine.findOrFail(params.id)
            return theMachine;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Machine.query().paginate(page, perPage)
            } else {
                return await Machine.query() //lista todos los elementos
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theMachine: Machine = await Machine.create(body);
        return theMachine;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMachine: Machine = await Machine.findOrFail(params.id);
        const body = request.body();
        theMachine.name = body.name;
        theMachine.description = body.description;
        theMachine.model_year = body.model_year;
        return await theMachine.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMachine: Machine = await Machine.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await theMachine.delete();
    }
}
