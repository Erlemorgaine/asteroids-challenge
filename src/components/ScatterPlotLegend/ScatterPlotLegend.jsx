import React, { memo } from 'react';

import './ScatterPlotLegend.scss';

const ScatterPlotLegend = () => (
    <div className="scatter-plot-legend">
        <h3 className="scatter-plot-legend__ti">
            Diameter
        </h3>
    </div>
) 

// todo: proptypes

export default memo(ScatterPlotLegend);