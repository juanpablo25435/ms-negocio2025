import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MaintenanceProcedure from 'App/Models/MaintenanceProcedure';
import MaintenanceProcedureValidator from 'App/Validators/MaintenanceProcedureValidator';

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
        const validatedData = await request.validate(MaintenanceProcedureValidator);
        const theMaintenanceProcedure: MaintenanceProcedure = await MaintenanceProcedure.create(validatedData);
        return theMaintenanceProcedure;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMaintenanceProcedure: MaintenanceProcedure = await MaintenanceProcedure.findOrFail(params.id);
        const validatedData = await request.validate(MaintenanceProcedureValidator);
        theMaintenanceProcedure.procedure_id = validatedData.procedure_id;
        theMaintenanceProcedure.maintenance_id = validatedData.maintenance_id;
        return await theMaintenanceProcedure.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMaintenanceProcedure: MaintenanceProcedure = await MaintenanceProcedure.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await theMaintenanceProcedure.delete();
    }
}
