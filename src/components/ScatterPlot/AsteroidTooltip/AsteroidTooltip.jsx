import React, { memo } from 'react';

import './AsteroidTooltip.scss';

const AsteroidTooltip = () => (
    // todo: maybe one object with key value pairs for dd dt
    <div className="tooltip">
        <dl>
            <dd>Name</dd>
            <dt></dt>
        </dl>
        <dl>
            <dd>Diameter</dd>
            <dt></dt>
        </dl>
        <dl>
            <dd>Magnitude</dd>
            <dt></dt>
        </dl>
        <dl>
            <dd>Distance</dd>
            <dt></dt>
        </dl>
        <dl>
            <dd>Velocity</dd>
            <dt></dt>
        </dl>
    </div>
) 

export default memo(AsteroidTooltip);