import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Governor from 'App/Models/Governor';
import GovernorValidator from 'App/Validators/GovernorValidator';

export default class GovernorsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theGovernor: Governor = await Governor.findOrFail(params.id)
            return theGovernor;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Governor.query().paginate(page, perPage)
            } else {
                return await Governor.query() //lista todos los elementos
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const validatedData = await request.validate(GovernorValidator);
        const theGovernor: Governor = await Governor.create(validatedData);
        return theGovernor;
    }

    public async update({ params, request }: HttpContextContract) {
        const theGovernor: Governor = await Governor.findOrFail(params.id);
        const validatedData = await request.validate(GovernorValidator);
        theGovernor.name = validatedData.name;
        theGovernor.department_id = validatedData.department_id;
        theGovernor.user_id = validatedData.user_id;
        return await theGovernor.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theGovernor: Governor = await Governor.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await theGovernor.delete();
    }
}
