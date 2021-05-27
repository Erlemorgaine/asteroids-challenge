import React, { memo } from 'react';
import { momentToDateString, momentToDayString } from '../../shared/utils/functions';

import './DayButton.scss';

const DayButton = ({ day, selected, onClick }) => (
    <button className={`day-button ${ selected ? 'selected' : ''}`} onClick={() => onClick(momentToDateString(day))}>
        { momentToDayString(day) }
    </button>
) 

// todo: proptypes

export default memo(DayButton);
