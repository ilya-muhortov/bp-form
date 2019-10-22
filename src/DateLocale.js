
var WEEKDAYS_LONG = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

var WEEKDAYS_SHORT = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

var MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

export function formatMonthTitle(d) {
  return MONTHS[d.getMonth()] + ' ' + d.getFullYear();
}

export function formatWeekdayShort(i) {
  return WEEKDAYS_SHORT[i];
}

export function formatWeekdayLong(i) {
  return WEEKDAYS_LONG[i];
}

export function getFirstDayOfWeek() {
  return 1;
}

export function getMonths() {
  return MONTHS;
}
