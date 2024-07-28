// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('[name="delay"]');
const form = document.querySelector('.form');

form.addEventListener('submit', createPromise);

// input.addEventListener('input', handleInput);

function createPromise(event) {
  event.preventDefault();
  const promise = new Promise((resolve, reject) => {
    const delay = Number(input.value);
    const selectedRadio = document.querySelector('input[name="state"]:checked');
    const value = selectedRadio.value;

    setTimeout(() => {
      if (value === 'fulfilled') {
        iziToast.success({
          title: 'Success',
          message: `✅ Fulfilled promise in ${delay}ms`,
        });
        resolve('Fulfilled');
      } else if (value === 'rejected') {
        iziToast.error({
          title: 'Error',
          message: `❌ Rejected promise in ${delay}ms`,
        });
        reject('Rejected');
      }
    }, delay);
  });
}
