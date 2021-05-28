import React, { memo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { momentToDateString, momentToDayString } from '../../shared/utils/functions';

import './DayButton.scss';

const DayButton = ({ day, selected, onClick }) => (
    <button className={`day-button ${ selected ? 'selected' : ''}`} onClick={() => onClick(momentToDateString(day))}>
        { momentToDayString(day) }
    </button>
)

DayButton.propTypes = {
    day: PropTypes.instanceOf(moment).isRequired,
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
}

DayButton.defaultProptypes = {
    selected: false,
}

export default memo(DayButton);
