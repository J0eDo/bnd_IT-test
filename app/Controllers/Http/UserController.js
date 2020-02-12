'use strict'
const { validate } = use('Validator')
const User = use('App/Models/User')
const Profile = use('App/Models/Profile')


class UserController {
  async registration({ request, auth, response }) {
    const { email, username, password } = request.all()
    const rules = {
      email: 'unique:users|required|string|email',
      username: 'unique:users|required|string|min:5',
      password: 'required|string|min:6'
    }

    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      console.log(validation.messages());
      
      return validation.messages()
    }

    let user = new User()
    user.email = email
    user.username = username
    user.password = password
    await user.save();
    await user.profile().save(await new Profile())

    let accessToken = await auth.generate(user)
    return response.json({ accessToken })
  }

  async login({ request, auth }) {
    const { email, password } = request.all()
    return auth.attempt(email, password)
  }

  async  getUser({ response, auth }){
    const user = await auth.getUser()
    const userData = {
      name:user.username,
      access:user.success
    }
    response.json({userData})
  }

  async test({ response }) {
    return "GOOD"
  }
}

module.exports = UserController
