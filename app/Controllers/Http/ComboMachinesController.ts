import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ComboMachine from 'App/Models/ComboMachine';

export default class ComboMachinesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theComboMachine: ComboMachine = await ComboMachine.findOrFail(params.id)
            return theComboMachine;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await ComboMachine.query().paginate(page, perPage)
            } else {
                return await ComboMachine.query() //lista todos los elementos
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theComboMachine: ComboMachine = await ComboMachine.create(body);
        return theComboMachine;
    }

    public async update({ params, request }: HttpContextContract) {
        const theComboMachine: ComboMachine = await ComboMachine.findOrFail(params.id);
        const body = request.body();
        theComboMachine.machine_id = body.machine_id;
        theComboMachine.combo_id = body.combo_id;
        return await theComboMachine.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theComboMachine: ComboMachine = await ComboMachine.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await theComboMachine.delete();
    }
}
