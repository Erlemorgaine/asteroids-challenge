import PropTypes from 'prop-types';

export const AsteroidPropTypes = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    magnitude: PropTypes.number.isRequired,
    diameter: PropTypes.number.isRequired,
    velocity: PropTypes.number.isRequired,
    distance: PropTypes.number.isRequired,
  });
