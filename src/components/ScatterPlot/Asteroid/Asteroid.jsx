import React, { memo } from 'react';

import './Asteroid.scss';

const Asteroid = ({ style, scale, x, y, className }) => (
    <g className={className} style={style} transform-origin="center" transform={`translate(${x}, ${y}) scale(${scale})`}>
        <g filter="url(#filter0_d)">
            <circle cx="49" cy="49" r="44" fill="url(#paint0_radial)" fillOpacity="0.2"/>
            <circle cx="49" cy="49" r="44" stroke="#2AF598"/>
        </g>
        <g filter="url(#filter1_d)">
            <circle cx="49" cy="49" r="1" fill="#2AF598"/>
            <circle cx="49" cy="49" r="1" stroke="#2AF598"/>
        </g>
        <defs>
            <filter id="filter0_d" x="0.5" y="0.5" width="97" height="97" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="2"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.164706 0 0 0 0 0.960784 0 0 0 0 0.596078 0 0 0 0.2 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            </filter>
            <filter id="filter1_d" x="39.5" y="39.5" width="19" height="19" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="4"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.164706 0 0 0 0 0.960784 0 0 0 0 0.596078 0 0 0 0.6 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            </filter>
            <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(49 49) rotate(90) scale(44)">
                <stop stopColor="#2AF598" stopOpacity="0"/>
                <stop offset="1" stopColor="#2AF598"/>
            </radialGradient>
        </defs>
    </g>
)

export default memo(Asteroid);
