import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SpareProcedureValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    spare_id: schema.number([
      rules.required(),
      rules.exists({ table: 'spares', column: 'id' })
    ]),
    
    maintenance_procedure_id: schema.number([
      rules.required(),
      rules.exists({ table: 'maintenance_procedures', column: 'id' })
    ])
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'spare_id.required': 'El repuesto es requerido',
    'spare_id.exists': 'El repuesto seleccionado no existe',
    
    'maintenance_procedure_id.required': 'El procedimiento de mantenimiento es requerido',
    'maintenance_procedure_id.exists': 'El procedimiento de mantenimiento seleccionado no existe'
  }
}
