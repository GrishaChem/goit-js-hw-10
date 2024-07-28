// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('[data-start]');
startButton.addEventListener('click', startTimer);

const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
const dateTimePicker = document.getElementById('datetime-picker');

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
    } else {
      startButton.disabled = false; // Enable the start button when a valid date is selected
    }
  },
};
flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function startTimer() {
  startButton.disabled = true; // Disable the start button when the timer starts
  dateTimePicker.disabled = true; // Disable the datetime picker when the timer starts

  if (timerInterval) {
    clearInterval(timerInterval);
  }

  timerInterval = setInterval(() => {
    if (timeDiff <= 0) {
      clearInterval(timerInterval); // Stop the timer when timeDiff is 0 or less
      daysElement.textContent = '00';
      hoursElement.textContent = '00';
      minutesElement.textContent = '00';
      secondsElement.textContent = '00';
      dateTimePicker.disabled = false; // Enable the datetime picker when the timer stops
      return;
    }
    daysElement.textContent = addLeadingZero(
      Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    );
    hoursElement.textContent = addLeadingZero(
      Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    minutesElement.textContent = addLeadingZero(
      Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
    );
    secondsElement.textContent = addLeadingZero(
      Math.floor((timeDiff % (1000 * 60)) / 1000)
    );
    timeDiff -= 1000;
  }, 1000);
}
