'use strict'

const Task = use('App/Models/TheTask')
const Test = use('App/Models/Test')
const Database = use('Database')

class TestController {
    async saveTask({ request, response ,auth }) {
        const user = await auth.getUser()
        let { taskBody, id, type } = request.all()
        console.log(taskBody, id, type);
        
        taskBody = JSON.parse(taskBody)
        id = parseInt(id)
        let theTask
        if (Number.isInteger(id)) {
            theTask = await Task.find(id)
            if (theTask !== null) {
                console.log('point');
                
                theTask.type = type
                theTask.id = id
                theTask.body = taskBody
                await theTask.save()
                const message = {
                    severity: 'success',
                    title: `The task with ID ${theTask.id} SAVE`
                }
                return response.json({ message })
            } else {
                console.log('point2');
                
                theTask = new Task()
                theTask.type = type
                theTask.id = id
                theTask.body = taskBody
                theTask.author = user.id
                await theTask.save()
                const message = {
                    severity: 'success',
                    title: `The task CREATE with ID ${theTask.id}`
                }
                return response.json({ message })
            }
        }
        console.log('point3',taskBody );
        
        theTask = new Task()
        theTask.type = type
        theTask.body = taskBody
        theTask.author = user.id
        await theTask.save()
        const message = {
            severity: 'success',
            title: `The task CREATE with ID ${theTask.id}`
        }
        return response.json({ message, id: theTask.id })
    }
    async getTask({ request, response }) {
        let { id } = request.all()
        id = parseInt(id)
        if (id === NaN) {
            return
        }
        let task = await Task.find(id)
        if (task === null) {
            const message = {
                severity: 'error',
                title: `The task with ID ${id} not found`
            }
            return response.json({ message })
        }
        return response.json({ task })
    }
    async newTaskID({ request, response }) {
        let maxTaskID = await Database.from('the_tasks').getMax('id')
        let nextID = ++maxTaskID
        return response.json({ nextID })
    }

    async saveTest({ request, response }) {
        let { saveData } = request.all()
        saveData = JSON.parse(saveData)
        let { id, testName, complexity, status } = saveData
        id = parseInt(id)
        if (Number.isInteger(id)) {
            let theTest = await Test.find(id)
            if (theTest) {
                theTest.testName = testName
                theTest.complexity = complexity
                theTest.status = status
                await theTest.save()
                const message = {
                    severity: 'success',
                    title: `Test with ID: ${theTest.id} refresh`
                }
                return response.json({ message })
            }
        }

        let isEngaged = await Test.findBy('testName', testName)
        if (isEngaged) {
            const message = {
                severity: 'error',
                title: `testName engaged, test is ID: ${isEngaged.id}`
            }
            return response.json({ message })
        }

        let newTest = new Test()
        newTest.testName = testName
        newTest.complexity = complexity
        newTest.status = status
        await newTest.save()
        const message = {
            severity: 'success',
            title: `Create new test with ID ${newTest.id}`
        }
        return response.json({ message, testID: newTest.id })
    }

    async getTest({ request, response }) {
        const { id } = request.all()
        let theTest = await Test.find(id)
        response.json({ theTest })
    }

    async getFreeTask({ request, response }) {
        let { testID } = request.all()
        testID = parseInt(testID)
        const _freeTask = await Task.query().where('test_id', null).fetch()
        const _selfTask = await Task.query().where('test_id', testID).fetch()
        return response.json({ _freeTask, _selfTask })
    }
    async attachTask({ request, response }) {
        let { testID,taskID } = request.all()
        let test = await Test.find(testID)
        let task = await Task.find(taskID)
        await test.tasks().save(task)
    }

    async dettachTask({ request, response }) {
        let { taskID } = request.all()
        let task = await Task.find(taskID)
        task.test_id = null
        await task.save()
    }

    async getLast({ request, view, response, auth }){
        const maxID = await Test.query().where('status','complete').getMax('id')
        console.log(maxID);
        
        const test = await Test.find(maxID)
        response.json({test})
    }
}

module.exports = TestController
