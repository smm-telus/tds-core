import React from 'react'
import { shallow } from 'enzyme'
import Row from '../Row'

describe('<Row />', () => {
  it('correctly merges className', () => {
    const row = shallow(<Row className="red"><div>Test</div></Row>)

    expect(row.hasClass('grid-row')).toEqual(true)
    expect(row.hasClass('red')).toEqual(true)
  })

  it('correctly passes attributes to DOM node', () => {
    const row = shallow(<Row id="hello" title="my title"><div>Test</div></Row>)

    expect(row.prop('id')).toEqual('hello')
    expect(row.prop('title')).toEqual('my title')
  })

  it('correctly renders children', () => {
    const div = <div id="hello"><div>Test</div></div>
    const row = shallow(
      <Row>
        { div }
      </Row>
    )

    expect(row.contains(div)).toEqual(true)
  })
})