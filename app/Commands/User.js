'use strict'

const { Command } = require('@adonisjs/ace')
const Users = use('App/Models/User')

class User extends Command {
  static get signature() {
    return `
    user:
    { id : Name of the user to greet }
    { --ban : baned user}
    { --admin : get admin rights}
    { --normal : get admin rights}
  `
  }

  static get description() {
    return `awesome: "user: id -flag. 
            "ban"- baned(0 level)
            "normal"- make normal success(1 level) 
            "admin"- make administrator success(2 level)`
  }

  async handle(args, options) {
    let user = await Users.find(args.id)
    if (user) {
      if (options.ban) {
        user.success = 0
        await user.save()
        console.log(`User with id ${user.id} is BANED!`);
      }
      else if (options.normal) {
        user.success = 1
        await user.save()
        console.log(`User with id ${user.id} is get NORMAL RIGHTS!`);
      } else if (options.admin) {
        user.success = 2
        await user.save()
        console.log(`User with id ${user.id} is get ADMINISTRATED RIGHTS!`);
      } else {
        console.log(`User with id ${user.id} has in Base!
        email:${user.email};
        username:${user.username}`);
      }
    } else {
      console.log(`User with id:${user.id} NOT FOUND`);
    }
  }
}

module.exports = User
