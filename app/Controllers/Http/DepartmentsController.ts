import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Department from 'App/Models/Department';
import NotificationService from 'App/Services/NotificationService';
import DepartmentValidator from 'App/Validators/DepartmentValidator';

export default class DepartmentsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theDepartment: Department = await Department.findOrFail(params.id)
            return theDepartment;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Department.query().paginate(page, perPage)
            } else {
                return await Department.query() //lista todos los elementos
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const validatedData = await request.validate(DepartmentValidator)
        const theDepartment: Department = await Department.create(validatedData);
        /*
        // Obtener email del administrador (puedes cambiarlo según tu lógica)
      const adminEmail = Env.get('ADMIN_EMAIL')

      // Enviar notificación (no esperamos respuesta para no bloquear la creación)
      NotificationService.sendDepartmentCreatedNotification(
        department.name,
        adminEmail,
        department.id
      ).catch(error => {
        Logger.warn(`Notification failed but department was created: ${error.message}`)
      })*/
        return theDepartment;
    }

    public async update({ params, request }: HttpContextContract) {
        const theDepartment: Department = await Department.findOrFail(params.id);
        const validatedData = await request.validate(DepartmentValidator)              
        theDepartment.name = validatedData.name
        return await theDepartment.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theDepartment: Department = await Department.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await theDepartment.delete();
    }
}
