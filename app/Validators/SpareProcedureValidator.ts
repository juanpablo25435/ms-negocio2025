import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SpareProcedureValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    spare_id: schema.number([
      rules.required(),
      rules.exists({ table: 'spares', column: 'id' }), // Verifica que el repuesto exista
    ]),
    maintenance_procedure_id: schema.number([
      rules.required(),
      rules.exists({ table: 'maintenance_procedures', column: 'id' }), // Verifica que el procedimiento de mantenimiento exista
    ]),
  })

  public messages: CustomMessages = {
    // Mensajes personalizados para los campos principales
    'spare_id.required': 'El ID del repuesto es obligatorio',
    'spare_id.exists': 'El repuesto especificado no existe',
    'maintenance_procedure_id.required': 'El ID del procedimiento de mantenimiento es obligatorio',
    'maintenance_procedure_id.exists': 'El procedimiento de mantenimiento especificado no existe',
  }
}