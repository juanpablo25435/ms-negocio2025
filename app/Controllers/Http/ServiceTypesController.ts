import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ServiceType from 'App/Models/ServiceType';
import ServiceTypeValidator from 'App/Validators/ServiceTypeValidator';

export default class ServiceTypesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theServiceType: ServiceType = await ServiceType.findOrFail(params.id)
            return theServiceType;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await ServiceType.query().paginate(page, perPage)
            } else {
                return await ServiceType.query() //lista todos los elementos
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const validatedData = await request.validate(ServiceTypeValidator);
        const theServiceType: ServiceType = await ServiceType.create(validatedData);
        return theServiceType;
    }

    public async update({ params, request }: HttpContextContract) {
        const theServiceType: ServiceType = await ServiceType.findOrFail(params.id);
        const validatedData = await request.validate(ServiceTypeValidator);
        theServiceType.name = validatedData.name;
        theServiceType.description = validatedData.description ?? '';
        return await theServiceType.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theServiceType: ServiceType = await ServiceType.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await theServiceType.delete();
    }
}
