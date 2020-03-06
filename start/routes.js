'use strict'


/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => { 
    Route.get('/getLastTest', "TestController.getLast")
    Route.get('/img','FileController.getImg')

})

Route.group(() => {
    Route.get('/registration', 'UserController.registration')
    Route.get('/login', "UserController.login")
}).middleware('guest')

Route.group(() => {
    Route.get('/reworkToken', 'UserController.reworkToken')
    Route.get('/accountInfo', 'UserController.getUser')
    Route.get('/profile', 'UserController.profile')
    Route.get('/task', 'TestController.getTask')
    Route.get('/saveTask', 'TestController.saveTask')
    Route.get('/getTestList', 'PassingTestController.testsBtns')
    Route.get('/newTask', 'TestController.newTaskID')
    Route.get('/getTheTest', 'PassingTestController.getTest')
    Route.post('/uploadImg', 'FileController.uploadPicture')

}).middleware(['auth', 'banlist'])

Route.group(() => {
    Route.get('/test', 'UserController.test')
    Route.get('/getDataByName', 'AdminController.getDataByName')
    Route.get('/userSuccess', 'UserController.changeSuccess')
    Route.get('/removeDataByID', 'AdminController.removeDataByID')
    Route.get('/userRemove', 'UserController.removeByID')
    Route.post('/uploadPic', 'AdminController.uploadPicture')
    Route.get('/saveTest', 'TestController.saveTest')
    Route.get('/getTest', 'TestController.getTest')
    Route.get('/freeTasks', 'TestController.getFreeTask')
    Route.get('/attachTask', 'TestController.attachTask')
    Route.get('/dettachTask', 'TestController.dettachTask')
}).middleware(['auth', 'admin'])


 