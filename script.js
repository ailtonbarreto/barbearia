const serviceOptions = document.querySelectorAll('.service-option');
const timeSlots = document.querySelectorAll('.time-slot');
const summaryService = document.getElementById('summary-service');
const summaryTotal = document.getElementById('summary-total');
const summaryDate = document.getElementById('summary-date');
const summaryTime = document.getElementById('summary-time');
const calendarGrid = document.getElementById('calendar-grid');
const calendarMonth = document.getElementById('calendar-month');
const bookingSteps = document.querySelectorAll('.booking-steps .step');
const today = new Date();
const selectedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
let displayedMonth = new Date(today.getFullYear(), today.getMonth(), 1);
let hasSelectedDate = false;
let hasSelectedTime = false;

const servicePrices = {
  'Corte de Cabelo': 50,
  Barba: 40,
  'Corte + Barba': 80,
  Sobrancelha: 20,
  'Corte + Barba + Sobrancelha': 100,
};

function formatDate(date, options) {
  return new Intl.DateTimeFormat('pt-BR', options).format(date);
}

function updateSummary() {
  const activeService = document.querySelector('.service-option.selected .option-text strong').textContent;
  const activeTime = document.querySelector('.time-slot.selected').textContent;
  const value = servicePrices[activeService];

  summaryService.textContent = activeService;
  summaryTotal.textContent = `R$ ${value.toFixed(2).replace('.', ',')}`;
  summaryDate.textContent = formatDate(selectedDate, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  summaryTime.textContent = activeTime;
}

function updateActiveStep() {
  const activeStep = hasSelectedDate && hasSelectedTime ? 1 : 0;
  bookingSteps.forEach((step, index) => {
    step.classList.toggle('active', index <= activeStep);
  });
}

function renderCalendar() {
  const year = displayedMonth.getFullYear();
  const month = displayedMonth.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  calendarMonth.textContent = formatDate(displayedMonth, {
    month: 'long',
    year: 'numeric',
  });
  calendarGrid.querySelectorAll('.calendar-empty, .day').forEach((day) => day.remove());

  for (let blank = 0; blank < firstWeekday; blank += 1) {
    const emptyCell = document.createElement('span');
    emptyCell.className = 'calendar-empty';
    emptyCell.setAttribute('aria-hidden', 'true');
    calendarGrid.append(emptyCell);
  }

  for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber += 1) {
    const date = new Date(year, month, dayNumber);
    const dayButton = document.createElement('button');
    const isSelected = date.getTime() === selectedDate.getTime();

    dayButton.className = `day${isSelected ? ' selected' : ''}`;
    dayButton.type = 'button';
    dayButton.textContent = dayNumber;
    dayButton.setAttribute('aria-label', formatDate(date, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }));
    dayButton.setAttribute('aria-pressed', String(isSelected));
    dayButton.addEventListener('click', () => {
      selectedDate.setFullYear(year, month, dayNumber);
      hasSelectedDate = true;
      renderCalendar();
      updateSummary();
      updateActiveStep();
    });
    calendarGrid.append(dayButton);
  }
}

serviceOptions.forEach((option) => {
  option.addEventListener('click', () => {
    serviceOptions.forEach((item) => item.classList.remove('selected'));
    option.classList.add('selected');
    updateSummary();
  });
});

timeSlots.forEach((slot) => {
  slot.addEventListener('click', () => {
    timeSlots.forEach((item) => item.classList.remove('selected'));
    slot.classList.add('selected');
    hasSelectedTime = true;
    updateSummary();
    updateActiveStep();
  });
});

document.getElementById('previous-month').addEventListener('click', () => {
  displayedMonth = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() - 1, 1);
  renderCalendar();
});

document.getElementById('next-month').addEventListener('click', () => {
  displayedMonth = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + 1, 1);
  renderCalendar();
});

renderCalendar();
updateSummary();
