import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { AsteroidShape } from '../../../shared/utils/proptypes';

import './AsteroidTooltip.scss';

/* eslint-disable react/prop-types */
const AsteroidTooltip = ({ asteroid }) => (
  <div className="tooltip" style={{'--tooltip-x': `${asteroid.tooltipX}px`, '--tooltip-y': `${asteroid.tooltipY}px`}}>
    <dl>
      <dt>Name:</dt>
      <dd>{ asteroid.name }</dd>

      <dt>Diameter:</dt>
      <dd>{ asteroid.diameter }</dd>

      <dt>Magnitude:</dt>
      <dd>{ asteroid.magnitude }</dd>

      <dt>Distance:</dt>
      <dd>{ asteroid.distance }</dd>

      <dt>Velocity:</dt>
      <dd>{ asteroid.velocity }</dd>
    </dl>
  </div>
)
/* eslint-enable react/prop-types */

/* eslint-disable react/prop-types */
AsteroidTooltip.propTypes = {
  asteroid: PropTypes.shape({
    ...AsteroidShape,
    tooltipX: PropTypes.number.isRequired,
    tooltipY: PropTypes.number.isRequired,
  }).isRequired
}
/* eslint-enable react/prop-types */

export default memo(AsteroidTooltip);
