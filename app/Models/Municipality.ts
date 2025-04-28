import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Work from './Work'

export default class Municipality extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public department_id: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Work, {
    pivotTable: 'work_municipalities',
    pivotForeignKey: 'municipality_id',
    pivotRelatedForeignKey: 'work_id',
  })
  public works: ManyToMany<typeof Work>
}
