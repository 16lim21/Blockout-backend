// API to handle communication between facebook messenger and Woof
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const login = require('facebook-chat-api')

login(
    {
        email: `${process.env.MESSENGER_USER}`,
        password: `${process.env.MESSENGER_PASS}`
    },
    (err, api) => {
        if (err) return console.log(err)

        api.listenMqtt((err, message) => {
            if (err) return console.log(err)

            if (message) {
                api.sendMessage(message.body, message.threadID)
            }
        })
    }
)
