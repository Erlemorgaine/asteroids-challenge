import React, { memo } from 'react';
import PropTypes from 'prop-types';
import AsteroidSvg from '../Asteroid/AsteroidSvg';

import './ScatterPlotLegend.scss';

const ScatterPlotLegend = ({ scaleMin, scaleMax }) => (
    <div className="scatter-plot-legend" style={{'--scale-min': scaleMin, '--scale-max': scaleMax}}>
        <h3 className="scatter-plot-legend__title">
            Diameter
        </h3>
        <div className="scatter-plot-legend__min"><AsteroidSvg /> <span>Min km</span></div>
        <div className="scatter-plot-legend__max"><AsteroidSvg /> <span>Max km</span></div>
    </div>
)

ScatterPlotLegend.propTypes = {
  scaleMin: PropTypes.number.isRequired,
  scaleMax: PropTypes.number.isRequired,
}

export default memo(ScatterPlotLegend);
