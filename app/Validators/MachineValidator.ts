import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MachineValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    // Campos principales del modelo Machine
    name: schema.string([
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    description: schema.string.optional([
      rules.maxLength(500),
    ]),
    model_year: schema.string([
      rules.required(),
      rules.regex(/^\d{4}$/), // Valida que sea un año de 4 dígitos
    ])
  })

  public messages: CustomMessages = {
    // Mensajes personalizados para los campos principales
    'name.required': 'El nombre de la máquina es obligatorio',
    'name.minLength': 'El nombre debe tener al menos 3 caracteres',
    'name.maxLength': 'El nombre no puede exceder los 255 caracteres',
    'model_year.required': 'El año del modelo es obligatorio',
    'model_year.regex': 'El año del modelo debe ser un año válido de 4 dígitos',
  }
}