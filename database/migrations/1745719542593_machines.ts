import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'machines'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable().unique()
      table.integer('specialty_id').unsigned().references('id').inTable('specialties').onDelete('CASCADE')
      table.string('model_year').notNullable()
      table.integer('gps_id').unsigned().references('id').inTable('gps').onDelete('CASCADE')
      table.integer('combos_machines_id').unsigned().references('id').inTable('combos_machines').onDelete('CASCADE')
      table.integer('policy_id').unsigned().references('id').inTable('policies').onDelete('CASCADE')
      table.integer('shift_id').unsigned().references('id').inTable('shifts').onDelete('CASCADE')
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
