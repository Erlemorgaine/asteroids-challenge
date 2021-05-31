import React, { memo } from 'react';
import PropTypes from 'prop-types';
import AsteroidSvg from '../Asteroid/AsteroidSvg';

import './ScatterPlotLegend.scss';

const ScatterPlotLegend = ({ scaleMin, scaleMax, radius }) => {
  const asteroidDimensions = radius * 2 + 10;
  console.log(scaleMin)

  return (
    <div className="scatter-plot-legend" style={{'--scale-min': scaleMin, '--scale-max': scaleMax, '--dimensions': asteroidDimensions}}>
      <h3 className="scatter-plot-legend__title">
        Diameter
      </h3>
      <div className="scatter-plot-legend__min">
        <AsteroidSvg radius={radius} dimensions={asteroidDimensions} id="min_km" label="icon showing the size of the smallest asteroid in the graph" />
        <span>Min km</span>
      </div>
      <div className="scatter-plot-legend__max">
        <AsteroidSvg radius={radius} dimensions={asteroidDimensions} id="max_km" label="icon showing the size of the largest asteroid in the graph" />
        <span>Max km</span>
      </div>
    </div>
  )
}

ScatterPlotLegend.propTypes = {
  scaleMin: PropTypes.number.isRequired,
  scaleMax: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
}

export default memo(ScatterPlotLegend);
