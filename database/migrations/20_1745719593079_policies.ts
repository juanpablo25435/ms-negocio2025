import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'policies'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('policy_number').notNullable().unique()
      table.date('start_date').notNullable()
      table.date('end_date').notNullable()
      table.integer('machine_id').unsigned().notNullable().references('id').inTable('machines').onDelete('CASCADE')
      table.integer('insurance_id').unsigned().notNullable().references('id').inTable('insurances').onDelete('CASCADE')
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
