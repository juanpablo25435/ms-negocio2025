import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EvidenceValidator {
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
    evidence_description: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(10),
      rules.maxLength(1000)
    ]),
    
    service_id: schema.number([
      rules.required(),
      rules.exists({ table: 'services', column: 'id' })
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
    'evidence_description.required': 'La descripción de la evidencia es requerida',
    'evidence_description.minLength': 'La descripción debe tener al menos 10 caracteres',
    'evidence_description.maxLength': 'La descripción no puede exceder los 1000 caracteres',
    
    'service_id.required': 'El servicio asociado es requerido',
    'service_id.exists': 'El servicio seleccionado no existe'
  }
}
