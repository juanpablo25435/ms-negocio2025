import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PolicyValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    policy_number: schema.number([
      rules.required(),
      rules.unique({ table: 'policies', column: 'policy_number' }), // Verifica que el número de póliza sea único
    ]),
    start_date: schema.date({
      format: 'yyyy-MM-dd',
    }, [
      rules.required(),
    ]),
    end_date: schema.date({
      format: 'yyyy-MM-dd',
    }, [
      rules.required(),
      rules.afterField('start_date'), // Valida que la fecha de fin sea posterior a la de inicio
    ]),
    machine_id: schema.number([
      rules.required(),
      rules.exists({ table: 'machines', column: 'id' }), // Verifica que la máquina exista
    ]),
    insurance_id: schema.number([
      rules.required(),
      rules.exists({ table: 'insurances', column: 'id' }), // Verifica que el seguro exista
    ]),
  })

  public messages: CustomMessages = {
    // Mensajes personalizados para los campos principales
    'policy_number.required': 'El número de póliza es obligatorio',
    'policy_number.unique': 'El número de póliza ya está en uso',
    'start_date.required': 'La fecha de inicio es obligatoria',
    'start_date.format': 'La fecha de inicio debe estar en el formato yyyy-MM-dd',
    'end_date.required': 'La fecha de fin es obligatoria',
    'end_date.format': 'La fecha de fin debe estar en el formato yyyy-MM-dd',
    'end_date.afterField': 'La fecha de fin debe ser posterior a la fecha de inicio',
    'machine_id.required': 'El ID de la máquina es obligatorio',
    'machine_id.exists': 'La máquina especificada no existe',
    'insurance_id.required': 'El ID del seguro es obligatorio',
    'insurance_id.exists': 'El seguro especificado no existe',
  }
}