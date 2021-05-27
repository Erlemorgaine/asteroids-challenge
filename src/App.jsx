import React, { memo, useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import DayButton from './components/DayButton/DayButton';
import SideChart from './components/SideChart/SideChart';
import ScatterPlot from './components/ScatterPlot/ScatterPlot';
import ScatterPlotLegend from './components/ScatterPlotLegend/ScatterPlotLegend';
import getAsteroids from './shared/API/getAsteroids';
import { getWeekStartEndStringForDate, momentToDateString } from './shared/utils/functions';

import './App.scss';

const App = () => {
    // todo: create asteroids in one single svg element, maybe lines just with html, but maybe not a good idea
    // todo: separate file for d3 code?

  const [asteroids, setAsteroids] = useState({});
  const [selectedAsteroids, setSelectedAsteroids] = useState([]);
  const [brightestAsteroids, setBrightestAsteroids] = useState([]);
  const [selectedDay, setSelectedDay] = useState(momentToDateString(moment()));
  const [weekDays, setWeekDays] = useState([]);

  const getBrightestAsteroids = useCallback((asteroidsByDate, amount = 5) =>
    Object
      .values(asteroidsByDate)
      .flat()
      .sort((prev, next) => prev > next)
      .slice(0, amount),
    [])

  // Updates visible asteroids and selected day
  const selectDay = useCallback((day) => {
    setSelectedDay(day);
    setSelectedAsteroids(asteroids[day]);
  }, [setSelectedDay, setSelectedAsteroids, asteroids]);

  // On mount, gets asteroids for the past week counting from today
  // Updates asteroids and weekDays with the returned values
  useEffect(() => {
    getAsteroids(
      ...getWeekStartEndStringForDate(moment())
    ).then((asteroidsByDate) => {
      setAsteroids(asteroidsByDate);
      setWeekDays(Object.keys(asteroidsByDate).map((d) => moment(d)));
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
            <ScatterPlotLegend />
          </div>

          <ScatterPlot asteroids={selectedAsteroids} />
        </div>

        <SideChart asteroids={brightestAsteroids} />
      </div>
  )
}

export default memo(App)
