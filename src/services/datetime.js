const months = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря"
];

export function fmtTime(timeString) {
  let date = new Date(timeString);
  let now = new Date();
  let time = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  if (now.getDate() === date.getDate() && now.getMonth() === date.getMonth()) {
    return time;
  } else {
    return `${String(date.getDate())} ${months[date.getMonth()]} ${time}`;
  }

}


export function fmtDate(timeString) {
  let date = new Date(timeString);
  let now = new Date();
  let time = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  if (now.getDate() === date.getDate() && now.getMonth() === date.getMonth()) {
    return `Сегодня в ${time}`;
  } else if (now.getFullYear() === date.getFullYear()) {
    return `${String(date.getDate())} ${months[date.getMonth()]} в ${time}`;
  } else {
    return `${String(date.getDate())} ${months[date.getMonth()]} ${date.getFullYear()} в ${time}`;
  }
}