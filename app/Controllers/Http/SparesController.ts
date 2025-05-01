import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Spare from 'App/Models/Spare';
import SpareValidator from 'App/Validators/SpareValidator';

export default class SparesController {
    public async find({ request, params }: HttpContextContract) {
            if (params.id) {
                let theSpare: Spare = await Spare.findOrFail(params.id)
                return theSpare;
            } else {
                const data = request.all()
                if ("page" in data && "per_page" in data) {
                    const page = request.input('page', 1);
                    const perPage = request.input("per_page", 20);
                    return await Spare.query().paginate(page, perPage)
                } else {
                    return await Spare.query() //lista todos los elementos
                }
    
            }
    
        }
        public async create({ request }: HttpContextContract) {
            const validatedData = await request.validate(SpareValidator)
            const theSpare: Spare = await Spare.create(validatedData);
            return theSpare;
        }
    
        public async update({ params, request }: HttpContextContract) {
            const theSpare: Spare = await Spare.findOrFail(params.id);
            const validatedData = await request.validate(SpareValidator)
            theSpare.name = validatedData.name;
            theSpare.description = validatedData.description ?? '';
            theSpare.price = validatedData.price;
            return await theSpare.save();
        }
    
        public async delete({ params, response }: HttpContextContract) {
            const theSpare: Spare = await Spare.findOrFail(params.id); //busqueda mediante identificador
                response.status(204);
                return await theSpare.delete();
        }
}
