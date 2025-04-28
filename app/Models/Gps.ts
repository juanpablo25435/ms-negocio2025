import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Gps extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public latitude: string

  @column()
  public longitude: string

  @column()
  public altitude: string

  @column()
  public machine_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
