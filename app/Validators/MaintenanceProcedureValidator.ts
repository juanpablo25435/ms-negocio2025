import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MaintenanceProcedureValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    procedure_id: schema.number([
      rules.required(),
      rules.exists({ table: 'procedures', column: 'id' }), // Verifica que el procedimiento exista
    ]),
    maintenance_id: schema.number([
      rules.required(),
      rules.exists({ table: 'maintenances', column: 'id' }), // Verifica que el mantenimiento exista
    ]),

    // Relación con spares (opcional)
    spares: schema.array.optional().members(
      schema.number([
        rules.exists({ table: 'spares', column: 'id' }), // Verifica que el repuesto exista
      ])
    ),
  })

  public messages: CustomMessages = {
    // Mensajes personalizados para los campos principales
    'procedure_id.required': 'El ID del procedimiento es obligatorio',
    'procedure_id.exists': 'El procedimiento especificado no existe',
    'maintenance_id.required': 'El ID del mantenimiento es obligatorio',
    'maintenance_id.exists': 'El mantenimiento especificado no existe',

    // Mensajes personalizados para los repuestos
    'spares.*.exists': 'El repuesto especificado no existe',
  }
}