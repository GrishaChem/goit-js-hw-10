import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('[name="delay"]');
const form = document.querySelector('.form');

form.addEventListener('submit', createPromise);

function createPromise(event) {
  event.preventDefault(); // Предотвращаем перезагрузку страницы

  const delay = Number(input.value); // Преобразуем значение задержки в число
  const selectedRadio = document.querySelector('input[name="state"]:checked');

  // Проверяем, если радиокнопка не выбрана, показываем ошибку и возвращаемся
  if (!selectedRadio) {
    iziToast.error({
      title: 'Error',
      message: 'Please select a state (fulfilled/rejected).',
    });
    return;
  }

  const value = selectedRadio.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else if (value === 'rejected') {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(message => {
      iziToast.success({
        title: 'Success',
        message: message, // Выводим сообщение о выполнении промиса
      });
    })
    .catch(message => {
      iziToast.error({
        title: 'Error',
        message: message, // Выводим сообщение о отклонении промиса
      });
    });
}
