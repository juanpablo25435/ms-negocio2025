import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SpareValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
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
    ])
  })

  public messages: CustomMessages = {
    // Mensajes personalizados para los campos principales
    'name.required': 'El nombre del repuesto es obligatorio',
    'name.minLength': 'El nombre debe tener al menos 3 caracteres',
    'name.maxLength': 'El nombre no puede exceder los 255 caracteres',
    'description.maxLength': 'La descripción no puede exceder los 500 caracteres',
    'price.required': 'El precio del repuesto es obligatorio',
    'price.unsigned': 'El precio debe ser un número positivo',

    // Mensajes personalizados para los procedimientos de mantenimiento
    'maintenances.*.exists': 'El procedimiento de mantenimiento especificado no existe',
  }
}