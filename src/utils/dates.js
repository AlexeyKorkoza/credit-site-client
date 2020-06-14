import isAfter from 'date-fns/isAfter';
import differenceInDays from 'date-fns/differenceInDays';

/**
 * @param start {Date}
 * @param end {Date}
 * @return {boolean}
 */
const compareDates = (start, end) => isAfter(end, start);

/**
 * @param start {Date}
 * @param end {Date}
 * @return {number}
 */
const subtractDates = (start, end) => differenceInDays(end, start);

export default {
  compareDates,
  subtractDates,
};
