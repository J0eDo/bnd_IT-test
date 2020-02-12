'use strict'

class Administrator {

  async handle ({ auth,response }, next) {
    const user = await auth.getUser()
    if(user.success===2){
      await next()
    }else{
      response.status(400).send('Insufficient privileges for this user. Acccess error!')
    }
   
  }
}

module.exports = Administrator
