'use strict'

const Database = use('Database')
const qs = use('querystring')
const Helpers = use('Helpers')

class AdminController {
    async getDataByName({ request, response }) {
        let { fields, filter, dataBaseName } = request.all()
        fields = qs.parse(fields)
        const data = Database.table(dataBaseName)

        let result
        switch (filter) {
            case "Admins":
                fields = { ...fields, success: 2 }
                result = await data.where(fields)
                break;
            case "Banlist":
                fields = { ...fields, success: 0 }
                result = await data.where(fields)
                break;
            case "All users":
                result = await data.where(fields)
                break;
            case "approved":
                fields = { ...fields, status: 1 }
                result = await data.where(fields)
                break;
            case "not approved":
                fields = { ...fields, status: 0 }
                result = await data.where(fields)
                break;
            case "All task":
                result = await data.where(fields)
                break;
            case "All tests":
                result = await data.where(fields)
                console.log(result);

                break;
            default:
                return response.json({
                    message: {
                        severity: 'error',
                        title: `not correct request`
                    }
                })
        }
        return response.json({ result })
    }

    async removeDataByID({ request, view, response, auth }) {
        let { id, dataBaseName } = request.all()
        if (dataBaseName === "users") {
            return response.status(500).send("Not correct DB name")
        }
        await Database.table(dataBaseName).where({ id }).delete()
            const message = {
                severity: 'warning',
                title: `${dataBaseName} with ID ${id} deleted`
            }
        return response.json({ message })
    }

}

module.exports = AdminController
