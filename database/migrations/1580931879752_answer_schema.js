'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnswerSchema extends Schema {
  up () {
    this.create('answers', (table) => {
      table.increments()
      table.integer('test_id').unsigned().references('tests.id').onDelete('cascade')
      table.string('typeAnswer').notNullable()
      table.string('status').defaultTo('wait approwed')
      table.json('body').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('answers')
  }
}

module.exports = AnswerSchema
