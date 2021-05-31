import React, { memo, useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import DayButton from '../../components/DayButton/DayButton';
import SideChart from '../../components/SideChart/SideChart';
import ScatterPlot from '../../components/ScatterPlot/ScatterPlot';
import ScatterPlotLegend from '../../components/ScatterPlotLegend/ScatterPlotLegend';
import getAsteroids from '../../shared/API/getAsteroids';
import { getWeekStartEndStringForDate, momentToDateString } from '../../shared/utils/functions';

import './Dashboard.scss';

const Dashboard = () => {
  // Define the viewbox width and -height of the scatterplot, and the screen size for which the plot's dimensions in actual
  // pixel values correspond to the viewbox values.
  const plotViewboxWidth = 750;
  const plotViewboxHeight = 375;
  const baseScreenWidth = 1062;
  const asteroidRadius = 49;

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

  useEffect(() => window.addEventListener('resize', () => {
    setPlotWindowRatio(window.innerWidth / baseScreenWidth);
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

  // todo: split day stuff to other component
  return (
      <div className="dashboard">
        <div className="dashboard__main-content">
          <h1 className="dashboard__main-content__title">
              Asteroids of the day
          </h1>

          { selectedAsteroids.length > 0 && <>
            <div className="dashboard__main-content__chart-data">
              <div>
                <p>Select one day to update the chart:</p>
                {
                  weekDays.map((day) => {
                    const dateString = momentToDateString(day);
                    return (
                      <DayButton
                        key={dateString}
                        day={day}
                        selected={selectedDay === dateString}
                        onClick={selectDay}
                      />
                    )
                  })
                }
              </div>
              <ScatterPlotLegend
                scaleMin={plotWindowRatio * 0.1} scaleMax={plotWindowRatio} radius={asteroidRadius} />
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
