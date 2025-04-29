import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SpareProcedure from 'App/Models/SpareProcedure';
import SpareProcedureValidator from 'App/Validators/SpareProcedureValidator';

export default class SpareProcedureProceduresController {
    public async find({ request, params }: HttpContextContract) {
                if (params.id) {
                    let theSpareProcedure: SpareProcedure = await SpareProcedure.findOrFail(params.id)
                    return theSpareProcedure;
                } else {
                    const data = request.all()
                    if ("page" in data && "per_page" in data) {
                        const page = request.input('page', 1);
                        const perPage = request.input("per_page", 20);
                        return await SpareProcedure.query().paginate(page, perPage)
                    } else {
                        return await SpareProcedure.query() //lista todos los elementos
                    }
        
                }
        
            }
            public async create({ request }: HttpContextContract) {
                const validatedData = await request.validate(SpareProcedureValidator)
                const theSpareProcedure: SpareProcedure = await SpareProcedure.create(validatedData);
                return theSpareProcedure;
            }
        
            public async update({ params, request }: HttpContextContract) {
                const theSpareProcedure: SpareProcedure = await SpareProcedure.findOrFail(params.id);
                const validatedData = await request.validate(SpareProcedureValidator)
                theSpareProcedure.spare_id = validatedData.spare_id;
                theSpareProcedure.maintenance_procedure_id = validatedData.maintenance_procedure_id;
                return await theSpareProcedure.save();
            }
        
            public async delete({ params, response }: HttpContextContract) {
                const theSpareProcedure: SpareProcedure = await SpareProcedure.findOrFail(params.id); //busqueda mediante identificador
                    response.status(204);
                    return await theSpareProcedure.delete();
            }
}
