import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Operator from './Operator'

export default class Specialty extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Operator, {
    pivotTable: 'operator_specialties',
    pivotForeignKey: 'specialty_id',
    pivotRelatedForeignKey: 'operator_id',
  })
  public operators: ManyToMany<typeof Operator>
}
