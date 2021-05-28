import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { AsteroidShape } from '../../../shared/utils/proptypes';

import './AsteroidTooltip.scss';

const AsteroidTooltip = ({ asteroid }) => {
  return (
    // todo: this should be svg
    <div className="tooltip" style={{'--tooltip-x': `${asteroid.tooltipX}px`, '--tooltip-y': `${asteroid.tooltipY}px`}}>
      <dl>
        <dt>Name</dt>
        <dd>{ asteroid.name }</dd>

        <dt>Diameter</dt>
        <dd>{ asteroid.diameter }</dd>

        <dt>Magnitude</dt>
        <dd>{ asteroid.magnitude }</dd>

        <dt>Distance</dt>
        <dd>{ asteroid.distance }</dd>

        <dt>Velocity</dt>
        <dd>{ asteroid.velocity }</dd>
      </dl>
    </div>
  )
}

AsteroidTooltip.propTypes = {
  asteroid: PropTypes.shape({
    ...AsteroidShape,
    tooltipX: PropTypes.number.isRequired,
    tooltipY: PropTypes.number.isRequired,
  }).isRequired
}

export default memo(AsteroidTooltip);
