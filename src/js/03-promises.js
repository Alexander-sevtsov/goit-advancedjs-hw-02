import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
// Add event handler for the form
const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = Number(event.target.elements.delay.value);
  const step = Number(event.target.elements.step.value);
  const amount = Number(event.target.elements.amount.value);

  if (delay <= 0 || step <= 0 || amount <= 0) {
    console.log('All values must be greater than zero');
    iziToast.warning({
      title: 'Warning',
      message: 'All values must be greater than zero',
    });
    return;
  }

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay + step * (i - 1))
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        iziToast.success({
          title: 'Success',
          message: `Fulfilled promise ${position} in ${delay}ms`,
        });
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        iziToast.error({
          title: 'Error',
          message: `Rejected promise ${position} in ${delay}ms`,
        });
      });
  }
  form.reset();
});
