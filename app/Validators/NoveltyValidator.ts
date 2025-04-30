import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NoveltyValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    novelty_description: schema.string([
      rules.required(),
      rules.minLength(3),
      rules.maxLength(500),
    ]),
    shift_id: schema.number([
      rules.required(),
      rules.exists({ table: 'shifts', column: 'id' }), // Verifica que el turno exista
    ]),
  })

  public messages: CustomMessages = {
    // Mensajes personalizados para los campos principales
    'novelty_description.required': 'La descripción de la novedad es obligatoria',
    'novelty_description.minLength': 'La descripción debe tener al menos 3 caracteres',
    'novelty_description.maxLength': 'La descripción no puede exceder los 500 caracteres',
    'shift_id.required': 'El ID del turno es obligatorio',
    'shift_id.exists': 'El turno especificado no existe',
  }
}