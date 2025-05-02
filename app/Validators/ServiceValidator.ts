import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServiceValidator {
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
    price: schema.number([
      rules.required(),
      rules.unsigned(), // El precio debe ser positivo
    ])
  })

  public messages: CustomMessages = {
    // Mensajes personalizados para los campos principales
    'name.required': 'El nombre del servicio es obligatorio',
    'name.minLength': 'El nombre debe tener al menos 3 caracteres',
    'name.maxLength': 'El nombre no puede exceder los 255 caracteres',
    'description.maxLength': 'La descripción no puede exceder los 500 caracteres',
    'start_date.required': 'La fecha de inicio es obligatoria',
    'start_date.format': 'La fecha de inicio debe estar en el formato yyyy-MM-dd',
    'end_date.required': 'La fecha de fin es obligatoria',
    'end_date.format': 'La fecha de fin debe estar en el formato yyyy-MM-dd',
    'end_date.afterField': 'La fecha de fin debe ser posterior a la fecha de inicio',
    'price.required': 'El precio del servicio es obligatorio',
    'price.unsigned': 'El precio debe ser un número positivo'
  }
}