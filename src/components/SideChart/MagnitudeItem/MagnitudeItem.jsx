import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { AsteroidShape } from '../../../shared/utils/proptypes';
import MagnitudeChart from '../MagnitudeChart/MagnitudeChart';

import './MagnitudeItem.scss';

const MagnitudeItem = ({ className, asteroid }) => (
  <div className={`magnitude-item ${className}`}>
    <MagnitudeChart scale={asteroid.scale} id={asteroid.id} />

    <dl>
      <dt>Name: </dt>
      <dd>{ asteroid.name }</dd>

      <dt>Diameter: </dt>
      <dd>{ asteroid.diameter }</dd>

      <dt>Magnitude: </dt>
      <dd>{ asteroid.magnitude }</dd>
    </dl>
  </div>
)

MagnitudeItem.propTypes = {
  asteroid: PropTypes.shape(
    {...AsteroidShape, scale: PropTypes.number.isRequired}
  ).isRequired,
  className: PropTypes.string,
}

export default memo(MagnitudeItem);
