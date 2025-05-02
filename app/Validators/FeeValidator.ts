import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FeeValidator {
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
    fee_number: schema.number([
      rules.required(),
      rules.unsigned(),
      rules.unique({ 
        table: 'fees', 
        column: 'fee_number',
        where: { invoice_id: this.ctx.request.input('invoice_id') }
      })
    ]),
    
    fee_date: schema.date({ format: 'yyyy-MM-dd' }, [
      rules.required(),
      rules.beforeOrEqual('today') // La fecha no puede ser futura
    ]),
    
    fee_amount: schema.number([
      rules.required(),
      rules.range(0.01, 9999999.99) // Rango válido
    ]),
    
    invoice_id: schema.number([
      rules.required(),
      rules.exists({ table: 'invoices', column: 'id' })
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
    'fee_number.required': 'El número de cuota es requerido',
    'fee_number.unsigned': 'El número de cuota debe ser positivo',
    'fee_number.unique': 'Este número de cuota ya existe para esta factura',
    
    'fee_date.required': 'La fecha de la cuota es requerida',
    'fee_date.format': 'El formato de la fecha debe ser yyyy-MM-dd',
    'fee_date.beforeOrEqual': 'La fecha no puede ser futura',
    
    'fee_amount.required': 'El monto de la cuota es requerido',
    'fee_amount.range': 'El monto debe estar entre 0.01 y 9,999,999.99',
    
    'invoice_id.required': 'La factura asociada es requerida',
    'invoice_id.exists': 'La factura seleccionada no existe',
    
    'service_id.required': 'El servicio asociado es requerido',
    'service_id.exists': 'El servicio seleccionado no existe'
  }
}
