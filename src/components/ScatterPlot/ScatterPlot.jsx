import React, { memo, useMemo } from 'react';
import * as d3 from 'd3';
import Asteroid from './Asteroid/Asteroid';

import './ScatterPlot.scss';

const ScatterPlot = ({ asteroids }) => {
  // todo: find nicest values, adjust view height to viewport

  const diameterScale = useMemo(() => d3.scaleLinear()
    .domain(d3.extent(asteroids, asteroid => asteroid.diameter))
    .range([0.01, 0.2]),
  [asteroids]);

  const velocityScale = useMemo(() => d3.scaleLinear()
    .domain(d3.extent(asteroids, asteroid => asteroid.velocity))
    .range([0, 100]),
  [asteroids]);

  const distanceScale = useMemo(() => d3.scaleLinear()
    .domain(d3.extent(asteroids, asteroid => asteroid.distance))
    .range([0, 50]),
  [asteroids]);

  return (
    <div className="scatter-plot">
      <svg viewBox={`0 0 100 50`} fill="none" xmlns="http://www.w3.org/2000/svg">
        {
          asteroids.map(({ id, diameter, velocity, distance }) => <Asteroid
            key={id}
            scale={diameterScale(diameter)}
            x={velocityScale(velocity)}
            y={distanceScale(distance)}
          />)
        }
      </svg>

      <div className="scatter-plot__axes">

      </div>
    </div>
  )
}

// todo: proptypes

export default memo(ScatterPlot);
