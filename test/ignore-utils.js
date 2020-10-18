// Ignoring importing these files during mocha tests
// Help from here: https://stackoverflow.com/questions/37259523/require-import-svg-during-mocha-tests
import requireHacker from 'require-hacker'

const extensions = ['svg', 'css', 'png', 'ico', 'txt']

extensions.forEach((extension) => {
    requireHacker.hook(extension, (path) => '')
})
