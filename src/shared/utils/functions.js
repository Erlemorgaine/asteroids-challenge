import moment from 'moment';

/**
 * Takes two tuples containing minimum and maximum values for respectively a domain and a range.
 * Return a function that, given the domain and range, maps a value to the corresponding value
 * within the range.
 *
 * @param domainMin
 * @param domainMax
 * @param rangeMin
 * @param rangeMax
 * @return number => number
 */
export function scaleLinear([domainMin, domainMax], [rangeMin, rangeMax]) {
    const domain = domainMax - domainMin;
    const range = rangeMax - rangeMin;
    const increment = range / domain;

    return function scaleValue(val) {
        return rangeMin + ((val - domainMin) * increment);
    }
}

/**
 * Takes an array and a function, maps the array by the function,
 * and returns a tuple of the minimum and maximum value of the resulting array.
 * If array is smaller than two items, return mapped array.
 *
 * @param dataArray
 * @param getValueFunc
 * @return [number, number]
 */
export function getMinMax(dataArray, getValueFunc) {
    const mappedValue = dataArray.map(getValueFunc);

    if (mappedValue.length <= 2) return mappedValue;

    const sortedValue = mappedValue.sort((prev, next) => prev - next);

    return [sortedValue[0], sortedValue[sortedValue.length - 1]];
}

/**
 * Error wrapper for functions that take an object of type Moment and return a value.
 *
 * @param date
 * @param func
 * @return {*}
 */
function momentErrorWrapper(date, func) {
    if (date instanceof moment) {
        return func(date);
    } else {
        throw new Error(`Expected a date of type Moment but got type ${date.constructor.name}`)
    }
}

/**
 * Takes a format and returns a function that parses a moment to a string of the given format
 *
 * @param format
 * @return {function(*=): *}
 */
function momentToString(format) {
    return function(date) {
        return momentErrorWrapper(
          date,
          (d) => d.format(format)
        );
    }
}

/**
 * Parses a moment to a string of format YYYY-MM-DD
 *
 * @param date
 * @return string
 */
export const momentToDateString = momentToString('YYYY-MM-DD');

/**
 * Parses a moment to a string of format ddd
 *
 * @param date
 * @return string
 */
export const momentToDayString = momentToString('ddd');

/**
 * Takes a moment and returns an array of date strings, with today as the end date,
 * and the start date calculated as a week earlier from today.
 *
 * @param date
 * @return start and end (= given) date of current week, in format [string, string]
 */
export function getWeekStartEndStringForDate(date) {
    return momentErrorWrapper(
      date,
      (d) => [
            momentToDateString(d),
            momentToDateString(d.subtract(6, 'day'))
        ]
    );
}
