import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ComboValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    // Campos principales del modelo Combo
    name: schema.string([
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    description: schema.string.optional([
      rules.maxLength(500),
    ]),
    price: schema.number([
      rules.required(),
      rules.unsigned(), // El precio debe ser positivo
    ]),
    services_id: schema.number([
      rules.required(),
      rules.exists({ table: 'services', column: 'id' }), // Verifica que el servicio exista
    ])
  })

  public messages: CustomMessages = {
    // Mensajes personalizados para los campos principales
    'name.required': 'El nombre del combo es obligatorio',
    'name.minLength': 'El nombre debe tener al menos 3 caracteres',
    'name.maxLength': 'El nombre no puede exceder los 255 caracteres',
    'description.maxLength': 'La descripción no puede exceder los 500 caracteres',
    'price.required': 'El precio del combo es obligatorio',
    'price.unsigned': 'El precio debe ser un número positivo',
    'services_id.required': 'El ID del servicio es obligatorio',
    'services_id.exists': 'El servicio especificado no existe',
  }
}