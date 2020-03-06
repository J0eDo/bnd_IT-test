'use strict'

const Test = use('App/Models/Test')

class PassingTestController {
    async testsBtns({ request, view, response, auth }) {
        const tests = await Test.query().where('status', 'complete').fetch()
        response.json({ tests })
    }
    async getTest({ request, response }) {
        const { testName } = request.all()
        const test = await Test.query().where('testName',testName).with('tasks').fetch()
        response.json({ test })
    }
}

module.exports = PassingTestController
