import React, { memo } from 'react';
import Asteroid from './Asteroid';

const AsteroidSvg = () => (
  <svg width="94" height="94" viewBox={`0 0 94 94`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <Asteroid scale={1} x={0} y={0} withGradient={false} />
  </svg>
)

export default memo(AsteroidSvg);
