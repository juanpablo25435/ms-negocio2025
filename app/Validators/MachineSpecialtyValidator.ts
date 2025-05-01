import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MachineSpecialtyValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    machine_id: schema.number([
      rules.required(),
      rules.exists({ table: 'machines', column: 'id' }), // Verifica que la máquina exista
    ]),
    service_type_id: schema.number([
      rules.required(),
      rules.exists({ table: 'service_types', column: 'id' }), // Verifica que el tipo de servicio exista
    ]),
  })

  public messages: CustomMessages = {
    'machine_id.required': 'El ID de la máquina es obligatorio',
    'machine_id.exists': 'La máquina especificada no existe',
    'service_type_id.required': 'El ID del tipo de servicio es obligatorio',
    'service_type_id.exists': 'El tipo de servicio especificado no existe',
  }
}