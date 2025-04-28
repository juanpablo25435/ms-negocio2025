import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Combo from './Combo'
import Evidence from './Evidence'
import Fee from './Fee'

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column.date()
  public start_date: DateTime

  @column.date()
  public end_date: DateTime

  @column()
  public price: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Combo, {
    foreignKey: 'service_id',
  })
  public combo: HasOne<typeof Combo>

  @hasMany(() => Evidence, {
    foreignKey: 'service_id',
  })
  public evidences: HasMany<typeof Evidence>

  @hasMany(() => Fee, {
    foreignKey: 'service_id',
  })
  public fees: HasMany<typeof Fee>
}
