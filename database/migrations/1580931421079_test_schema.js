'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TestSchema extends Schema {
  up () {
    this.create('tests', (table) => {
      table.increments()
      table.string('testName').notNullable().unique()
      table.integer('complexity').defaultTo(1)
      table.string('status').defaultTo('not finished')
      table.string('poster')
      table.timestamps()
    })
  }

  down () {
    this.drop('tests')
  }
}

module.exports = TestSchema
