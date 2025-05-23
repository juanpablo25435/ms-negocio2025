import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Procedure from 'App/Models/Procedure';
import ProcedureValidator from 'App/Validators/ProcedureValidator';

export default class ProceduresController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theProcedure: Procedure = await Procedure.findOrFail(params.id)
            return theProcedure;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Procedure.query().paginate(page, perPage)
            } else {
                return await Procedure.query() //lista todos los elementos
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const validatedData = await request.validate(ProcedureValidator);
        const theProcedure: Procedure = await Procedure.create(validatedData);
        return theProcedure;
    }

    public async update({ params, request }: HttpContextContract) {
        const theProcedure: Procedure = await Procedure.findOrFail(params.id);
        const validatedData = await request.validate(ProcedureValidator);
        theProcedure.name = validatedData.name;
        theProcedure.description = validatedData.description ?? '';
        return await theProcedure.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theProcedure: Procedure = await Procedure.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await theProcedure.delete();
    }
}
