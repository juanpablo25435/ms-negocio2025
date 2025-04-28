import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Work from 'App/Models/Work';

export default class WorksController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theWork: Work = await Work.findOrFail(params.id)
            return theWork;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Work.query().paginate(page, perPage)
            } else {
                return await Work.query() //lista todos los elementos
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theWork: Work = await Work.create(body);
        return theWork;
    }

    public async update({ params, request }: HttpContextContract) {
        const theWork: Work = await Work.findOrFail(params.id);
        const body = request.body();
        theWork.name = body.name;
        theWork.location = body.location;
        theWork.combo_id = body.combo_id;
        return await theWork.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theWork: Work = await Work.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await theWork.delete();
    }
}
