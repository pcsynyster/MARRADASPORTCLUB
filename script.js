document.addEventListener('DOMContentLoaded', () => {
  // Inicialização dos ícones Lucide
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Controlo do Menu Móvel
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Seletor Interativo de Espaço / Modalidade
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

  // Envio Inteligente para WhatsApp de Reservas Gerais
  const bookingForm = document.getElementById('booking-form');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const modalidade = document.getElementById('selected_sport').value;
      const nome = document.getElementById('user_name').value.trim();
      const telefone = document.getElementById('user_phone').value.trim();
      const data = document.getElementById('booking_date').value;
      const turno = document.getElementById('booking_shift').value;
      const observacoes = document.getElementById('booking_notes').value.trim();

      let dataFormatada = data;
      if (data) {
        const partes = data.split('-');
        if (partes.length === 3) {
          dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;
        }
      }

      // Emojis codificados nativamente para telemóveis
      const iconReserva = String.fromCodePoint(0x1F3AF);
      const iconUser = String.fromCodePoint(0x1F464);
      const iconPhone = String.fromCodePoint(0x1F4F1);
      const iconDate = String.fromCodePoint(0x1F4C5);
      const iconClock = String.fromCodePoint(0x23F0);
      const iconNotes = String.fromCodePoint(0x1F4DD);

      let linhas = [
        "*NOVA SOLICITAÇÃO DE RESERVA - MARRADA SPORT CLUB*",
        "",
        `${iconReserva} *Espaço / Modalidade:* ${modalidade}`,
        `${iconUser} *Nome do Responsável:* ${nome}`,
        `${iconPhone} *WhatsApp:* ${telefone}`,
        `${iconDate} *Data Pretendida:* ${dataFormatada}`,
        `${iconClock} *Turno / Período:* ${turno}`
      ];

      if (observacoes) {
        linhas.push(`${iconNotes} *Observações / Convidados:* ${observacoes}`);
      }

      linhas.push("", "_Mensagem enviada através do formulário do site oficial Marrada._");

      const mensagemFinal = linhas.join("\n");
      // NÚMERO EXCLUSIVO DE RESERVAS GERAIS:
      const numeroReservasGerais = "5584994289028";

      const urlFinal = `https://api.whatsapp.com/send?phone=${numeroReservasGerais}&text=${encodeURIComponent(mensagemFinal)}`;
      window.open(urlFinal, '_blank');
    });
  }

  // LÓGICA DO MODAL PROMOCIONAL
  const promoModal = document.getElementById('promo-modal');
  const promoModalCard = document.getElementById('promo-modal-card');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const dismissModalBtn = document.getElementById('dismiss-modal-btn');
  const promoActionBtn = document.getElementById('promo-action-btn');

  function openPromoModal() {
    if (!promoModal) return;
    promoModal.classList.remove('opacity-0', 'pointer-events-none');
    promoModal.classList.add('opacity-100', 'pointer-events-auto');
    if (promoModalCard) {
      promoModalCard.classList.remove('scale-95');
      promoModalCard.classList.add('scale-100');
    }
  }

  function closePromoModal() {
    if (!promoModal) return;
    promoModal.classList.add('opacity-0', 'pointer-events-none');
    promoModal.classList.remove('opacity-100', 'pointer-events-auto');
    if (promoModalCard) {
      promoModalCard.classList.add('scale-95');
      promoModalCard.classList.remove('scale-100');
    }
    sessionStorage.setItem('marrada_promo_dismissed', 'true');
  }

  const isDismissed = sessionStorage.getItem('marrada_promo_dismissed');
  if (!isDismissed) {
    setTimeout(() => {
      openPromoModal();
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }, 1500);
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closePromoModal);
  if (dismissModalBtn) dismissModalBtn.addEventListener('click', closePromoModal);
  if (promoActionBtn) {
    promoActionBtn.addEventListener('click', () => {
      closePromoModal();
    });
  }

  if (promoModal) {
    promoModal.addEventListener('click', (e) => {
      if (e.target === promoModal) {
        closePromoModal();
      }
    });
  }
});