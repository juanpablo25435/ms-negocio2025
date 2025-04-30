import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class InsuranceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    // Campos principales del modelo Insurance
    name: schema.string([
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    insurance_entity: schema.string([
      rules.required(),
      rules.maxLength(255),
    ]),
    insurance_number: schema.string([
      rules.required(),
      rules.maxLength(50),
    ]),

    // Relación con máquinas (opcional)
    machines: schema.array().members(
      schema.object().members({
        machine_id: schema.number([
          rules.exists({ table: 'machines', column: 'id' }), // Verifica que la máquina exista
        ]),
        policy_number: schema.string([
          rules.required(),
          rules.maxLength(255),
        ]),
        start_date: schema.date({format: 'yyyy-MM-dd'},[
          rules.required(),
        ]),
        end_date: schema.date({format: 'yyyy-MM-dd'},[
          rules.required(),
          rules.afterField('start_date'), // Valida que la fecha de fin sea posterior a la de inicio
        ]),
      })
    ),
  })

  public messages: CustomMessages = {
    // Mensajes personalizados para los campos principales
    'name.required': 'El nombre del seguro es obligatorio',
    'name.minLength': 'El nombre debe tener al menos 3 caracteres',
    'name.maxLength': 'El nombre no puede exceder los 255 caracteres',
    'insurance_entity.required': 'La entidad aseguradora es obligatoria',
    'insurance_entity.maxLength': 'La entidad aseguradora no puede exceder los 255 caracteres',
    'insurance_number.required': 'El número del seguro es obligatorio',
    'insurance_number.maxLength': 'El número del seguro no puede exceder los 50 caracteres',

    // Mensajes personalizados para las máquinas
    'machines.*.machine_id.exists': 'La máquina especificada no existe',
    'machines.*.policy_number.required': 'El número de póliza es obligatorio',
    'machines.*.policy_number.maxLength': 'El número de póliza no puede exceder los 255 caracteres',
    'machines.*.start_date.required': 'La fecha de inicio es obligatoria',
    'machines.*.end_date.required': 'La fecha de fin es obligatoria',
    'machines.*.end_date.afterField': 'La fecha de fin debe ser posterior a la fecha de inicio',
  }
}