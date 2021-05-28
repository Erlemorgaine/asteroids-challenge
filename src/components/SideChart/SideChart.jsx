import React, { memo, useEffect, useState } from 'react';
import MagnitudeItem from './MagnitudeItem/MagnitudeItem';
import MagnitudeIcon from '../../assets/full-magnitude.svg';
import BrightnessIcon from '../../assets/full-brightness.svg';
import { getMinMax, scaleLinear } from '../../shared/utils/functions';

import './SideChart.scss';
import PropTypes from 'prop-types';
import { AsteroidPropTypes } from '../../shared/utils/proptypes';

const SideChart = ({ asteroids }) => {
  const [scaledAsteroids, setScaledAsteroids] = useState([]);

  useEffect(() => {
    const magnitudeScale = scaleLinear(
      getMinMax(asteroids, a => a.magnitude),
      [0, 1]
    );

    const asteroidsWithScale = asteroids.map((asteroid) => ({
      ...asteroid,
      scale: magnitudeScale(asteroid.magnitude)
    }));

    setScaledAsteroids(asteroidsWithScale);
  }, [asteroids]);

  return (
    <div className="side-chart">
      <h2 className="side-chart__title">Brightest of the week</h2>
      <h3 className="side-chart__sub-title">Magnitude (H)</h3>

      <div className="side-chart__legend">
        <p><MagnitudeIcon /> Filled area: magnitude</p>
        <p><BrightnessIcon />Empty area: brightness</p>
      </div>

      <div className="side-chart__magnitude-items">
        {
          scaledAsteroids.map((asteroid) => <MagnitudeItem
            className="side-chart__magnitude-items__item"
            key={asteroid.id}
            asteroid={asteroid}
          />)
        }
      </div>
    </div>
  )
}

SideChart.propTypes = {
  asteroids: PropTypes.arrayOf(AsteroidPropTypes).isRequired,
}

export default memo(SideChart);
