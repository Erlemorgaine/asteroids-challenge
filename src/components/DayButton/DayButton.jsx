import React, { memo } from 'react';

import './DayButton.scss';

const DayButton = ({ day, selected }) => (
    <button className={`day-button ${ selected ? 'selected' : ''}`}>
        { day }
    </button>
) 

// todo: proptypes

export default memo(DayButton);