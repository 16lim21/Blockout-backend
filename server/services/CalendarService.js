/**
 * Service to interact with google calendar API
 * @module services/CalendarService
 * @requires google-auth-library
 * @requires googleapis
 * @exports CalendarService - An Calendar Service Class
 */
const { OAuth2Client } = require('google-auth-library')
const { google } = require('googleapis')
const moment = require('moment')

class CalendarService {
    /**
     * Constructor for CalendarService class
     * @constructor
     * @param {OAuth2Client} googleClient - Google OAuth2Client object
     * @param {string} accessToken - Access Token for google OAuth2
     */
    constructor (
        accessToken,
        googleClient = new OAuth2Client(process.env.CLIENT_ID)
    ) {
        this.googleClient = googleClient
        this.googleClient.setCredentials({ access_token: accessToken })
        this.calendar = google.calendar({
            version: 'v3',
            auth: this.googleClient
        })
    }

    /**
     * Gets a certain set of events from calendar api
     * @param {Object} metadata - Object representing metadata to be passed to calendar api
     */
    async getEvents (metadata) {
        // if metadata was not supplied/is undefined
        if (!metadata) {
            metadata = {
                calendarId: 'primary',
                timeMin: new Date().toISOString(),
                maxResults: 10,
                singleEvents: true,
                orderBy: 'startTime'
            }
        }

        const result = await this.calendar.events.list(metadata)
        return result.data.items
    }

    /**
     * Post a events to the calendar api
     * @param {Object} event - Object representing event data
     * @param {String} calendarId - String representing calendarId to instert into
     */
    async postEvents (event, calendarId) {
        if (!calendarId) calendarId = 'primary'

        const startTime = moment
            .utc(event.deadline)
            .subtract(event.duration, 'h')
            .format('YYYY-MM-DD[T]hh:mm:ss[Z]')

        const eventData = {
            summary: event.name,
            start: {
                dateTime: startTime
            },
            end: {
                dateTime: event.deadline
            }
        }

        const result = await this.calendar.events.insert({
            calendarId: calendarId,
            resource: eventData
        })
        return result.data.id
    }
}

module.exports = CalendarService
