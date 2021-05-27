import React, { memo, useCallback, useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import Asteroid from './Asteroid/Asteroid';

import './ScatterPlot.scss';

const ScatterPlot = ({ asteroids }) => {
  // todo: adjust view height to viewport with useRef
  const width = useRef(500);
  const height = useRef(250);
  const [leavingAsteroids, setLeavingAsteroids] = useState([]);
  const [incomingAsteroids, setIncomingAsteroids] = useState([]);
  const [leaving, setLeaving] = useState(false);

  const diameterScale = useCallback((astr) => d3.scaleLinear()
    .domain(d3.extent(astr, a => a.diameter))
    .range([0.1, 1]),
  []);

  const velocityScale = useCallback((astr) => d3.scaleLinear()
    .domain(d3.extent(astr, a => a.velocity))
    .range([0, width.current - 100]),
  [width]);

  const distanceScale = useCallback((astr) => d3.scaleLinear()
    .domain(d3.extent(astr, a => a.distance))
    .range([0, height.current - 100]),
  [height]);

  // todo: comment
  useEffect(() => {
    const scaledAsteroids = asteroids.map((a) => ({
      ...a,
      diameter: diameterScale(asteroids)(a.diameter),
      velocity: velocityScale(asteroids)(a.velocity),
      distance: distanceScale(asteroids)(a.distance),
    }));

    if (leavingAsteroids.length === 0) {
      setLeavingAsteroids(scaledAsteroids);
      setIncomingAsteroids(scaledAsteroids);
    } else {
      setLeaving(true);
      setIncomingAsteroids(scaledAsteroids);
      setTimeout(() => {
        setLeavingAsteroids(scaledAsteroids);
        setLeaving(false);
      }, 475);
    }
  }, [asteroids]);

  return (
    <div className="scatter-plot">
      <svg viewBox={`0 0 ${width.current} ${height.current}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        { leaving && leavingAsteroids.map(({ id, diameter, velocity, distance }) => <Asteroid
          key={id}
          className="outgoing"
          scale={diameter}
          x={velocity}
          y={distance}
        />)
        }
        {
          incomingAsteroids.map(({ id, diameter, velocity, distance }) => <Asteroid
            key={id}
            className="incoming"
            scale={diameter}
            x={velocity}
            y={distance}
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
