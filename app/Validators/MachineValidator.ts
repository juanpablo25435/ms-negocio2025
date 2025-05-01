import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MachineValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    // Campos principales del modelo Machine
    name: schema.string([
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    description: schema.string.optional([
      rules.maxLength(500),
    ]),
    model_year: schema.string([
      rules.required(),
      rules.regex(/^\d{4}$/), // Valida que sea un año de 4 dígitos
    ]),

    // Relación con combos
    combos: schema.array().members(
      schema.number([
        rules.exists({ table: 'combos', column: 'id' }), // Verifica que los combos existan
      ])
    ),

    // Relación con insurances
    insurances: schema.array().members(
      schema.object().members({
        insurance_id: schema.number([
          rules.exists({ table: 'insurances', column: 'id' }), // Verifica que el seguro exista
        ]),
        policy_number: schema.string([
          rules.required(),
          rules.maxLength(255),
        ]),
        start_date: schema.date({format: 'yyyy-MM-dd'},[
          rules.required(),
        ]),
        end_date: schema.date({ format: 'yyyy-MM-dd' }, [
          rules.required(),
          rules.afterField('start_date'), // Valida que la fecha de fin sea posterior a la de inicio
        ]),
      })
    ),

    // Relación con serviceTypes
    serviceTypes: schema.array().members(
      schema.number([
        rules.exists({ table: 'service_types', column: 'id' }), // Verifica que el tipo de servicio exista
      ])
    ),

    // Relación con operators
    operators: schema.array().members(
      schema.object().members({
        operator_id: schema.number([
          rules.exists({ table: 'operators', column: 'id' }), // Verifica que el operador exista
        ]),
        start_time: schema.date(),
        end_time: schema.date(),
      })
    ),
  })

  public messages: CustomMessages = {
    // Mensajes personalizados para los campos principales
    'name.required': 'El nombre de la máquina es obligatorio',
    'name.minLength': 'El nombre debe tener al menos 3 caracteres',
    'name.maxLength': 'El nombre no puede exceder los 255 caracteres',
    'model_year.required': 'El año del modelo es obligatorio',
    'model_year.regex': 'El año del modelo debe ser un año válido de 4 dígitos',

    // Mensajes personalizados para las relaciones
    'combos.*.exists': 'El combo seleccionado no existe',
    'insurances.*.insurance_id.exists': 'El seguro seleccionado no existe',
    'insurances.*.policy_number.required': 'El número de póliza es obligatorio',
    'insurances.*.start_date.required': 'La fecha de inicio es obligatoria',
    'insurances.*.end_date.required': 'La fecha de fin es obligatoria',
    'insurances.*.end_date.afterField': 'La fecha de fin debe ser posterior a la fecha de inicio',
    'serviceTypes.*.exists': 'El tipo de servicio seleccionado no existe',
    'operators.*.operator_id.exists': 'El operador seleccionado no existe',
  }
}