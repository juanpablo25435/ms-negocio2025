import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Insurance from 'App/Models/Insurance';
import InsuranceValidator from 'App/Validators/InsuranceValidator';

export default class InsurancesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theInsurance: Insurance = await Insurance.findOrFail(params.id)
            return theInsurance;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Insurance.query().paginate(page, perPage)
            } else {
                return await Insurance.query() //lista todos los elementos
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const validatedData = await request.validate(InsuranceValidator);
        const theInsurance: Insurance = await Insurance.create(validatedData);
        return theInsurance;
    }

    public async update({ params, request }: HttpContextContract) {
        const theInsurance: Insurance = await Insurance.findOrFail(params.id);
        const validatedData = await request.validate(InsuranceValidator);
        theInsurance.name = validatedData.name;
        theInsurance.insurance_entity = validatedData.insurance_entity;
        theInsurance.insurance_number = validatedData.insurance_number;
        return await theInsurance.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theInsurance: Insurance = await Insurance.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await theInsurance.delete();
    }
}
