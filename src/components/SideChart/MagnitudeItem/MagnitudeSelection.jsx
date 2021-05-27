import React, { memo } from 'react';

import './MagnitudeItem.scss';

const MagnitudeItem = ({ asteroid }) => (
  // todo: maybe one object with key value pairs for dd dt
  <div className="magnitude-card">

    <dl>
      <dd>Name</dd>
      <dt>{ asteroid.name }</dt>

      <dd>Diameter</dd>
      <dt>{ asteroid.diameter }</dt>

      <dd>Magnitude</dd>
      <dt>{ asteroid.magnitude }</dt>
    </dl>
  </div>
)

export default memo(MagnitudeItem);
