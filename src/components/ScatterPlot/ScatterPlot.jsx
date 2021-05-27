import React, { memo } from 'react';
import Asteroid from '../Asteroid/Asteroid';

import './ScatterPlot.scss';

const ScatterPlot = ({ asteroids }) => (
    <div className="scatter-plot">

        <Asteroid />

        <div className="scatter-plot__axes">

        </div>
    </div>
) 

// todo: proptypes

export default memo(ScatterPlot);