import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Chat from "App/Models/Chat";
import ChatValidator from "App/Validators/ChatValidator";
import Ws from "App/Services/Ws";

export default class ChatsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theChat: Chat = await Chat.findOrFail(params.id);
      return theChat;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Chat.query().paginate(page, perPage);
      } else {
        return await Chat.query(); //lista todos los elementos
      }
    }
  }
  public async create({ request, response }: HttpContextContract) {
    const validatedData = await request.validate(ChatValidator);
    const theChat = await Chat.create(validatedData);
    return response.created(theChat);
  }

  public async update({ request, params }: HttpContextContract) {
    const theChat: Chat = await Chat.findOrFail(params.id); //busqueda mediante identificador
    const validatedData = await request.validate(ChatValidator);
    theChat.merge(validatedData);
    return await theChat.save();
  }
  
  public async delete({ params, response }: HttpContextContract) {
    const theChat: Chat = await Chat.findOrFail(params.id); //busqueda mediante identificador
    response.status(204);
    return await theChat.delete();
  }

  public async sendMessage({ request }: HttpContextContract) {
        Ws.io.emit('notifications', { message: 'Nueva Notificación' })
        return { message: 'Mensaje enviado a todos los clientes conectados' };
    }
}
