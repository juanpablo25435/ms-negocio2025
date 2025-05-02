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
  }
}