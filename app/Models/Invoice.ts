import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Fee from './Fee'

export default class Invoice extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public invoice_number: string

  @column.date()
  public invoice_date: DateTime

  @column()
  public total_amount: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Fee, {
    foreignKey: 'invoice_id',
  })
  public fee: HasOne<typeof Fee>
}
