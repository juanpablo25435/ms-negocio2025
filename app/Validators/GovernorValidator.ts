import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GovernorValidator {
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
    name: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
      rules.unique({ 
        table: 'governors', 
        column: 'name',
        caseInsensitive: true
      })
    ]),
    
    department_id: schema.number([
      rules.required(),
      rules.exists({ table: 'departments', column: 'id' })
    ]),
    
    user_id: schema.number([
      rules.required(),
      rules.exists({ table: 'users', column: 'id' }),
      rules.unique({ table: 'governors', column: 'user_id' })
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
    'name.required': 'El nombre del gobernador es requerido',
    'name.minLength': 'El nombre debe tener al menos 3 caracteres',
    'name.maxLength': 'El nombre no puede exceder los 255 caracteres',
    'name.unique': 'Ya existe un gobernador con este nombre',
    
    'department_id.required': 'El departamento es requerido',
    'department_id.exists': 'El departamento seleccionado no existe',
    
    'user_id.required': 'El usuario asociado es requerido',
    'user_id.exists': 'El usuario seleccionado no existe',
    'user_id.unique': 'Este usuario ya está asignado a otro gobernador'
  }
}
