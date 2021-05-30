import React, { memo, useCallback, useRef, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Asteroid from '../Asteroid/Asteroid';
import { getMinMax, scaleLinear } from '../../shared/utils/functions';
import ArrowRight from '../../assets/icons/arrow-right.svg';
import ArrowUp from '../../assets/icons/arrow-up.svg';
import { AsteroidPropTypes } from '../../shared/utils/proptypes';
import AsteroidTooltip from './AsteroidTooltip/AsteroidTooltip';

import './ScatterPlot.scss';

const ScatterPlot = ({ asteroids, width, height, baseWidth, asteroidRadius, getPlotRef }) => {
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
      [0, width - 100],
    [0, plotContainer.current?.clientWidth - ((window.innerWidth / baseWidth) * 100)],
    ), [plotContainer.current, width, baseWidth]);

  const asteroidYScale = useMemo(() => scaleLinear(
      [0, height - 100],
      [0, plotContainer.current?.clientHeight - ((window.innerWidth / baseWidth) * 100)],
    ), [plotContainer.current, height, baseWidth]);

  // todo: comment
  const onAsteroidHover = useCallback((id) => {
    if (id) {
      const hoveredAsteroid = incomingAsteroids.find((a) => a.id === id);
      const offsetToCenter = (window.innerWidth / baseWidth) * asteroidRadius * hoveredAsteroid.scale;

      setTooltipData({
        ...hoveredAsteroid,
        tooltipX: asteroidXScale(hoveredAsteroid.x) + offsetToCenter,
        tooltipY: asteroidYScale(hoveredAsteroid.y) + offsetToCenter
      })
    } else {
      setTooltipData(null);
    }
  }, [asteroids, setTooltipData, incomingAsteroids, asteroidXScale, asteroidYScale, baseWidth])

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

  return (
      <div className="scatter-plot" ref={plotContainer}>
        { tooltipData && <AsteroidTooltip asteroid={tooltipData} /> }
        <svg
          aria-labelledby="asteroid_plot"
          role="presentation"
          viewBox={`0 0 ${width} ${height}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="asteroid_plot" lang="en">
            Scatter plot showing the asteroids for the selected day, positioned by distance and velocity and scaled by magnitude
          </title>
          { leaving && leavingAsteroids.map(({ id, scale, x, y }) => <Asteroid
            key={id}
            id={id}
            className="outgoing"
            scale={scale}
            x={x}
            y={y}
            radius={asteroidRadius}
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
              radius={asteroidRadius}
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
}

ScatterPlot.propTypes = {
  asteroids: PropTypes.arrayOf(AsteroidPropTypes).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  baseWidth: PropTypes.number.isRequired,
  asteroidRadius: PropTypes.number.isRequired,
  getPlotRef: PropTypes.func,
}

export default memo(ScatterPlot);
