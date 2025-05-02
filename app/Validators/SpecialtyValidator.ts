import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SpecialtyValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    description: schema.string([
      rules.required(),
      rules.minLength(3),
      rules.maxLength(500),
    ]),

  })

  public messages: CustomMessages = {
    // Mensajes personalizados para los campos principales
    'name.required': 'El nombre de la especialidad es obligatorio',
    'name.minLength': 'El nombre debe tener al menos 3 caracteres',
    'name.maxLength': 'El nombre no puede exceder los 255 caracteres',
    'description.required': 'La descripción es obligatoria',
    'description.minLength': 'La descripción debe tener al menos 3 caracteres',
    'description.maxLength': 'La descripción no puede exceder los 500 caracteres'
  }
}