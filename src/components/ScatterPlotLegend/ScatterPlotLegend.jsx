import React, { memo } from 'react';
import PropTypes from 'prop-types';

import './ScatterPlotLegend.scss';

const ScatterPlotLegend = ({ scaleMin, scaleMax }) => (
    <div className="scatter-plot-legend">
        <h3 className="scatter-plot-legend__ti">
            Diameter
        </h3>
    </div>
)

ScatterPlotLegend.propTypes = {
  scaleMin: PropTypes.number.isRequired,
  scaleMax: PropTypes.number.isRequired,
}

export default memo(ScatterPlotLegend);
