import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gps from 'App/Models/Gps';
import GpsValidator from 'App/Validators/GpsValidator';

export default class GpsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theGps: Gps = await Gps.findOrFail(params.id)
            return theGps;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Gps.query().paginate(page, perPage)
            } else {
                return await Gps.query() //lista todos los elementos
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const validatedData = await request.validate(GpsValidator);
        const theGps: Gps = await Gps.create(validatedData);
        return theGps;
    }

    public async update({ params, request }: HttpContextContract) {
        const theGps: Gps = await Gps.findOrFail(params.id);
        const validatedData = await request.validate(GpsValidator);
        theGps.latitude = validatedData.latitude;
        theGps.longitude = validatedData.longitude;
        theGps.altitude = validatedData.altitude;
        theGps.machine_id = validatedData.machine_id;
        return await theGps.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theGps: Gps = await Gps.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await theGps.delete();
    }
}
