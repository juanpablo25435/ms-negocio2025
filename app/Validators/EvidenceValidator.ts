import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EvidenceValidator {
  constructor(protected ctx: HttpContextContract) {}

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

  public messages: CustomMessages = {
    'evidence_description.required': 'La descripción de la evidencia es requerida',
    'evidence_description.minLength': 'La descripción debe tener al menos 10 caracteres',
    'evidence_description.maxLength': 'La descripción no puede exceder los 1000 caracteres',
    
    'service_id.required': 'El servicio asociado es requerido',
    'service_id.exists': 'El servicio seleccionado no existe'
  }
}
