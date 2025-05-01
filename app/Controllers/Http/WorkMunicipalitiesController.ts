import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import WorkMunicipality from 'App/Models/WorkMunicipality';
import WorkMunicipalityValidator from 'App/Validators/WorkMunicipalityValidator';

export default class WorkMunicipalitiesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theWorkMunicipality: WorkMunicipality = await WorkMunicipality.findOrFail(params.id)
            return theWorkMunicipality;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await WorkMunicipality.query().paginate(page, perPage)
            } else {
                return await WorkMunicipality.query() //lista todos los elementos
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const validatedData = await request.validate(WorkMunicipalityValidator);
        const theWorkMunicipality: WorkMunicipality = await WorkMunicipality.create(validatedData);
        return theWorkMunicipality;
    }

    public async update({ params, request }: HttpContextContract) {
        const theWorkMunicipality: WorkMunicipality = await WorkMunicipality.findOrFail(params.id);
        const validatedData = await request.validate(WorkMunicipalityValidator);
        theWorkMunicipality.work_id = validatedData.work_id;
        theWorkMunicipality.municipality_id = validatedData.municipality_id;
        return await theWorkMunicipality.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theWorkMunicipality: WorkMunicipality = await WorkMunicipality.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await theWorkMunicipality.delete();
    }
}
