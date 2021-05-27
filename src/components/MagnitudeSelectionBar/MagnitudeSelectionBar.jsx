import React, { memo } from 'react';

import './MagnitudeSelectionBar.scss';


// todo: rename to SideChart
const MagnitudeSelectionBar = () => (
    <div className="side-chart">
        <h2 className="side-chart__title">Brightest of the week</h2>
        <h3 className="side-chart__sub-title">Magnitude (H)</h3>

        <div>
            <p>Filled area: magnitude</p>
            <p>Empty area: brightness</p>
        </div>
    </div>
) 

export default memo(MagnitudeSelectionBar);