import React, { memo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { momentToDateString } from '../../shared/utils/functions';
import DayButton from '../DayButton/DayButton';

import './ScatterPlotDaySelection.scss';

const ScatterPlotDaySelection = ({ weekDays, selectedDay, onDaySelection }) => (
  <div className="scatter-plot-day-selection">
    <p className="scatter-plot-day-selection__info">Select one day to update the chart:</p>
    {
      weekDays.map((day) => {
        const dateString = momentToDateString(day);
        return (
          <DayButton
            key={dateString}
            day={day}
            selected={selectedDay === dateString}
            onClick={onDaySelection}
          />
        )
      })
    }
  </div>
)

ScatterPlotDaySelection.propTypes = {
  weekDays: PropTypes.arrayOf(PropTypes.instanceOf(moment)).isRequired,
  selectedDay: PropTypes.string.isRequired,
  onDaySelection: PropTypes.func.isRequired,
}

export default memo(ScatterPlotDaySelection);
