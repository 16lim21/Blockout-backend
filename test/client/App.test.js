// Some help with react testing https://www.pluralsight.com/guides/unit-test-react-component-mocha
import React from 'react'
import { render } from 'react-dom'
import Login from '../../client/src/Login'

describe('Renders Login Page', () => {
    it('Client Frontend should render without crashing', () => {
        const div = document.createElement('div')
        render(<Login />, div)
    })
})
