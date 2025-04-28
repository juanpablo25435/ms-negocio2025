import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Specialty from './Specialty'
import Machine from './Machine'

export default class Operator extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public operator_id: number

  @column()
  public user_id: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Specialty, {
    pivotTable: 'operator_specialties',
    pivotForeignKey: 'operator_id',
    pivotRelatedForeignKey: 'specialty_id',
  })
  public specialties: ManyToMany<typeof Specialty>

  @manyToMany(() => Machine, {
    pivotTable: 'shifts',
    pivotForeignKey: 'operator_id',
    pivotRelatedForeignKey: 'machine_id',
    pivotColumns: ['start_time', 'end_time'],
  })
  public machines: ManyToMany<typeof Machine>
}
