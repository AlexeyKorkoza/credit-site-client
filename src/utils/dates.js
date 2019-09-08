import moment from 'moment';

/**
 * @param start {Date}
 * @param end {Date}
 * @return {boolean}
 */
const compareDates = (start, end) => !!moment(end).isAfter(start, 'days');

/**
 * @param start {Date}
 * @param end {Date}
 * @return {number}
 */
const subtractDates = (start, end) => moment(end).diff(start, 'days');

export default {
    compareDates,
    subtractDates,
}
