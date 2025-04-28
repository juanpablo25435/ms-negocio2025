import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Operator from 'App/Models/Operator';

export default class OperatorsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theOperator: Operator = await Operator.findOrFail(params.id)
            return theOperator;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Operator.query().paginate(page, perPage)
            } else {
                return await Operator.query() //lista todos los elementos
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theOperator: Operator = await Operator.create(body);
        return theOperator;
    }

    public async update({ params, request }: HttpContextContract) {
        const theOperator: Operator = await Operator.findOrFail(params.id);
        const body = request.body();
        theOperator.name = body.name;
        theOperator.operator_id = body.operator_id;
        theOperator.user_id = body.user_id;
        return await theOperator.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theOperator: Operator = await Operator.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await theOperator.delete();
    }
}
