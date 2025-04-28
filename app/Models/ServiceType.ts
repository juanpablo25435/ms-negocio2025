import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Machine from './Machine'

export default class ServiceType extends BaseModel {
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

  @manyToMany(() => Machine, {
    pivotTable: 'machine_specialties',
    pivotForeignKey: 'service_type_id',
    pivotRelatedForeignKey: 'machine_id',
  })
  public machines: ManyToMany<typeof Machine>
}
