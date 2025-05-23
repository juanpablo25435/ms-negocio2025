import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Message from 'App/Models/Message';
import MessageValidator from 'App/Validators/MessageValidator';

export default class MessagesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theMessage: Message = await Message.findOrFail(params.id)
            return theMessage;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Message.query().paginate(page, perPage)
            } else {
                return await Message.query() //lista todos los elementos
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const validatedData = await request.validate(MessageValidator);
        const theMessage: Message = await Message.create(validatedData);
        return theMessage;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMessage: Message = await Message.findOrFail(params.id);
        const validatedData = await request.validate(MessageValidator);
        theMessage.user_id = validatedData.user_id;
        theMessage.chat_id = validatedData.chat_id;
        theMessage.message = validatedData.message;
        return await theMessage.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMessage: Message = await Message.findOrFail(params.id); //busqueda mediante identificador
            response.status(204);
            return await theMessage.delete();
    }
}
