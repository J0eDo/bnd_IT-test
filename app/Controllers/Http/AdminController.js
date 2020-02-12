'use strict'


const Users = use('App/Models/User')
const Tests = use('App/Models/Test')
const Answers = use('App/Models/Answer')
const qs = use('querystring')

class AdminController {
    async getUsers({ request, response }) {
        let { fields, filter } = request.all()
        fields = qs.parse(fields)
        let result
        switch (filter) {
            case "Admins":
                fields = {...fields,success:2}
                result = await Users.query().select('*')
                    .where(fields)
                    .with('profile')
                    .fetch()
                break;
            case "Banlist":
                fields = {...fields,success:0}
                result = await Users.query().select('*')
                    .where(fields)
                    .with('profile')
                    .fetch()
            default:
                result = await Users.query().select('*')
                    .where(fields)
                    .with('profile')
                    .fetch()
                break;
        }
        return response.json({ result })
    }
    async getTests({ request, response }) {
        let { fields, filter } = request.all()
        fields = qs.parse(fields)
        let result
        switch (filter) {
            case "finished":
                fields = {...fields, status:'finished'}
                result = await Tests.query().select('*')
                    .where(fields)
                    .fetch()
                break;
            case "not finished":
                fields = {...fields, status:'not finished'}
                result = await Tests.query().select('*')
                    .where('status', 'not finished')
                    .where(fields)
                    .fetch()
            default:
                result = await Tests.query().select('*')
                    .where(fields)
                    .fetch()
                break;
        }
        return response.json({ result })
    }
    async getAnswers({ request, response }) {
        let { fields, filter } = request.all()
        fields = qs.parse(fields)
        let result
        switch (filter) {
            case "finished":
                result = await Tests.query().select('*')
                    .where('status', 'finished')
                    .where(fields)
                    .fetch()
                break;
            case "not finished":
                result = await Tests.query().select('*')
                    .where('status', 'not finished')
                    .where(fields)
                    .fetch()
            default:
                result = await Tests.query().select('*')
                    .where(fields)
                    .fetch()
                break;
        }
        return response.json({ result })
    }

}

module.exports = AdminController
