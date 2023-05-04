import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');
const inputField = document.querySelector('.flatpickr-input');

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
      startButton.setAttribute('disabled', 'disabled');
      startButton.removeAttribute('data-start-date');
    } else {
      startButton.removeAttribute('disabled');
      startButton.setAttribute('data-start-date', selectedDate.toISOString());
    }
  },
});

function countdown(targetDate) {
  const intervalId = setInterval(() => {
    const currentDate = new Date();
    const timeDifference = new Date(targetDate) - currentDate;
    if (timeDifference <= 0) {
      clearInterval(intervalId);
      return;
    }
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
      .toString()
      .padStart(2, '0');
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor((timeDifference / 1000) % 60)
      .toString()
      .padStart(2, '0');

    daysValue.textContent = days;
    hoursValue.textContent = hours;
    minutesValue.textContent = minutes;
    secondsValue.textContent = seconds;
  }, 1000);
}


  startButton.addEventListener('click', () => {
    if (!startButton.hasAttribute('disabled')) {
      countdown(startButton.getAttribute('data-start-date'));
      startButton.setAttribute('disabled', 'disabled');
    }
  });
