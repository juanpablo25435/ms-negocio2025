import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ShiftValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    start_time: schema.number([
      rules.required(),
      rules.unsigned(), // Asegura que sea un número positivo
    ]),
    end_time: schema.number([
      rules.required(),
      rules.unsigned(),
    ]),
    machine_id: schema.number([
      rules.required(),
      rules.exists({ table: 'machines', column: 'id' }), // Verifica que la máquina exista
    ]),
    operator_id: schema.number([
      rules.required(),
      rules.exists({ table: 'operators', column: 'id' }), // Verifica que el operador exista
    ]),

    // Relación con novelties (opcional)
    novelties: schema.array.optional().members(
      schema.number([
        rules.exists({ table: 'novelties', column: 'id' }), // Verifica que la novedad exista
      ])
    ),
  })

  public messages: CustomMessages = {
    // Mensajes personalizados para los campos principales
    'start_time.required': 'La hora de inicio es obligatoria',
    'start_time.unsigned': 'La hora de inicio debe ser un número positivo',
    'end_time.required': 'La hora de fin es obligatoria',
    'end_time.unsigned': 'La hora de fin debe ser un número positivo',
    'machine_id.required': 'El ID de la máquina es obligatorio',
    'machine_id.exists': 'La máquina especificada no existe',
    'operator_id.required': 'El ID del operador es obligatorio',
    'operator_id.exists': 'El operador especificado no existe',

    // Mensajes personalizados para las novedades
    'novelties.*.exists': 'La novedad especificada no existe',
  }
}
