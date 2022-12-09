import strings from './strings';

const mintesToTimeString = (minutes: number) => {
  const [hours, fraction] = (minutes / 60).toFixed(2).split('.');
  const mins = parseInt(fraction, 10) * 0.6; // converts a fractional hour to number of minutes. e.g. 25 to 15
  return `${hours || '00'}:${mins || '00'}`;
};

interface TimespanDescription {
  description: string;
  difference: number;
}

/**
 * Renders a timespan as a simplied description with difference in milliseconds
 * E.g. 35000ms difference = "35 seconds"
 *
 * @param start Date
 * @param end Date
 * @return TimespanDescription
 */
const timespanDescription = (start: Date, end: Date): TimespanDescription => {
  const difference = end.getTime() - start.getTime();

  // Get flat absolute difference for length calculations even in the past
  const differenceAbs = Math.abs(difference);

  let description;

  if (differenceAbs < 60000) {
    // Seconds
    const unit = Math.floor(differenceAbs / 1000);
    description = `${unit} ${strings.formatPlural('second', unit)}`;
  } else if (differenceAbs < 3600000) {
    // Minutes
    const unit = Math.floor(differenceAbs / 60000);
    description = `${unit} ${strings.formatPlural('minute', unit)}`;
  } else if (differenceAbs < 86400000) {
    // Hours
    const unit = Math.floor(differenceAbs / 3600000);
    description = `${unit} ${strings.formatPlural('hour', unit)}`;
  } else if (differenceAbs < 604800000) {
    // Days
    const unit = Math.floor(differenceAbs / 86400000);
    description = `${unit} ${strings.formatPlural('day', unit)}`;
  } else if (differenceAbs < 2630880000) {
    // Weeks
    const unit = Math.floor(differenceAbs / 604800000);
    description = `${unit} ${strings.formatPlural('week', unit)}`;
  } else if (differenceAbs < 31570560000) {
    // Months
    const unit = Math.floor(differenceAbs / 2630880000);
    description = `${unit} ${strings.formatPlural('month', unit)}`;
  } else {
    // Years
    const unit = Math.floor(differenceAbs / 31570560000);
    description = `${unit} ${strings.formatPlural('year', unit)}`;
  }

  return {
    difference,
    description,
  };
};


/**
 * Formats a timespan description from the current time with past and future tense
 * E.g. 35000ms difference = "in 35 seconds"
 *      -35000ms difference = "35 seconds ago"
 *
 * @param date Date
 * @return string
 */
const timeSince = (date: Date):string => {
  const { difference, description } = timespanDescription(date, new Date());

  // Future span
  if (difference < 0) return `in ${description}`;

  // Past span
  return `${description} ago`;
};

export default {
  mintesToTimeString,
  timeSince,
};
