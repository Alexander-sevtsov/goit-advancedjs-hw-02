// Importing flatpickr for date and time picking functionality
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Declare the countdownDate variable to store the selected date
let countdownDate = new Date();

// Configuration options for flatpickr
const options = {
  enableTime: true, // Enabling time selection
  time_24hr: true, // 24-hour time format
  defaultDate: new Date(), // Setting the default date to current date
  minuteIncrement: 1, // Minute increment step
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    // Check if selected date is in the past
    if (selectedDate < new Date()) {
      startButton.disabled = true;
      // Use iziToast for notification
      iziToast.warning({
        title: 'Warning',
        message: 'Please choose a date in the future',
      });
    } else {
      // Enable the start button if the date is in the future
      startButton.disabled = false;
      countdownDate = selectedDate;
    }
  },
};

// Initialize flatpickr on the date-time picker input
flatpickr('#datetime-picker', options);

// Selecting HTML elements for manipulation
const startButton = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const timePicker = document.querySelector('#datetime-picker');

// Event listener for the start button
startButton.addEventListener('click', startCountdown);

startButton.disabled = true;

// Function to start the countdown
function startCountdown() {
  // Disable the start button and input to prevent multiple clicks
  startButton.disabled = true;
  timePicker.disabled = true;

  // Set an interval to update the countdown every second
  const timerId = setInterval(() => {
    const currentTime = new Date();
    const timeLeft = countdownDate - currentTime;
    // Stop the timer when the countdown reaches zero
    if (timeLeft <= 0) {
      clearInterval(timerId);
      timePicker.disabled = false;
      iziToast.info({ title: 'Finished', message: 'Countdown finished!' });
      return;
    }

    // Calculate the time components and update the display
    const timeComponents = convertMs(timeLeft);
    updateTimerDisplay(timeComponents);
  }, 1000);
}

// Function to update the timer display
function updateTimerDisplay({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

// Function to convert milliseconds into days, hours, minutes, and seconds
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Function to add a leading zero to numbers less than 10
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
