import React, { memo } from 'react';
import PropTypes from 'prop-types';
import AsteroidSvg from '../Asteroid/AsteroidSvg';

import './ScatterPlotLegend.scss';

const ScatterPlotLegend = ({ scaleMin, scaleMax }) => (
    <div className="scatter-plot-legend" style={{'--scale-min': scaleMin, '--scale-max': scaleMax}}>
      <div>
        <h3 className="scatter-plot-legend__title">
          Diameter
        </h3>
        <div className="scatter-plot-legend__min">
          <AsteroidSvg id="min_km" label="icon showing the size of the smallest asteroid in the graph" />
          <span>Min km</span>
        </div>
      </div>
      <div className="scatter-plot-legend__max">
        <AsteroidSvg id="max_km" label="icon showing the size of the largest asteroid in the graph" />
        <span>Max km</span>
      </div>
    </div>
)

ScatterPlotLegend.propTypes = {
  scaleMin: PropTypes.number.isRequired,
  scaleMax: PropTypes.number.isRequired,
}

export default memo(ScatterPlotLegend);
