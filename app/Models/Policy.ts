import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Policy extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public policy_number: number

  @column.date()
  public start_date: DateTime

  @column.date()
  public end_date: DateTime

  @column()
  public machine_id: number

  @column()
  public insurance_id: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
