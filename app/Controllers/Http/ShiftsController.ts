import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Shift from 'App/Models/Shift';

export default class ShiftsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theShift: Shift = await Shift.findOrFail(params.id)
            return theShift;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Shift.query().paginate(page, perPage)
            } else {
                return await Shift.query() //lista todos los elementos
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theShift: Shift = await Shift.create(body);
        return theShift;
    }

    public async update({ params, request }: HttpContextContract) {
        const theShift: Shift = await Shift.findOrFail(params.id);
        const body = request.body();
        theShift.start_time = body.start_time;
        theShift.end_time = body.end_time;
        theShift.machine_id = body.machine_id;
        theShift.operator_id = body.operator_id;
        return await theShift.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theShift: Shift = await Shift.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await theShift.delete();
    }
}
