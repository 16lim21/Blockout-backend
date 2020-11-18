// Some help with react testing https://www.pluralsight.com/guides/unit-test-react-component-mocha
import React from 'react'
import { render } from 'react-dom'
import Login from '../../client/src/pages/Login'
import Home from '../../client/src/pages/Home'

describe('Renders Login Page', () => {
    it('Login page should render without crashing', () => {
        const div = document.createElement('div')
        render(<Login />, div)
    })
    it('Home page should render without crashing', () => {
        const div = document.createElement('div')
        render(<Home />, div)
    })
})
