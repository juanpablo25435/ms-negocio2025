import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import WorkMunicipality from 'App/Models/WorkMunicipality';

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
        const body = request.body();
        const theWorkMunicipality: WorkMunicipality = await WorkMunicipality.create(body);
        return theWorkMunicipality;
    }

    public async update({ params, request }: HttpContextContract) {
        const theWorkMunicipality: WorkMunicipality = await WorkMunicipality.findOrFail(params.id);
        const body = request.body();
        theWorkMunicipality.work_id = body.work_id;
        theWorkMunicipality.municipality_id = body.municipality_id;
        return await theWorkMunicipality.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theWorkMunicipality: WorkMunicipality = await WorkMunicipality.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await theWorkMunicipality.delete();
    }
}
