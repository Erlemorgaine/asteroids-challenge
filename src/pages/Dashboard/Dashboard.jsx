import React, { memo, useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import SideChart from '../../components/SideChart/SideChart';
import ScatterPlot from '../../components/ScatterPlot/ScatterPlot';
import ScatterPlotLegend from '../../components/ScatterPlotLegend/ScatterPlotLegend';
import getAsteroids from '../../shared/API/getAsteroids';
import { getWeekStartEndStringForDate, momentToDateString } from '../../shared/utils/functions';
import ScatterPlotDaySelection from '../../components/ScatterPlotDaySelection/ScatterPlotDaySelection';

import './Dashboard.scss';

const Dashboard = () => {
  // Define the viewbox width and -height of the scatterplot, and the base screen size for which the plot's dimensions in actual
  // pixel values correspond to the viewbox values.
  const plotViewboxWidth = 750;
  const plotViewboxHeight = 375;
  const baseScreenWidth = 1062;
  const asteroidRadius = 44;

  const [asteroids, setAsteroids] = useState({});
  const [selectedAsteroids, setSelectedAsteroids] = useState([]);
  const [brightestAsteroids, setBrightestAsteroids] = useState([]);
  const [selectedDay, setSelectedDay] = useState(momentToDateString(moment()));
  const [weekDays, setWeekDays] = useState([]);
  const [plotWindowRatio, setPlotWindowRatio] = useState(window.innerWidth / baseScreenWidth);

  const getBrightestAsteroids = useCallback((asteroidsByDate, amount = 5) =>
    Object
      .values(asteroidsByDate)
      .flat()
      .sort((prev, next) => prev.magnitude - next.magnitude)
      .slice(0, amount)
      .reverse(),
    [])

  // Updates visible asteroids and selected day
  const selectDay = useCallback((day) => {
    setSelectedDay(day);
    setSelectedAsteroids(asteroids[day]);
  }, [setSelectedDay, setSelectedAsteroids, asteroids]);

  // Sets a ratio between the size in pixels of the scatter plot, and the width of the scatter plot viewbox.
  // Takes the base width (width of screen in which viewbox values match actual pixel values) to determine this ratio.
  useEffect(() => window.addEventListener('resize', () => {
    setPlotWindowRatio(+(window.innerWidth / baseScreenWidth).toFixed(2));
  }), [])

  // On mount, gets asteroids for the past week counting from today
  // Updates asteroids and weekDays with the returned values
  useEffect(() => {
    getAsteroids(
      ...getWeekStartEndStringForDate(moment())
    ).then((asteroidsByDate) => {
      setAsteroids(asteroidsByDate);
      setWeekDays(Object.keys(asteroidsByDate).sort().map((d) => moment(d)));
      setSelectedAsteroids(asteroidsByDate[selectedDay]);
      setBrightestAsteroids(getBrightestAsteroids(asteroidsByDate));
    });
  }, []);

  return (
      <div className="dashboard">
        <div className="dashboard__main-content">
          <h1 className="dashboard__main-content__title">
              Asteroids of the day
          </h1>

          { selectedAsteroids.length > 0 && <>
            <div className="dashboard__main-content__chart-data">
              <ScatterPlotDaySelection
                weekDays={weekDays}
                selectedDay={selectedDay}
                onDaySelection={selectDay}
              />
              <ScatterPlotLegend
                scaleMin={+(plotWindowRatio * 0.1).toFixed(2)}
                scaleMax={plotWindowRatio}
                radius={asteroidRadius}
              />
            </div>

            <ScatterPlot
              asteroids={selectedAsteroids}
              width={plotViewboxWidth}
              height={plotViewboxHeight}
              plotWindowRatio={plotWindowRatio}
              asteroidRadius={asteroidRadius}
            />
          </> }
        </div>

        <SideChart asteroids={brightestAsteroids} />
      </div>
  )
}

export default memo(Dashboard)
