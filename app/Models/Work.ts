import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Municipality from './Municipality'

export default class Work extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public location: string

  @column()
  public combo_id: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Municipality, {
    pivotTable: 'works_municipalities',
    pivotForeignKey: 'work_id',
    pivotRelatedForeignKey: 'municipality_id',
  })
  public municipalities: ManyToMany<typeof Municipality>
}
