import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Municipality from 'App/Models/Municipality';
import MunicipalityValidator from 'App/Validators/MunicipalityValidator';

export default class MunicipalitiesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theMunicipality: Municipality = await Municipality.findOrFail(params.id)
            return theMunicipality;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Municipality.query().paginate(page, perPage)
            } else {
                return await Municipality.query() //lista todos los elementos
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const validatedData = await request.validate(MunicipalityValidator);
        const theMunicipality: Municipality = await Municipality.create(validatedData);
        return theMunicipality;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMunicipality: Municipality = await Municipality.findOrFail(params.id);
        const validatedData = await request.validate(MunicipalityValidator);
        theMunicipality.name = validatedData.name;
        theMunicipality.department_id = validatedData.department_id;
        return await theMunicipality.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMunicipality: Municipality = await Municipality.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await theMunicipality.delete();
    }
}
