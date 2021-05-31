import axios from './_axios';

/**
 * Helper function that takes an object with date keys and arrays of asteroids as values, as well as raw asteroid data,
 * and returns an updated object with a new entry, in which the raw asteroid data has been parsed to the correct shape.
 *
 * @param currentAsteroidsObject
 * @param date
 * @param asteroids
 * @return {[date: string]: object[]}
 */
function responseToAsteroidsByDate(currentAsteroidsObject, [date, asteroids]) {
  const newAsteroids = asteroids.map(({ id, name, absolute_magnitude_h, close_approach_data, estimated_diameter }) => ({
    id,
    name,
    magnitude: +absolute_magnitude_h,
    diameter: +(+(estimated_diameter.kilometers.estimated_diameter_max + estimated_diameter.kilometers.estimated_diameter_min) / 2)
      .toFixed(2),
    velocity: +(+close_approach_data[0].relative_velocity.kilometers_per_second).toFixed(2),
    distance: +close_approach_data[0].miss_distance.astronomical,
  }))

  return {...currentAsteroidsObject, [date]: newAsteroids }
}

function getAsteroids(startDate, endDate) {
  return axios.get('feed', { params: { 'start_date': startDate, 'end_date': endDate} })
    .then((response) => Object.entries(response.data.near_earth_objects)
      .reduce(responseToAsteroidsByDate, {})
    );
}

export default getAsteroids;
