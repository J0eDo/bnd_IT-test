'use strict'

//Models
const User = use('App/Models/User')
const Profile = use('App/Models/Profile')
//Libarys
const Drive = use('Drive')
const Helpers = use('Helpers')
const { validate } = use('Validator')

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

  async  getUser({ response, auth }) {
    const user = await auth.getUser()
    const userData = {
      name: user.username,
      access: user.success
    }
    response.json({ userData })
  }

  async changeSuccess({ request, response }) {
    const { id } = request.all()
    let user = await User.find(id)
    if (user.success === 1) {
      user.success = 0
      await user.save()
      const message = {
        severity: 'info',
        title: `user ID:${id} baned`
      }
      return response.json({ payload: { value: 'baned', column: 'success' }, message })
    } else if (user.success === 0) {
      user.success = 1
      await user.save()
      const message = {
        severity: 'info',
        title: `user ID:${id} unbaned`
      }
      return response.json({ payload: { value: 'user', column: 'success' }, message })
    } else {
      const message = {
        severity: 'warning',
        title: "not enough rights"
      }
      return response.json({ message })
    }
  }

  async removeByID({ request, response }) {
    const { id } = request.all()
    let user = await User.find(id)
    if (user.success < 2) {
      await user.delete()
      const message = {
        severity: 'success',
        title: `user ID:${id} deleted`
      }
      return response.json({ message })
    } else {
      const message = {
        severity: 'warning',
        title: `not enough rights`
      }
      return response.json({ message })
    }
  }

  async profile({ auth, response }) {
    const user = await auth.getUser()
    const localUrl = Helpers.tmpPath(`/avatar/${user.username}.jpg`)
    const exists = await Drive.exists(localUrl)
    if (exists) {
      const file = await Drive.get(localUrl, 'base64')
      return response.json({ file, user })
    } else {
      return response.json({ user })
    }
  }
  async reworkToken({ request, view, response, auth }) {
    const { newPassword, oldPassword } = request.all()
    const user = await auth.getUser()
    await auth.attempt(user.email,oldPassword)
    const password = newPassword
    const rules = {
      password: 'required|string|min:6'
    }
    const validation = await validate(password, rules)
    if (validation.fails()) {
      return validation.messages()
    }
    user.password = newPassword
    await user.save();
    await auth.generate(user)

  }
}

module.exports = UserController
