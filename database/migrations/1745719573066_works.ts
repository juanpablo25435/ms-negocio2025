import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'works'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable().unique()
      table.string('location').notNullable()
      table.date('start_date').notNullable()
      table.date('end_date').notNullable()
      table.integer('work_municipality_id').unsigned().references('id').inTable('works_municipalities').onDelete('CASCADE')
      table.integer('combo_id').unsigned().references('id').inTable('combos').onDelete('CASCADE')
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
