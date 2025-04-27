import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'services'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable().unique()
      table.string('description').notNullable()
      table.integer('price').notNullable()
      table.integer('fee_id').unsigned().references('id').inTable('fees').onDelete('CASCADE')
      table.integer('combo_id').unsigned().references('id').inTable('combos').onDelete('CASCADE')
      table.integer('evidence_id').unsigned().references('id').inTable('evidences').onDelete('CASCADE')
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
