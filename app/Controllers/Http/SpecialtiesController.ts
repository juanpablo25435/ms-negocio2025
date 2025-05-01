import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Specialty from 'App/Models/Specialty';
import SpecialtyValidator from 'App/Validators/SpecialtyValidator';

export default class SpecialtiesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theSpecialty: Specialty = await Specialty.findOrFail(params.id)
            return theSpecialty;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Specialty.query().paginate(page, perPage)
            } else {
                return await Specialty.query() //lista todos los elementos
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const validatedData = await request.validate(SpecialtyValidator);
        const theSpecialty: Specialty = await Specialty.create(validatedData);
        return theSpecialty;
    }

    public async update({ params, request }: HttpContextContract) {
        const theSpecialty: Specialty = await Specialty.findOrFail(params.id);
        const validatedData = await request.validate(SpecialtyValidator);
        theSpecialty.name = validatedData.name;
        theSpecialty.description = validatedData.description ?? '';
        return await theSpecialty.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theSpecialty: Specialty = await Specialty.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await theSpecialty.delete();
    }
}
