import axios from './_axios';

function getAsteroids(startDate, endDate) {
  return axios.get('feed', { params: { 'start_date': startDate, 'end_date': endDate} })
    .then((response) => Object.entries(response.data.near_earth_objects)
      .reduce((prevVal, [date, asteroids]) => {
        // todo: in a different function
        const newAsteroids = asteroids.map(({ id, name, absolute_magnitude_h, close_approach_data, estimated_diameter }) => ({
          id,
          name,
          magnitude: +absolute_magnitude_h,
          diameter: +(estimated_diameter.kilometers.estimated_diameter_max + estimated_diameter.kilometers.estimated_diameter_min) / 2,
          velocity: +close_approach_data[0].relative_velocity.kilometers_per_hour,
          distance: +close_approach_data[0].miss_distance.kilometers,
        }))

        return {...prevVal, [date]: newAsteroids }
      }, {})
    );
}

export default getAsteroids;
