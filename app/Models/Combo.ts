import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Work from './Work'
import Machine from './Machine'

export default class Combo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public price: number

  @column()
  public services_id: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Work, {
    foreignKey: 'combo_id',
  })
  public works: HasMany<typeof Work>

  @manyToMany(() => Machine, {
    pivotTable: 'combos_machines',
    pivotForeignKey: 'combo_id',
    pivotRelatedForeignKey: 'machine_id',
  })
  public machines: ManyToMany<typeof Machine>
}
