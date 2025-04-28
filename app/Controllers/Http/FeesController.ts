import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Fee from 'App/Models/Fee';
import FeeValidator from 'App/Validators/FeeValidator';

export default class FeesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theFee: Fee = await Fee.findOrFail(params.id)
            return theFee;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Fee.query().paginate(page, perPage)
            } else {
                return await Fee.query() //lista todos los elementos
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const validatedData = await request.validate(FeeValidator);
        const theFee: Fee = await Fee.create(validatedData);
        return theFee;
    }

    public async update({ params, request }: HttpContextContract) {
        const theFee: Fee = await Fee.findOrFail(params.id);
        const validatedData = await request.validate(FeeValidator);
        theFee.fee_number = validatedData.fee_number;
        theFee.fee_date = validatedData.fee_date;
        theFee.fee_amount = validatedData.fee_amount;
        theFee.invoice_id = validatedData.invoice_id;
        theFee.service_id = validatedData.service_id;
        return await theFee.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theFee: Fee = await Fee.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await theFee.delete();
    }
}
