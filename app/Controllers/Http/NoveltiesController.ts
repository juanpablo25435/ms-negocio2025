import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Novelty from 'App/Models/Novelty';
import NoveltyValidator from 'App/Validators/NoveltyValidator';

export default class NoveltiesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theNovelty: Novelty = await Novelty.findOrFail(params.id)
            return theNovelty;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Novelty.query().paginate(page, perPage)
            } else {
                return await Novelty.query() //lista todos los elementos
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const validatedData = await request.validate(NoveltyValidator);
        const theNovelty: Novelty = await Novelty.create(validatedData);
        return theNovelty;
    }

    public async update({ params, request }: HttpContextContract) {
        const theNovelty: Novelty = await Novelty.findOrFail(params.id);
        const validatedData = await request.validate(NoveltyValidator);
        theNovelty.novelty_description = validatedData.novelty_description;
        theNovelty.shift_id = validatedData.shift_id;
        return await theNovelty.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theNovelty: Novelty = await Novelty.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await theNovelty.delete();
    }
}
