import React, { memo } from 'react';
import { AsteroidPropTypes } from '../../../shared/utils/proptypes';

import './AsteroidTooltip.scss';

const AsteroidTooltip = ({ asteroid }) => (
    // todo: maybe one object with key value pairs for dd dt
    <div className="tooltip">
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

AsteroidTooltip.propTypes = {
  asteroids: AsteroidPropTypes.isRequired,
}

export default memo(AsteroidTooltip);
