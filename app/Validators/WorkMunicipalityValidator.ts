import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class WorkMunicipalityValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    work_id: schema.number([
      rules.required(),
      rules.exists({ table: 'works', column: 'id' }), // Verifica que la obra exista
    ]),
    municipality_id: schema.number([
      rules.required(),
      rules.exists({ table: 'municipalities', column: 'id' }), // Verifica que el municipio exista
    ]),
  })

  public messages: CustomMessages = {
    // Mensajes personalizados para los campos principales
    'work_id.required': 'El ID de la obra es obligatorio',
    'work_id.exists': 'La obra especificada no existe',
    'municipality_id.required': 'El ID del municipio es obligatorio',
    'municipality_id.exists': 'El municipio especificado no existe',
  }
}