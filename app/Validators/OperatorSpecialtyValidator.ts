import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OperatorSpecialtyValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    operator_id: schema.number([
      rules.required(),
      rules.exists({ table: 'operators', column: 'id' }), // Verifica que el operador exista
    ]),
    specialty_id: schema.number([
      rules.required(),
      rules.exists({ table: 'specialties', column: 'id' }), // Verifica que la especialidad exista
    ]),
  })

  public messages: CustomMessages = {
    // Mensajes personalizados para los campos principales
    'operator_id.required': 'El ID del operador es obligatorio',
    'operator_id.exists': 'El operador especificado no existe',
    'specialty_id.required': 'El ID de la especialidad es obligatorio',
    'specialty_id.exists': 'La especialidad especificada no existe',
  }
}