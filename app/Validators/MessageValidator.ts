import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MessageValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.number([
      rules.required(),
      rules.exists({ table: 'users', column: 'id' }), // Verifica que el usuario exista
    ]),
    chat_id: schema.number([
      rules.required(),
      rules.exists({ table: 'chats', column: 'id' }), // Verifica que el chat exista
    ]),
    message: schema.string([
      rules.required(),
      rules.minLength(1), // El mensaje debe tener al menos 1 carácter
      rules.maxLength(500), // El mensaje no puede exceder los 500 caracteres
    ]),
  })

  public messages: CustomMessages = {
    // Mensajes personalizados para los campos principales
    'user_id.required': 'El ID del usuario es obligatorio',
    'user_id.exists': 'El usuario especificado no existe',
    'chat_id.required': 'El ID del chat es obligatorio',
    'chat_id.exists': 'El chat especificado no existe',
    'message.required': 'El contenido del mensaje es obligatorio',
    'message.minLength': 'El mensaje debe tener al menos 1 carácter',
    'message.maxLength': 'El mensaje no puede exceder los 500 caracteres',
  }
}