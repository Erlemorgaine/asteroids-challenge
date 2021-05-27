import React, { memo, useEffect, useRef } from 'react';
import DayButton from './components/DayButton/DayButton';
import MagnitudeSelectionBar from './components/MagnitudeSelectionBar/MagnitudeSelectionBar';
import ScatterPlot from './components/ScatterPlot/ScatterPlot';

import './App.scss';
import ScatterPlotLegend from './components/ScatterPlotLegend/ScatterPlotLegend';

const App = () => {
    // todo: create asteroids in one single svg element, maybe lines just with html, but maybe not a good idea
    // todo: separate file for d3 code?
    // todo: maybe just craete asteroid svg in advance and manipulate it

  const dayButtonLabels = useRef(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']);

  useEffect(() => {
    // todo: API call
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
                dayButtonLabels.current.map((day) => <DayButton key={day} day={day} />)
              }
            </div>
            <ScatterPlotLegend />
          </div>

          <ScatterPlot />
        </div>

        <MagnitudeSelectionBar />
      </div>
  )
}

export default memo(App)