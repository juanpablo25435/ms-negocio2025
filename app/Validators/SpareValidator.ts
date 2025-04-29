import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SpareValidator {
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
      rules.unique({ table: 'spares', column: 'name' })
    ]),
    
    description: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(10),
      rules.maxLength(1000)
    ]),
    
    price: schema.number([
      rules.required(),
      rules.range(0.01, 999999.99), // Precio entre 0.01 y 999,999.99
      rules.unsigned() // Solo valores positivos
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
    'name.required': 'El nombre del repuesto es requerido',
    'name.minLength': 'El nombre debe tener al menos 3 caracteres',
    'name.maxLength': 'El nombre no puede exceder los 255 caracteres',
    'name.unique': 'Ya existe un repuesto con este nombre',
    
    'description.required': 'La descripción es requerida',
    'description.minLength': 'La descripción debe tener al menos 10 caracteres',
    'description.maxLength': 'La descripción no puede exceder los 1000 caracteres',
    
    'price.required': 'El precio es requerido',
    'price.range': 'El precio debe estar entre 0.01 y 999,999.99',
    'price.unsigned': 'El precio debe ser un valor positivo'
  }
}
