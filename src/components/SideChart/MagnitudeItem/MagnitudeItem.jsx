import React, { memo } from 'react';
import MagnitudeChart from '../MagnitudeChart/MagnitudeChart';

import './MagnitudeItem.scss';

const MagnitudeItem = ({ className, asteroid }) => (
  <div className={`magnitude-item ${className}`}>
    <MagnitudeChart scale={asteroid.scale} />

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

export default memo(MagnitudeItem);
