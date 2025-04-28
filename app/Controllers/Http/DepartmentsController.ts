import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Department from 'App/Models/Department';
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
