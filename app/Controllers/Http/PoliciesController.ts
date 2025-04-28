import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Policy from 'App/Models/Policy';

export default class PoliciesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let thePolicy: Policy = await Policy.findOrFail(params.id)
            return thePolicy;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Policy.query().paginate(page, perPage)
            } else {
                return await Policy.query() //lista todos los elementos
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const thePolicy: Policy = await Policy.create(body);
        return thePolicy;
    }

    public async update({ params, request }: HttpContextContract) {
        const thePolicy: Policy = await Policy.findOrFail(params.id);
        const body = request.body();
        thePolicy.policy_number = body.policy_number;
        thePolicy.start_date = body.start_date;
        thePolicy.end_date = body.end_date;
        thePolicy.machine_id = body.machine_id;
        thePolicy.insurance_id = body.insurance_id;
        return await thePolicy.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const thePolicy: Policy = await Policy.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await thePolicy.delete();
    }
}
