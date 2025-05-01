import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Shift from 'App/Models/Shift';
import ShiftValidator from 'App/Validators/ShiftValidator';

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
        const validatedData = await request.validate(ShiftValidator);
        const theShift: Shift = await Shift.create(validatedData);
        return theShift;
    }

    public async update({ params, request }: HttpContextContract) {
        const theShift: Shift = await Shift.findOrFail(params.id);
        const validatedData = await request.validate(ShiftValidator);
        theShift.start_time = validatedData.start_time;
        theShift.end_time = validatedData.end_time;
        theShift.machine_id = validatedData.machine_id;
        theShift.operator_id = validatedData.operator_id;
        return await theShift.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theShift: Shift = await Shift.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await theShift.delete();
    }
}
