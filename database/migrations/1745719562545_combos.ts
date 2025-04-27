import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'combos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable().unique()
      table.string('description').notNullable()
      table.integer('price').notNullable()
      table.integer('work_id').unsigned().references('id').inTable('works').onDelete('CASCADE')
      table.integer('combos_machines_id').unsigned().references('id').inTable('combos_machines').onDelete('CASCADE')
      table.integer('services_id').unsigned().references('id').inTable('services').onDelete('CASCADE')
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
