import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, HasOne, hasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Gps from './Gps'
import Combo from './Combo'
import Insurance from './Insurance'
import Maintenance from './Maintenance'
import ServiceType from './ServiceType'
import Operator from './Operator'

export default class Machine extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public model_year: string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Gps, {
    foreignKey: 'machine_id',
  })
  public gps: HasOne<typeof Gps>

  @hasMany(() => Maintenance, {
    foreignKey: 'machine_id',
  })
  public maintenances: HasMany<typeof Maintenance>

  @manyToMany(() => Combo, {
    pivotTable: 'combos_machines',
    pivotForeignKey: 'machine_id',
    pivotRelatedForeignKey: 'combo_id',
  })
  public combos: ManyToMany<typeof Combo>

  @manyToMany(() => Insurance, {
    pivotTable: 'policies',
    pivotForeignKey: 'machine_id',
    pivotRelatedForeignKey: 'insurance_id',
    pivotColumns: ['policy_number', 'start_date', 'end_date'],
  })
  public insurances: ManyToMany<typeof Insurance>

  @manyToMany(() => ServiceType, {
    pivotTable: 'machines_specialties',
    pivotForeignKey: 'machine_id',
    pivotRelatedForeignKey: 'service_type_id',
  })
  public serviceTypes: ManyToMany<typeof ServiceType>

  @manyToMany(() => Operator, {
    pivotTable: 'shifts',
    pivotForeignKey: 'machine_id',
    pivotRelatedForeignKey: 'operator_id',
    pivotColumns: ['start_time', 'end_time'],
  })
  public operators: ManyToMany<typeof Operator>
}
