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
 * Gets user events
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
    ToDoService.findAllItems().then((todos) => response.json(todos))
})

/**
 * Posts a new user todo
 */
router.post('/todo', (request, response) => {
    // receives deadline in YYYY-MM-DDTHH:MM:SS format
    const todo = {
        name: request.body.name,
        duration: request.body.duration,
        deadline: new Date(request.body.deadline + 'z')
    }
    if (request.body.minDuration) todo.minDuration = request.body.minDuration
    if (request.body.maxDuration) todo.maxDuration = request.body.maxDuration

    ToDoService.postItem(todo)
        .then((result) => response.json(result))
        .catch((error) => response.send(error))
})

module.exports = router
