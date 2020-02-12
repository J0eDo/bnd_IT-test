'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Ban {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request,auth }, next) {
    const user = await auth.getUser()
    if(user.success){
      await next()
    }else{
      response.status(400).send('Sorry!User placed in banlist')
    }
  }
}

module.exports = Ban
