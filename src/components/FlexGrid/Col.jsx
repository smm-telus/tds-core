import React from 'react'
import PropTypes from 'prop-types'
import { Subscriber } from 'react-broadcast'

import { Col as ReactFlexboxGridCol } from 'react-flexbox-grid'

import safeRest from '../../utils/safeRest'

const removeProps = ({
  xs,
  sm,
  md,
  lg,
  xl,
  xsOffset,
  smOffset,
  mdOffset,
  lgOffset,
  xlOffset,
  ...rest
}) => safeRest(rest)

const Col = ({ span, offset, children, ...rest }) => (
  <Subscriber channel="flex-grid">
    {gutterStyle => (
      <ReactFlexboxGridCol
        {...removeProps(rest)}
        xs={span || true}
        xsOffset={offset}
        className={gutterStyle}
      >
        {children}
      </ReactFlexboxGridCol>
    )}
  </Subscriber>
)

Col.propTypes = {
  /**
   * Span the specified number of columns.
   */
  span: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /**
   * Offset the specified number of columns.
   */
  offset: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
  /**
   * The columns of the Grid. Will typically be `FlexGrid.Col` components, but could be other components such as a
   * `Responsive` wrapper.
   */
  children: PropTypes.node.isRequired,
}

Col.defaultProps = {
  span: undefined,
  offset: undefined,
}

export default Col
