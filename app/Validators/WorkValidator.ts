import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class WorkValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    location: schema.string([
      rules.required(),
      rules.maxLength(500),
    ]),
    combo_id: schema.number([
      rules.required(),
      rules.exists({ table: 'combos', column: 'id' }), // Verifica que el combo exista
    ])
  })

  public messages: CustomMessages = {
    // Mensajes personalizados para los campos principales
    'name.required': 'El nombre de la obra es obligatorio',
    'name.minLength': 'El nombre debe tener al menos 3 caracteres',
    'name.maxLength': 'El nombre no puede exceder los 255 caracteres',
    'location.required': 'La ubicación de la obra es obligatoria',
    'location.maxLength': 'La ubicación no puede exceder los 500 caracteres',
    'combo_id.required': 'El ID del combo es obligatorio',
    'combo_id.exists': 'El combo especificado no existe'
  }
}