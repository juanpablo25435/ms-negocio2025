import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import MaintenanceProcedure from './MaintenanceProcedure'

export default class Spare extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public price: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => MaintenanceProcedure, {
      pivotTable: 'spare_procedures',
      pivotForeignKey: 'spare_id',
      pivotRelatedForeignKey: 'maintenance_procedure_id',
    })
    public maintenances: ManyToMany<typeof MaintenanceProcedure>
}
