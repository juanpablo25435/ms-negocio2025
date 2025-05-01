import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Maintenance from 'App/Models/Maintenance';
import MaintenanceValidator from 'App/Validators/MaintenanceValidator';

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
        const validatedData = await request.validate(MaintenanceValidator);
        const theMaintenance: Maintenance = await Maintenance.create(validatedData);
        return theMaintenance;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMaintenance: Maintenance = await Maintenance.findOrFail(params.id);
        const validatedData = await request.validate(MaintenanceValidator);
        theMaintenance.description = validatedData.description;
        theMaintenance.date_performed = validatedData.date_performed;
        theMaintenance.machine_id = validatedData.machine_id;
        return await theMaintenance.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMaintenance: Maintenance = await Maintenance.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await theMaintenance.delete();
    }
}
