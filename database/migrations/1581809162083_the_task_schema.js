'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TheTaskSchema extends Schema {
  up () {
    this.create('the_tasks', (table) => {
      table.increments()
      table.integer('test_id').unsigned().references('tests.id').onDelete('cascade')
      table.string('type').notNullable()
      table.integer('author').unsigned().references('users.id').onDelete('cascade')
      table.json('body').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('the_tasks')
  }
}

module.exports = TheTaskSchema
