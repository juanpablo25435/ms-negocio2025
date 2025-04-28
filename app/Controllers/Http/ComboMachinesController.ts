import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ComboMachine from 'App/Models/ComboMachine';
import ComboMachineValidator from 'App/Validators/ComboMachineValidator';

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
        // Validación automática que lanzará exception si falla
        const validatedData = await request.validate(ComboMachineValidator)
        const theComboMachine = await ComboMachine.create(validatedData)
        return theComboMachine
      }

    public async update({ params, request }: HttpContextContract) {
        const theComboMachine = await ComboMachine.findOrFail(params.id)
        
        // Validación con los mismos criterios que create
        const validatedData = await request.validate(ComboMachineValidator)
        theComboMachine.machine_id = validatedData.machine_id
        theComboMachine.combo_id = validatedData.combo_id
        await theComboMachine.save()
        return theComboMachine
      }

    public async delete({ params, response }: HttpContextContract) {
        const theComboMachine: ComboMachine = await ComboMachine.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await theComboMachine.delete();
    }
}
