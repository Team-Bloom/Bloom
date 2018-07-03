import {expect} from 'chai'
import React from 'react'
import ReactDOM from 'react-dom'
//import renderer from 'react-test-renderer'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NodeObjectTmpl from './nodeObject.tmpl.jsx'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('NodeObjectTmpl', () => {
    let nodeObjectTmpl
    beforeEach(() => {
        nodeObjectTmpl = shallow(<NodeObjectTmpl
        toggleEdit={_ => {}}
        text="text"
        handleChange={_ => {}}
        addNode={_ => {}}
        pasteNode={_ => {}}
        deleteNode={_ => {}}
        cutNode={_ => {}}
        currentCut={{}}
        isEdit={false} />)
    })
    it('renders', () => {
        expect(true).equal(true)
    })
})

it('renders NodeObject without crashing', () => {
  const div = document.createElement('div')
  shallow(<NodeObjectTmpl />, div)
  ReactDOM.unmountComponentAtNode(div)
})

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
