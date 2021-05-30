import React, { memo } from 'react';
import Asteroid from './Asteroid';
import PropTypes from 'prop-types';

const AsteroidSvg = ({ id, label, radius }) => (
  <svg aria-labelledby={id} role="presentation" width={radius * 2} height={radius * 2} viewBox={`0 0 98 98`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <title id={id} lang="en">{ label }</title>
    <Asteroid scale={1} x={0} y={0} radius={radius} withGradient={false} />
  </svg>
)

AsteroidSvg.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default memo(AsteroidSvg);
