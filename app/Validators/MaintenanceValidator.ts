import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MaintenanceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    description: schema.string([
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    date_performed: schema.date({
      format: 'yyyy-MM-dd',
    }, [
      rules.required(),
    ]),
    machine_id: schema.number([
      rules.required(),
      rules.exists({ table: 'machines', column: 'id' }), // Verifica que la máquina exista
    ]),

    // Relación con procedimientos (opcional)
    procedures: schema.array().members(
      schema.number([
        rules.exists({ table: 'procedures', column: 'id' }), // Verifica que el procedimiento exista
      ])
    ),
  })

  public messages: CustomMessages = {
    // Mensajes personalizados para los campos principales
    'description.required': 'La descripción del mantenimiento es obligatoria',
    'description.minLength': 'La descripción debe tener al menos 3 caracteres',
    'description.maxLength': 'La descripción no puede exceder los 255 caracteres',
    'date_performed.required': 'La fecha de realización es obligatoria',
    'date_performed.format': 'La fecha de realización debe estar en el formato yyyy-MM-dd',
    'machine_id.required': 'El ID de la máquina es obligatorio',
    'machine_id.exists': 'La máquina especificada no existe',

    // Mensajes personalizados para los procedimientos
    'procedures.*.exists': 'El procedimiento especificado no existe',
  }
}