import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MunicipalityValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    department_id: schema.number([
      rules.required(),
      rules.exists({ table: 'departments', column: 'id' }), // Verifica que el departamento exista
    ]),

    // Relación con trabajos (opcional)
    works: schema.array().members(
      schema.number([
        rules.exists({ table: 'works', column: 'id' }), // Verifica que el trabajo exista
      ])
    ),
  })

  public messages: CustomMessages = {
    // Mensajes personalizados para los campos principales
    'name.required': 'El nombre del municipio es obligatorio',
    'name.minLength': 'El nombre debe tener al menos 3 caracteres',
    'name.maxLength': 'El nombre no puede exceder los 255 caracteres',
    'department_id.required': 'El ID del departamento es obligatorio',
    'department_id.exists': 'El departamento especificado no existe',

    // Mensajes personalizados para los trabajos
    'works.*.exists': 'El trabajo especificado no existe',
  }
}