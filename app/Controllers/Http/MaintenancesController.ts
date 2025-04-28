import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Maintenance from 'App/Models/Maintenance';

export default class MaintenancesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theMaintenance: Maintenance = await Maintenance.findOrFail(params.id)
            return theMaintenance;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Maintenance.query().paginate(page, perPage)
            } else {
                return await Maintenance.query() //lista todos los elementos
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theMaintenance: Maintenance = await Maintenance.create(body);
        return theMaintenance;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMaintenance: Maintenance = await Maintenance.findOrFail(params.id);
        const body = request.body();
        theMaintenance.description = body.description;
        theMaintenance.date_performed = body.date_performed;
        theMaintenance.machine_id = body.machine_id;
        return await theMaintenance.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMaintenance: Maintenance = await Maintenance.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await theMaintenance.delete();
    }
}
