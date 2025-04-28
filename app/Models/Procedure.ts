import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Maintenance from './Maintenance'

export default class Procedure extends BaseModel {
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

  @manyToMany(() => Maintenance, {
    pivotTable: 'maintenance_procedures',
    pivotForeignKey: 'procedure_id',
    pivotRelatedForeignKey: 'maintenance_id',
  })
  public maintenances: ManyToMany<typeof Maintenance>
}
