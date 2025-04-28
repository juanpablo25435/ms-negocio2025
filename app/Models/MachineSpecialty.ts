import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MachineSpecialty extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public machine_id: number

  @column()
  public service_type_id: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
