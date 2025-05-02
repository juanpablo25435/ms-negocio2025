import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OperatorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    operator_id: schema.number([
      rules.required(),
      rules.unique({ table: 'operators', column: 'operator_id' }), // Verifica que el operador sea único
    ]),
    user_id: schema.number([
      rules.required(),
      rules.exists({ table: 'users', column: 'id' }), // Verifica que el usuario exista
    ])
  })

  public messages: CustomMessages = {
    // Mensajes personalizados para los campos principales
    'name.required': 'El nombre del operador es obligatorio',
    'name.minLength': 'El nombre debe tener al menos 3 caracteres',
    'name.maxLength': 'El nombre no puede exceder los 255 caracteres',
    'operator_id.required': 'El ID del operador es obligatorio',
    'operator_id.unique': 'El ID del operador ya está en uso',
    'user_id.required': 'El ID del usuario es obligatorio',
    'user_id.exists': 'El usuario especificado no existe',

    // Mensajes personalizados para specialties
    'specialties.*.exists': 'La especialidad especificada no existe',

    // Mensajes personalizados para machines
    'machines.*.machine_id.exists': 'La máquina especificada no existe',
    'machines.*.start_time.required': 'La hora de inicio es obligatoria',
    'machines.*.end_time.required': 'La hora de fin es obligatoria',
    'machines.*.end_time.afterField': 'La hora de fin debe ser posterior a la hora de inicio',
  }
}