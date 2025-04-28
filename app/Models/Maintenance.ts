import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Procedure from './Procedure'

export default class Maintenance extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

  @column()
  public date_performed: string

  @column()
  public machine_id: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Procedure, {
    pivotTable: 'maintenance_procedures',
    pivotForeignKey: 'maintenance_id',
    pivotRelatedForeignKey: 'procedure_id',
  })
  public procedures: ManyToMany<typeof Procedure>
}
