import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Policy from 'App/Models/Policy';
import PolicyValidator from 'App/Validators/PolicyValidator';

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
        const validatedData = await request.validate(PolicyValidator);
        const thePolicy: Policy = await Policy.create(validatedData);
        return thePolicy;
    }

    public async update({ params, request }: HttpContextContract) {
        const thePolicy: Policy = await Policy.findOrFail(params.id);
        const validatedData = await request.validate(PolicyValidator);
        thePolicy.policy_number = validatedData.policy_number;
        thePolicy.start_date = validatedData.start_date;
        thePolicy.end_date = validatedData.end_date;
        thePolicy.machine_id = validatedData.machine_id;
        thePolicy.insurance_id = validatedData.insurance_id;
        return await thePolicy.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const thePolicy: Policy = await Policy.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await thePolicy.delete();
    }
}
