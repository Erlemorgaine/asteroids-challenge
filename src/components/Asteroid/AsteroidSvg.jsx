import React, { memo } from 'react';
import Asteroid from './Asteroid';
import PropTypes from 'prop-types';

const AsteroidSvg = ({ id, label, radius, dimensions }) => (
  <svg
    aria-labelledby={id}
    role="presentation"
    width={dimensions}
    height={dimensions}
    viewBox={`0 0 ${dimensions} ${dimensions}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title id={id} lang="en">{ label }</title>
    <Asteroid scale={1} x={0} y={0} radius={radius} isLegend={true} />
  </svg>
)

AsteroidSvg.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  radius: PropTypes.number.isRequired,
  dimensions: PropTypes.number.isRequired,
}

export default memo(AsteroidSvg);
