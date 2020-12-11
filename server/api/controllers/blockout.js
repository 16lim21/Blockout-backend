/**
 * Module to interact with user's google calendar (will probably split it up later)
 * @module api/routes/blockout
 * @requires express
 * @exports router - express router to handle api calls to /api/router
 */
const express = require('express')
const router = express.Router()
const CalendarService = require('../../services/CalendarService')
const ToDoService = require('../../services/ToDoService')

/**
 * Gets user's todo events (just for testing, remove in release version 0.2.0)
 */
router.get('/events', async (request, response) => {
    try {
        const accessToken = request.session.access_token
        const calendarServiceInstance = new CalendarService(accessToken)
        const events = await calendarServiceInstance.getEvents()

        response.json(events)
    } catch (error) {
        response.status(400).send(error)
    }
})

/**
 * Gets user todos
 */
router.get('/todo', (request, response) => {
    try {
        const userId = request.session.user_id
        ToDoService.findAllItems(userId).then((todos) => response.json(todos))
    } catch (error) {
        response.status(400).send(error)
    }
})

/**
 * Posts a new user todo
 */
router.post('/todo', (request, response) => {
    // receives deadline in YYYY-MM-DDTHH:MM:SS format
    console.log(request.body)
    const todo = {
        name: request.body.name,
        duration: request.body.duration,
        deadline: new Date(request.body.deadline + 'Z')
    }
    if (request.body.minDuration) todo.minDuration = request.body.minDuration
    if (request.body.maxDuration) todo.maxDuration = request.body.maxDuration

    ToDoService.postItem(todo, request.session.user_id)
        .then((result) => response.json(result))
        .catch((error) => {
            console.log(error)
            response.status(400).send({ error: error.message })
        })
})

router.delete('/todo/:id', (request, response) => {
    ToDoService.deleteItem(request.params.id, request.session.user_id)
        .then((result) => response.json(result))
        .catch((error) => response.send(error))
})

module.exports = router
