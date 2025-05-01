import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string([
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
      rules.unique({ table: 'users', column: 'username' }), // Verifica que el nombre de usuario sea único
    ]),
    email: schema.string([
      rules.required(),
      rules.email(), // Valida que sea un correo electrónico válido
      rules.unique({ table: 'users', column: 'email' }), // Verifica que el correo sea único
    ]),
  })

  public messages: CustomMessages = {
    // Mensajes personalizados para los campos principales
    'username.required': 'El nombre de usuario es obligatorio',
    'username.minLength': 'El nombre de usuario debe tener al menos 3 caracteres',
    'username.maxLength': 'El nombre de usuario no puede exceder los 255 caracteres',
    'username.unique': 'El nombre de usuario ya está en uso',
    'email.required': 'El correo electrónico es obligatorio',
    'email.email': 'El correo electrónico debe ser válido',
    'email.unique': 'El correo electrónico ya está en uso',
  }
}