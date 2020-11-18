/**
 * Module to interact with user google calendar
 * @module api/routes/blockout
 * @requires express
 * @exports router - express router to handle api calls to /api/router
 */
const express = require('express')
const router = express.Router()
const CalendarService = require('../../services/CalendarService')

router.get('/events', async (request, response) => {
    try {
        const accessToken = request.session.access_token
        const calendarServiceInstance = new CalendarService(accessToken)
        const events = calendarServiceInstance.getEvents()

        response.json(events)
    } catch (error) {
        response.status(400).send(error)
    }
})

module.exports = router
