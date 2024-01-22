export default function formatRelativeDate(inputDate) {
  const currentDate = new Date();
  const targetDate = new Date(inputDate);

  const diffInSeconds = Math.floor((currentDate - targetDate) / 1000);

  const rtf = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' });

  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'second');
  } else if (diffInSeconds < 3600) {
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    return rtf.format(-diffInMinutes, 'minute');
  } else if (diffInSeconds < 86400) {
    const diffInHours = Math.floor(diffInSeconds / 3600);
    return rtf.format(-diffInHours, 'hour');
  } else if (diffInSeconds < 604800) {
    const diffInDays = Math.floor(diffInSeconds / 86400);
    return rtf.format(-diffInDays, 'day');
  } else if (diffInSeconds < 2629746) {
    const diffInWeeks = Math.floor(diffInSeconds / 604800);
    return rtf.format(-diffInWeeks, 'week');
  } else if (diffInSeconds < 31556952) {
    const diffInMonths = Math.floor(diffInSeconds / 2629746);
    return rtf.format(-diffInMonths, 'month');
  } else {
    const diffInYears = Math.floor(diffInSeconds / 31556952);
    return rtf.format(-diffInYears, 'year');
  }
}