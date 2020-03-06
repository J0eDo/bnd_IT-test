'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Test extends Model {
    tasks() {
        return this.hasMany('App/Models/TheTask')
    }
}

module.exports = Test
