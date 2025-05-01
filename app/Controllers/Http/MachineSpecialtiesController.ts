import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MachineSpecialty from 'App/Models/MachineSpecialty';
import MachineSpecialtyValidator from 'App/Validators/MachineSpecialtyValidator';

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
        const validatedData = await request.validate(MachineSpecialtyValidator);
        const theMachineSpecialty: MachineSpecialty = await MachineSpecialty.create(validatedData);
        return theMachineSpecialty;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMachineSpecialty: MachineSpecialty = await MachineSpecialty.findOrFail(params.id);
        const validatedData = await request.validate(MachineSpecialtyValidator);
        theMachineSpecialty.machine_id = validatedData.machine_id;
        theMachineSpecialty.service_type_id = validatedData.service_type_id;
        return await theMachineSpecialty.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMachineSpecialty: MachineSpecialty = await MachineSpecialty.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await theMachineSpecialty.delete();
    }
}
