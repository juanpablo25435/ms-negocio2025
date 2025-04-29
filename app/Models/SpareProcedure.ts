import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SpareProcedure extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public spare_id: number

  @column()
  public maintenance_procedure_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
