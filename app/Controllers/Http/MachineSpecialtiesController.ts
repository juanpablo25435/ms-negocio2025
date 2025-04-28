import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MachineSpecialty from 'App/Models/MachineSpecialty';

export default class MachineSpecialtiesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theMachineSpecialty: MachineSpecialty = await MachineSpecialty.findOrFail(params.id)
            return theMachineSpecialty;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await MachineSpecialty.query().paginate(page, perPage)
            } else {
                return await MachineSpecialty.query() //lista todos los elementos
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theMachineSpecialty: MachineSpecialty = await MachineSpecialty.create(body);
        return theMachineSpecialty;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMachineSpecialty: MachineSpecialty = await MachineSpecialty.findOrFail(params.id);
        const body = request.body();
        theMachineSpecialty.machine_id = body.machine_id;
        theMachineSpecialty.service_type_id = body.service_type_id;
        return await theMachineSpecialty.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMachineSpecialty: MachineSpecialty = await MachineSpecialty.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await theMachineSpecialty.delete();
    }
}
