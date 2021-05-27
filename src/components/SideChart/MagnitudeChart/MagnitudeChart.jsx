import React, { memo } from 'react';

const MagnitudeChart = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="25.0416" y="1" width="34" height="34" transform="rotate(45 25.0416 1)" fill="url(#paint0_radial)" stroke="white"/>
    <rect x="25.0416" y="9.44366" width="22" height="22" transform="rotate(45 25.0416 9.44366)" fill="white"/>
    <circle cx="25.0416" cy="25.5416" r="1" fill="black"/>
    <defs>
      <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(42.0416 18) rotate(90) scale(17)">
        <stop stopColor="white" stopOpacity="0.01"/>
        <stop offset="0.483583" stopColor="white" stopOpacity="0.03"/>
        <stop offset="1" stopColor="white" stopOpacity="0.0492515"/>
      </radialGradient>
    </defs>
  </svg>
)

export default memo(MagnitudeChart);
