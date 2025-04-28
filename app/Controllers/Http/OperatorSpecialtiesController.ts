import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OperatorSpecialty from 'App/Models/OperatorSpecialty';

export default class OperatorSpecialtiesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theOperatorSpecialty: OperatorSpecialty = await OperatorSpecialty.findOrFail(params.id)
            return theOperatorSpecialty;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await OperatorSpecialty.query().paginate(page, perPage)
            } else {
                return await OperatorSpecialty.query() //lista todos los elementos
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theOperatorSpecialty: OperatorSpecialty = await OperatorSpecialty.create(body);
        return theOperatorSpecialty;
    }

    public async update({ params, request }: HttpContextContract) {
        const theOperatorSpecialty: OperatorSpecialty = await OperatorSpecialty.findOrFail(params.id);
        const body = request.body();
        theOperatorSpecialty.operator_id = body.operator_id;
        theOperatorSpecialty.specialty_id = body.specialty_id;  
        return await theOperatorSpecialty.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theOperatorSpecialty: OperatorSpecialty = await OperatorSpecialty.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await theOperatorSpecialty.delete();
    }
}
