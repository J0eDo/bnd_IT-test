'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.get('/registration', 'UserController.registration')
    Route.get('/login', "UserController.login")
}).middleware('guest')

Route.group(() => {
    Route.get('/accountInfo', 'UserController.getUser')
}).middleware(['auth', 'banlist'])

Route.group(() => {
    Route.get('/test', 'UserController.test')
    Route.get('/getUsers', 'AdminController.getUsers')
    Route.get('/getTests', 'AdminController.getTests')
    Route.get('/getAnswers', 'AdminController.getAnswers')
}).middleware(['auth', 'admin'])





