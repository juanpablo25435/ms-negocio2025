import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Spare from './Spare'

export default class MaintenanceProcedure extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public procedure_id: number

  @column()
  public maintenance_id: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Spare, {
        pivotTable: 'spare_procedures',
        pivotForeignKey: 'maintenance_procedure_id',
        pivotRelatedForeignKey: 'spare_id',
      })
      public maintenances: ManyToMany<typeof Spare>

}
