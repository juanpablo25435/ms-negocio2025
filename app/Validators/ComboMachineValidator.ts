import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ComboMachineValidator {
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
    machine_id: schema.number([
      rules.required(),
      rules.exists({ table: 'machines', column: 'id' })
    ]),
    combo_id: schema.number([
      rules.required(),
      rules.exists({ table: 'combos', column: 'id' })
    ])
  })

  public messages: CustomMessages = {
    'machine_id.required': 'La máquina es requerida',
    'machine_id.exists': 'La máquina seleccionada no existe',
    'combo_id.required': 'El combo es requerido',
    'combo_id.exists': 'El combo seleccionado no existe'
  }
}
