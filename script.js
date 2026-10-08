document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  const WHATSAPP_RESERVAS = '5584994289028';
  const pad = (n) => String(n).padStart(2, '0');
  const now = new Date();
  const todayIso = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const parseIso = (iso) => {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d);
  };
  const formatBr = (iso) => iso.split('-').reverse().join('/');
  const weekdayName = (iso) => parseIso(iso).toLocaleDateString('pt-BR', { weekday: 'long' });
  const ASSINATURA = '_Mensagem enviada pelo site oficial do Marrada Sport Club._';
  const openWhatsApp = (text) => {
    const mensagem = `${text}\n\n${ASSINATURA}`;
    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_RESERVAS}&text=${encodeURIComponent(mensagem)}`, '_blank');
  };

  document.querySelectorAll('input[type="date"]').forEach((input) => {
    input.min = todayIso;
  });

  const chips = document.querySelectorAll('.chip');
  const setActive = (id) => {
    chips.forEach((chip) => {
      const on = chip.getAttribute('href') === `#${id}`;
      chip.classList.toggle('active', on);
      if (on) chip.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    });
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    chips.forEach((chip) => {
      const target = document.querySelector(chip.getAttribute('href'));
      if (target) observer.observe(target);
    });
  }

  document.querySelectorAll('[data-wa-space]').forEach((button) => {
    button.addEventListener('click', () => {
      const input = document.getElementById(button.dataset.dateSource);
      if (!input) return;
      if (!input.value) {
        input.required = true;
        input.reportValidity();
        return;
      }
      openWhatsApp(
        `Olá! Gostaria de verificar a disponibilidade do espaço: ${button.dataset.waSpace}.\n` +
        `Data escolhida no site: ${formatBr(input.value)} (${weekdayName(input.value)}).`
      );
    });
  });

  const sportButtons = document.querySelectorAll('.sport-btn');
  const hiddenInput = document.getElementById('selected_sport');

  sportButtons.forEach((button) => {
    button.addEventListener('click', () => {
      sportButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      if (hiddenInput) {
        hiddenInput.value = button.getAttribute('data-sport');
      }
    });
  });

  const dateField = document.getElementById('booking_date');
  const shiftField = document.getElementById('booking_shift');
  const fullDay = 'Diária Completa / Evento (A combinar)';
  const weekdayShifts = ['Tarde (15h às 18h)', 'Noite (18h às 00h)', fullDay];
  const weekendShifts = ['Manhã (07h às 12h)', 'Tarde (12h às 19h)', fullDay];

  const renderShifts = () => {
    if (!shiftField) return;
    const day = dateField && dateField.value ? parseIso(dateField.value).getDay() : 1;
    const options = day === 0 || day === 6 ? weekendShifts : weekdayShifts;
    const previous = shiftField.value;
    shiftField.innerHTML = '';
    options.forEach((label) => {
      const option = document.createElement('option');
      option.value = label;
      option.textContent = label;
      shiftField.appendChild(option);
    });
    if (options.includes(previous)) shiftField.value = previous;
  };

  renderShifts();
  if (dateField) dateField.addEventListener('change', renderShifts);

  const bookingForm = document.getElementById('booking-form');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const modalidade = hiddenInput.value;
      const nome = document.getElementById('user_name').value.trim();
      const telefone = document.getElementById('user_phone').value.trim();
      const data = dateField.value;
      const turno = shiftField.value;
      const observacoes = document.getElementById('booking_notes').value.trim();

      const linhas = [
        '*NOVA SOLICITAÇÃO DE RESERVA - MARRADA SPORT CLUB*',
        '',
        `*Espaço / Modalidade:* ${modalidade}`,
        `*Nome do Responsável:* ${nome}`,
        `*WhatsApp:* ${telefone}`,
        `*Data Pretendida:* ${formatBr(data)} (${weekdayName(data)})`,
        `*Turno / Período:* ${turno}`
      ];

      if (observacoes) {
        linhas.push(`*Observações / Convidados:* ${observacoes}`);
      }

      openWhatsApp(linhas.join('\n'));
    });
  }

  const eventModal = document.getElementById('event-modal');
  const eventModalCard = document.getElementById('event-modal-card');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const dismissModalBtn = document.getElementById('dismiss-modal-btn');
  const eventActionBtn = document.getElementById('event-action-btn');

  function openEventModal() {
    if (!eventModal) return;
    eventModal.classList.remove('opacity-0', 'pointer-events-none');
    eventModal.classList.add('opacity-100', 'pointer-events-auto');
    if (eventModalCard) {
      eventModalCard.classList.remove('scale-95');
      eventModalCard.classList.add('scale-100');
    }
  }

  function closeEventModal() {
    if (!eventModal) return;
    eventModal.classList.add('opacity-0', 'pointer-events-none');
    eventModal.classList.remove('opacity-100', 'pointer-events-auto');
    if (eventModalCard) {
      eventModalCard.classList.add('scale-95');
      eventModalCard.classList.remove('scale-100');
    }
    sessionStorage.setItem('marrada_event_modal_dismissed', 'true');
  }

  if (!sessionStorage.getItem('marrada_event_modal_dismissed')) {
    setTimeout(() => {
      openEventModal();
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }, 1500);
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeEventModal);
  if (dismissModalBtn) dismissModalBtn.addEventListener('click', closeEventModal);
  if (eventActionBtn) eventActionBtn.addEventListener('click', closeEventModal);

  if (eventModal) {
    eventModal.addEventListener('click', (e) => {
      if (e.target === eventModal) closeEventModal();
    });
  }
});
