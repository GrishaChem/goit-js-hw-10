// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const start = document.querySelector('[data-start]');
start.addEventListener('click', startTimer);

const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let timerInterval;
let timeDiff;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  dateFormat: 'Y-m-d H:i',
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const selectedDateTime = selectedDates[0];
    let unixTime = selectedDateTime.getTime();
    timeDiff = unixTime - Date.now();
    console.log(timeDiff);
    if (timeDiff < 0) {
      iziToast.error({
        title: 'Error',
        message: 'Selected date is in the past!',
      });
    }
  },
};
flatpickr('#datetime-picker', options);

function startTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  timerInterval = setInterval(() => {
    if (timeDiff <= 0) {
      daysElement.textContent = '00';
      hoursElement.textContent = '00';
      minutesElement.textContent = '00';
      secondsElement.textContent = '00';
      return;
    }
    daysElement.textContent = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    hoursElement.textContent = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    minutesElement.textContent = Math.floor(
      (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
    );
    secondsElement.textContent = Math.floor((timeDiff % (1000 * 60)) / 1000);
    timeDiff = timeDiff - 1000;
  }, 1000);
}
