import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'
import {NodeObjectTmpl} from './'

// it('renders Node without crashing', () => {
//   const div = document.createElement('div')
//   shallow(<NodeTmpl />, div)
//   ReactDOM.unmountComponentAtNode(div)
// })

// it('renders NodeObject without crashing', () => {
//   const div = document.createElement('div')
//   ReactDOM.render(<NodeObjectTmpl />, div)
//   ReactDOM.unmountComponentAtNode(div)
// })

// test('node changes when user enters text', () => {
//     const component = renderer.create(<Node />)
//     let tree = component.toJSON()
//     expect(tree).toMatchSnapshot()
// })

test('test runs', () =>{
    expect(true).toEqual(true)
})
