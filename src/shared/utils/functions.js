import moment from 'moment';

// todo: write tests

function momentErrorWrapper(date, func) {
    if (date instanceof moment) {
        return func(date);
    } else {
        throw new Error(`Expected a date of type Moment but got type ${date.constructor.name}`)
    }
}

export function momentToDateString(date) {
    return momentErrorWrapper(
      date,
      (d) => d.format('YYYY-MM-DD')
    );
}

export function momentToDayString(date) {
    return momentErrorWrapper(
      date,
      (d) => d.format('ddd')
    );
}

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
