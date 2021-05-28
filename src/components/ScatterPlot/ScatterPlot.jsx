import React, { memo, useCallback, useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Asteroid from './Asteroid/Asteroid';
import { getMinMax, scaleLinear } from '../../shared/utils/functions';
import ArrowRight from '../../assets/arrow-right.svg';
import ArrowUp from '../../assets/arrow-up.svg';
import { AsteroidPropTypes } from '../../shared/utils/proptypes';

import './ScatterPlot.scss';

const ScatterPlot = ({ asteroids }) => {
  // todo: adjust view height to viewport with useRef
  const width = useRef(500);
  const height = useRef(250);
  const [leavingAsteroids, setLeavingAsteroids] = useState([]);
  const [incomingAsteroids, setIncomingAsteroids] = useState([]);
  const [leaving, setLeaving] = useState(false);

  const diameterScale = useCallback((astr) => scaleLinear(
    getMinMax(astr, a => a.diameter),
    [0.1, 1]
  ), []);

  const velocityScale = useCallback((astr) => scaleLinear(
    getMinMax(astr, a => a.velocity),
    [0, width.current - 100]
  ), [width]);

  const distanceScale = useCallback((astr) => scaleLinear(
    getMinMax(astr, a => a.distance),
    [0, height.current - 100]
  ), [height]);

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

  return <>{
    asteroids.length > 0 && (<div className="scatter-plot">
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
        <div><ArrowUp /> Distance <span>(au)</span></div>
        <div><ArrowRight /> Velocity <span>(km/s)</span></div>
      </div>
    </div>)
  }</>
}

ScatterPlot.propTypes = {
  asteroids: PropTypes.arrayOf(AsteroidPropTypes).isRequired,
}

export default memo(ScatterPlot);
