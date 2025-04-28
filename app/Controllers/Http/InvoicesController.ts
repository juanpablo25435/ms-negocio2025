import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Invoice from 'App/Models/Invoice';

export default class InvoicesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theInvoice: Invoice = await Invoice.findOrFail(params.id)
            return theInvoice;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Invoice.query().paginate(page, perPage)
            } else {
                return await Invoice.query() //lista todos los elementos
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theInvoice: Invoice = await Invoice.create(body);
        return theInvoice;
    }

    public async update({ params, request }: HttpContextContract) {
        const theInvoice: Invoice = await Invoice.findOrFail(params.id);
        const body = request.body();
        theInvoice.invoice_number = body.invoice_number;
        theInvoice.invoice_date = body.invoice_date;
        theInvoice.total_amount = body.total_amount;
        return await theInvoice.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theInvoice: Invoice = await Invoice.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await theInvoice.delete();
    }
}
