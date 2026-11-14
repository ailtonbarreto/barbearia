const serviceOptions = document.querySelectorAll('.service-option');
const barberCards = document.querySelectorAll('.barber-card');
const summaryService = document.getElementById('summary-service');
const summaryBarber = document.getElementById('summary-barber');
const summaryTotal = document.getElementById('summary-total');

const servicePrices = {
  'Corte de Cabelo': 50,
  'Barba': 40,
  'Corte + Barba': 80,
  'Sobrancelha': 20,
  'Corte + Barba + Sobrancelha': 100,
};

function updateSummary() {
  const activeService = document.querySelector('.service-option.selected .option-text strong')?.textContent ?? 'Corte de Cabelo';
  const activeBarber = document.querySelector('.barber-card.selected .barber-info strong')?.textContent ?? 'Lucas Ferreira';
  const value = servicePrices[activeService] ?? 50;

  summaryService.textContent = activeService;
  summaryBarber.textContent = activeBarber;
  summaryTotal.textContent = `R$ ${value.toFixed(2).replace('.', ',')}`;
}

serviceOptions.forEach((option) => {
  option.addEventListener('click', () => {
    serviceOptions.forEach((item) => item.classList.remove('selected'));
    option.classList.add('selected');
    updateSummary();
  });
});

barberCards.forEach((card) => {
  card.addEventListener('click', () => {
    barberCards.forEach((item) => item.classList.remove('selected'));
    card.classList.add('selected');
    updateSummary();
  });
});

updateSummary();
