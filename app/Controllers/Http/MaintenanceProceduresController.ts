import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MaintenanceProcedure from 'App/Models/MaintenanceProcedure';

export default class MaintenanceProceduresController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theMaintenanceProcedure: MaintenanceProcedure = await MaintenanceProcedure.findOrFail(params.id)
            return theMaintenanceProcedure;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await MaintenanceProcedure.query().paginate(page, perPage)
            } else {
                return await MaintenanceProcedure.query() //lista todos los elementos
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theMaintenanceProcedure: MaintenanceProcedure = await MaintenanceProcedure.create(body);
        return theMaintenanceProcedure;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMaintenanceProcedure: MaintenanceProcedure = await MaintenanceProcedure.findOrFail(params.id);
        const body = request.body();
        theMaintenanceProcedure.procedure_id = body.procedure_id;
        theMaintenanceProcedure.maintenance_id = body.maintenance_id;
        return await theMaintenanceProcedure.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMaintenanceProcedure: MaintenanceProcedure = await MaintenanceProcedure.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await theMaintenanceProcedure.delete();
    }
}
