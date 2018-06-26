import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import {Node, NodeObject} from './'

it('renders Node without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Node />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders NodeObject without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<NodeObject />, div)
  ReactDOM.unmountComponentAtNode(div)
})

test('node changes when user enters text', () => {
    const component = renderer.create(<Node />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})
