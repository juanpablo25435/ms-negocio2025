import { DateTime } from "luxon";
import { BaseModel, column, hasOne, HasOne } from "@ioc:Adonis/Lucid/Orm";
import Invoice from "./Invoice";

export default class Fee extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public fee_number: number;

  @column.date()
  public fee_date: DateTime;

  @column()
  public fee_amount: number;

  @column()
  public service_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasOne(() => Invoice, { foreignKey: "fee_id" })
  public invoice: HasOne<typeof Invoice>;
}
