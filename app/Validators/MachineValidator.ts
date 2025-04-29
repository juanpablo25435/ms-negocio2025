import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MachineValidator {
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
    name: schema.string.optional({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(255),
      rules.unique({ 
        table: 'machines', 
        column: 'name',
        whereNot: { id: this.ctx.params.id }
      })
    ]),
    
    description: schema.string.optional({ trim: true }, [
      rules.minLength(10),
      rules.maxLength(1000)
    ]),
    
    model_year: schema.string.optional([
      rules.regex(/^\d{4}$/),
      rules.between(1900, new Date().getFullYear() + 1)
    ]),
    
    // Relaciones para actualización
    combo_ids: schema.array.optional().members(
      schema.number([rules.exists({ table: 'combos', column: 'id' })])
    ),
    
    service_type_ids: schema.array.optional().members(
      schema.number([rules.exists({ table: 'service_types', column: 'id' })])
    ),
    
    // Para seguros (incluyendo datos del pivot)
    insurance_ids: schema.array.optional().members(
      schema.object().members({
        insurance_id: schema.number([rules.exists({ table: 'insurances', column: 'id' })]),
        policy_number: schema.string([rules.maxLength(50)]),
        start_date: schema.string([rules.regex(/^\d{4}-\d{2}-\d{2}$/)]),
        end_date: schema.string([rules.regex(/^\d{4}-\d{2}-\d{2}$/)])
      })
    ),
    
    // Para operadores (incluyendo datos del pivot)
    operator_ids: schema.array.optional().members(
      schema.object().members({
        operator_id: schema.number([rules.exists({ table: 'operators', column: 'id' })]),
        start_time: schema.string([rules.regex(/^\d{2}:\d{2}$/)]),
        end_time: schema.string([rules.regex(/^\d{2}:\d{2}$/)])
      })
    )
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
    
  }
}
