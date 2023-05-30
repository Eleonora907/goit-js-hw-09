import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datePicker = document.querySelector('#datetime-picker');
const [startButton, daysValue, hoursValue, minutesValue, secondsValue] =
  document.querySelectorAll('[data-start], [data-days], [data-hours], [data-minutes], [data-seconds]');

function formatTime(time) {
  return time.toString().padStart(2, '0');
}

function initializeDatePicker(datePicker) {
  flatpickr(datePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = new Date(selectedDates[0]);
      selectedDate.setMilliseconds(0);
      const currentDate = new Date();
      if (selectedDate < currentDate) {
        Notiflix.Notify.failure('Please choose a date in the future');
        startButton.disabled = true;
        startButton.removeAttribute('data-start-date');
      } else {
        startButton.removeAttribute('disabled');
        startButton.dataset.startDate = selectedDate.toISOString();
      }
    },
  });
}

initializeDatePicker(datePicker);

function countdown(targetDate) {
  let intervalId, days, hours, minutes, seconds;
  intervalId = setInterval(() => {
    const currentDate = new Date();
    const timeDifference = new Date(targetDate) - currentDate;
    if (timeDifference <= 0) {
      clearInterval(intervalId);
      return;
    }
    days = formatTime(Math.floor(timeDifference / (1000 * 60 * 60 * 24)));
    hours = formatTime(Math.floor((timeDifference / (1000 * 60 * 60)) % 24));
    minutes = formatTime(Math.floor((timeDifference / (1000 * 60)) % 60));
    seconds = formatTime(Math.floor((timeDifference / 1000) % 60));

    daysValue.textContent = days;
    hoursValue.textContent = hours;
    minutesValue.textContent = minutes;
    secondsValue.textContent = seconds;
  }, 1000);
}

startButton.addEventListener('click', () => {
  if (!startButton.disabled) {
    countdown(startButton.dataset.startDate);
    startButton.disabled = true;
  }
});
