import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Novelty from './Novelty'

export default class Shift extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public start_time: DateTime

  @column()
  public end_time: DateTime

  @column()
  public machine_id: number

  @column()
  public operator_id: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Novelty, {
    foreignKey: 'shift_id',
  })
  public novelties: HasMany<typeof Novelty>
}
