import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Evidence from 'App/Models/Evidence';

export default class EvidencesController {public async find({ request, params }: HttpContextContract) {
    if (params.id) {
        let theEvidence: Evidence = await Evidence.findOrFail(params.id)
        return theEvidence;
    } else {
        const data = request.all()
        if ("page" in data && "per_page" in data) {
            const page = request.input('page', 1);
            const perPage = request.input("per_page", 20);
            return await Evidence.query().paginate(page, perPage)
        } else {
            return await Evidence.query() //lista todos los elementos
        }

    }

}
public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theEvidence: Evidence = await Evidence.create(body);
    return theEvidence;
}

public async update({ params, request }: HttpContextContract) {
    const theEvidence: Evidence = await Evidence.findOrFail(params.id);
    const body = request.body();
    theEvidence.evidence_description = body.evidence_description;
    theEvidence.service_id = body.service_id;
    return await theEvidence.save();
}

public async delete({ params, response }: HttpContextContract) {
    const theEvidence: Evidence = await Evidence.findOrFail(params.id); //busqueda mediante identificador
        response.status(204);
        return await theEvidence.delete();
}}
