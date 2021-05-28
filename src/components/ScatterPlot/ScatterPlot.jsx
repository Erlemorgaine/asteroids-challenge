import React, { memo, useCallback, useRef, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Asteroid from '../Asteroid/Asteroid';
import { getMinMax, scaleLinear } from '../../shared/utils/functions';
import ArrowRight from '../../assets/arrow-right.svg';
import ArrowUp from '../../assets/arrow-up.svg';
import { AsteroidPropTypes } from '../../shared/utils/proptypes';
import AsteroidTooltip from './AsteroidTooltip/AsteroidTooltip';

import './ScatterPlot.scss';

const ScatterPlot = ({ asteroids, width, height, getPlotRef }) => {
  const plotContainer = useRef(null);

  const [leavingAsteroids, setLeavingAsteroids] = useState([]);
  const [incomingAsteroids, setIncomingAsteroids] = useState([]);
  const [tooltipData, setTooltipData] = useState(null);
  const [leaving, setLeaving] = useState(false);

  const diameterScale = useCallback((astr) => scaleLinear(
    getMinMax(astr, a => a.diameter),
    [0.1, 1]
  ), []);

  const velocityScale = useCallback((astr) => scaleLinear(
    getMinMax(astr, a => a.velocity),
    [0, width - 100]
  ), [width]);

  const distanceScale = useCallback((astr) => scaleLinear(
    getMinMax(astr, a => a.distance),
    [0, height - 100]
  ), [height]);

  const asteroidXScale = useMemo(() => scaleLinear(
      [0, width],
    [0, plotContainer.current?.clientWidth],
    ), [plotContainer.current, width]);

  const asteroidYScale = useMemo(() => scaleLinear(
    [0, height],
    [0, plotContainer.current?.clientHeight],
  ), [plotContainer.current, height]);

  // todo: comment
  const onAsteroidHover = useCallback((id) => {
    if (id) {
      const hoveredAsteroid = incomingAsteroids.find((a) => a.id === id);

      console.log('x', hoveredAsteroid.x)
      console.log('y', hoveredAsteroid.y)
      console.log('tooltipX', asteroidXScale(hoveredAsteroid.x))
      console.log('tooltipY', asteroidXScale(hoveredAsteroid.y))

      setTooltipData({
        ...hoveredAsteroid,
        tooltipX: asteroidXScale(hoveredAsteroid.x),
        tooltipY: asteroidYScale(hoveredAsteroid.y)
      })
    } else {
      setTooltipData(null);
    }
  }, [asteroids, setTooltipData, incomingAsteroids, asteroidXScale, asteroidYScale])

  // todo: comment
  useEffect(() => {
    const scaledAsteroids = asteroids.map((a) => ({
      ...a,
      scale: diameterScale(asteroids)(a.diameter),
      x: velocityScale(asteroids)(a.velocity),
      y: distanceScale(asteroids)(a.distance),
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

  useEffect(() => getPlotRef(plotContainer.current?.clientWidth), [plotContainer.current?.clientWidth]);

  return <>{
    asteroids.length > 0 && (
      <div className="scatter-plot" ref={plotContainer}>
        { tooltipData && <AsteroidTooltip asteroid={tooltipData} /> }
        <svg viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          { leaving && leavingAsteroids.map(({ id, scale, x, y }) => <Asteroid
            key={id}
            id={id}
            className="outgoing"
            scale={scale}
            x={x}
            y={y}
          />)
          }
          {
            incomingAsteroids.map(({ id, scale, x, y }) => <Asteroid
              key={id}
              id={id}
              className="incoming"
              scale={scale}
              x={x}
              y={y}
              onHover={onAsteroidHover}
            />)
          }
        </svg>

        <div className="scatter-plot__axes">
          <div><ArrowUp /> Distance <span>(au)</span></div>
          <div><ArrowRight /> Velocity <span>(km/s)</span></div>
        </div>
      </div>
    )
  }</>
}

ScatterPlot.propTypes = {
  asteroids: PropTypes.arrayOf(AsteroidPropTypes).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  getPlotRef: PropTypes.func,
}

export default memo(ScatterPlot);
