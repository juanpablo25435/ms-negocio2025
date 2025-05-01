import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GpsValidator {
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
    latitude: schema.string({ trim: true }, [
      rules.required(),
      rules.regex(/^-?([1-8]?[0-9]\.\d+|90\.0+)$/), // Validación de latitud (-90 a 90)
      rules.maxLength(20)
    ]),
    
    longitude: schema.string({ trim: true }, [
      rules.required(),
      rules.regex(/^-?((1[0-7]|[1-9])?\d\.\d+|180\.0+)$/), // Validación de longitud (-180 a 180)
      rules.maxLength(20)
    ]),
    
    altitude: schema.string({ trim: true }, [
      rules.regex(/^-?\d+\.?\d*$/), // Número con decimales opcional
      rules.maxLength(15)
    ]),
    
    machine_id: schema.number([
      rules.required(),
      rules.exists({ table: 'machines', column: 'id' })
    ])
  })

  public messages: CustomMessages = {
    'latitude.required': 'La latitud es requerida',
    'latitude.regex': 'La latitud debe ser un valor entre -90 y 90 grados',
    'latitude.maxLength': 'La latitud no puede exceder los 20 caracteres',
    
    'longitude.required': 'La longitud es requerida',
    'longitude.regex': 'La longitud debe ser un valor entre -180 y 180 grados',
    'longitude.maxLength': 'La longitud no puede exceder los 20 caracteres',
    
    'altitude.regex': 'La altitud debe ser un valor numérico',
    'altitude.maxLength': 'La altitud no puede exceder los 15 caracteres',
    
    'machine_id.required': 'La máquina asociada es requerida',
    'machine_id.exists': 'La máquina seleccionada no existe'
  }
}
