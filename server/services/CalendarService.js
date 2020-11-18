/**
 * Service that interacts with google calendar
 * @module services/CalendarService
 * @requires google-auth-library
 * @requires googleapis
 * @exports CalendarService - An Calendar Service Class
 */
const { OAuth2Client } = require('google-auth-library')
const { google } = require('googleapis')

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
        this.googleClient.setCredentials(accessToken)
    }

    /**
     * Gets a certain set of events from calendar api
     * @param {object} options - JSON object representing options to be passed to calendar api
     */
    getEvents (options) {
        const googleClient = this.googleClient
        const calendar = google.calendar({ version: 'v3', googleClient })
        // if options were not supplied/were undefined
        if (!options) {
            options = {
                calendarId: 'primary',
                timeMin: new Date().toISOString(),
                maxResults: 10,
                singleEvents: true,
                orderBy: 'startTime'
            }
        }

        calendar.events.list(options, (error, response) => {
            if (error) {
                return console.log('Encountered error:' + error)
            }

            const events = response.data.items
            return events
        })
    }
}

module.exports = CalendarService
