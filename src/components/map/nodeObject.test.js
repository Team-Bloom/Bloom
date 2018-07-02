import {expect} from 'chai'
import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NodeObject from './nodeObject.jsx'

const adapter = new Adapter()
enzyme.configure({adapter})

// describe('NodeObject', () => {
//     let nodeObjectTmpl
//     beforeEach(() => {
//         nodeObjectTmpl = shallow(<NodeObject toggleEdit={_ => {}}
//         text={'text'}
//         handleChange={_ => {}}
//         addNode={_ => {}}
//         pasteNode={_ => {}}
//         deleteNode={_ => {}}
//         cutNode={_ => {}}
//         currentCut={{}}
//         isEdit={false} />)
//     })
//     it('renders', () => {
//         expect(true).equal(true)
//     })
// })

it('renders NodeObject without crashing', () => {
  const div = document.createElement('div')
  shallow(<NodeObject />, div)
  ReactDOM.unmountComponentAtNode(div)
})
