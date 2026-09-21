const dateInput = document.getElementById('dateInput');
const timeInput = document.getElementById('timeInput');
const dateValue = document.getElementById('dateValue');
const timeValue = document.getElementById('timeValue');
const sadButton = document.getElementById('sadButton');
const footerNote = document.getElementById('footerNote');

function formatDate(dateString) {
  if (!dateString) return 'Выберите дату';
  const date = new Date(dateString + 'T00:00:00');
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long'
  }).format(date);
}

function formatTime(timeString) {
  if (!timeString) return 'Выберите время';
  const [hours, minutes] = timeString.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

if (dateInput && timeInput && dateValue && timeValue) {
  const updateValues = () => {
    dateValue.textContent = formatDate(dateInput.value);
    timeValue.textContent = formatTime(timeInput.value);
  };

  dateInput.addEventListener('input', updateValues);
  timeInput.addEventListener('input', updateValues);
  updateValues();
}

if (sadButton && footerNote) {
  sadButton.addEventListener('click', () => {
    footerNote.textContent = 'Просто не хочу терять шанс провести с тобой ещё один вечер...';
    footerNote.classList.add('sad');
    sadButton.textContent = 'Я передумал';

    sadButton.addEventListener('click', () => {
      footerNote.textContent = 'Куда хочешь — там и встретимся 💫';
      footerNote.classList.remove('sad');
      sadButton.textContent = 'Не хочу встречаться';
    }, { once: true });
  });
}
