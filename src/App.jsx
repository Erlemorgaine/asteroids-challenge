import React, { memo } from 'react'

import './App.scss';

const App = () => {
    // todo: create asteroids in one single svg element, maybe lines just with html, but maybe not a good idea
    // todo: separate file for d3 code?
    // todo: maybe just craete asteroid svg in advance and manipulate it
  return (
      <div className="dashboard">
        <h1>
            Create React App Without CRA ☘️
        </h1>
      </div>
  )
}

export default memo(App)