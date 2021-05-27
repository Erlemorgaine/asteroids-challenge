import React, { memo } from 'react';
import MagnitudeItem from './MagnitudeItem/MagnitudeItem';
import MagnitudeIcon from '../../assets/full-magnitude.svg';
import BrightnessIcon from '../../assets/full-brightness.svg';

import './SideChart.scss';

const SideChart = ({ asteroids }) => (
    <div className="side-chart">
        <h2 className="side-chart__title">Brightest of the week</h2>
        <h3 className="side-chart__sub-title">Magnitude (H)</h3>

        <div>
            <p><MagnitudeIcon /> Filled area: magnitude</p>
            <p><BrightnessIcon />Empty area: brightness</p>
        </div>

      <div>
        {
          asteroids.map((asteroid) => <MagnitudeItem key={asteroid.id} asteroid={asteroid} />)
        }
      </div>
    </div>
) 

export default memo(SideChart);
