import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'fees'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('fee_number').notNullable().unique()
      table.date('fee_date').notNullable()
      table.integer('total_amount').notNullable()
      table.integer('invoice_id').unsigned().references('id').inTable('invoices').onDelete('CASCADE')
      table.integer('service_id').unsigned().references('id').inTable('services').onDelete('CASCADE')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
