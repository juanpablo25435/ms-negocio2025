import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Machine from './Machine'

export default class Insurance extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public insurance_entity: string

  @column()
  public insurance_number: string
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Machine, {
    pivotTable: 'policies',
    pivotForeignKey: 'insurance_id',
    pivotRelatedForeignKey: 'machine_id',
    pivotColumns: ['policy_number', 'start_date', 'end_date'],
  })
  public machines: ManyToMany<typeof Machine>
}
