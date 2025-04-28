import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'shifts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('start_time').notNullable()
      table.integer('end_time').notNullable()
      table.integer('machine_id').unsigned().notNullable().references('id').inTable('machines').onDelete('CASCADE')
      table.integer('operator_id').unsigned().notNullable().references('id').inTable('operators').onDelete('CASCADE')
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
