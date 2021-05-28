import PropTypes from 'prop-types';

export const AsteroidShape = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    magnitude: PropTypes.number.isRequired,
    diameter: PropTypes.number.isRequired,
    velocity: PropTypes.number.isRequired,
    distance: PropTypes.number.isRequired,
}

export const AsteroidPropTypes = PropTypes.shape(AsteroidShape);
