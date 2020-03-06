'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TheTask extends Model {
    test() { 
        return this.hasOne('App/Models/Test') 
    }
}

module.exports = TheTask
