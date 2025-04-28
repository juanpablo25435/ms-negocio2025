import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Governor from './Governor'
import Municipality from './Municipality'

export default class Department extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Governor, {
    foreignKey: 'department_id',
  })
  public governor: HasOne<typeof Governor>

  @hasMany(() => Municipality, {
    foreignKey: 'department_id',
  })
  public municipalities: HasMany<typeof Municipality>
}
