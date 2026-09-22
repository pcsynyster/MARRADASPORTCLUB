document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializa ícones Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Menu Mobile Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 3. Seletor Interativo de Modalidade Esportiva
  const sportButtons = document.querySelectorAll('.sport-btn');
  const hiddenSportInput = document.getElementById('selected_sport');

  sportButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sportButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const sportName = btn.getAttribute('data-sport');
      if (hiddenSportInput) {
        hiddenSportInput.value = sportName;
      }
    });
  });

  // 4. Integração do Formulário de Agendamento com o WhatsApp
  const bookingForm = document.getElementById('booking-form');

  if (bookingForm) {
    // Configura a data mínima como o dia de hoje
    const dateInput = document.getElementById('booking_date');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      dateInput.value = today;
    }

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const modalidade = document.getElementById('selected_sport').value;
      const nome = document.getElementById('user_name').value.trim();
      const telefone = document.getElementById('user_phone').value.trim();
      const data = document.getElementById('booking_date').value;
      const turno = document.getElementById('booking_shift').value;
      const observacoes = document.getElementById('booking_notes').value.trim();

      // Formata a data para padrão BR (DD/MM/AAAA)
      let dataFormatada = data;
      if (data) {
        const partes = data.split('-');
        if (partes.length === 3) {
          dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;
        }
      }

      // Montagem da mensagem limpa e formatada
      let msg = "*NOVA SOLICITAÇÃO DE RESERVA - MARRADA SPORT CLUB*\n\n";
      msg += "⚽ *Modalidade:* " + modalidade + "\n";
      msg += "👤 *Nome:* " + nome + "\n";
      msg += "📱 *Telefone/Whats:* " + telefone + "\n";
      msg += "📅 *Data Desejada:* " + dataFormatada + "\n";
      msg += "⏰ *Turno:* " + turno + "\n";

      if (observacoes) {
        msg += "📝 *Obs/Time:* " + observacoes + "\n";
      }

      msg += "\n_Enviado pelo formulário do site oficial Marrada._";

      // Se preferir 100% sem risco de quebra de caractere no Windows:
      let textoPronto = encodeURIComponent(
        "*NOVA SOLICITAÇÃO DE RESERVA - MARRADA SPORT CLUB*\n\n" +
        "• *Modalidade:* " + modalidade + "\n" +
        "• *Nome:* " + nome + "\n" +
        "• *Telefone/Whats:* " + telefone + "\n" +
        "• *Data Desejada:* " + dataFormatada + "\n" +
        "• *Turno:* " + turno + "\n" +
        (observacoes ? ("• *Obs/Time:* " + observacoes + "\n") : "") +
        "\n_Enviado pelo formulário do site oficial Marrada._"
      );

      const numeroWhatsMarrada = '5584991263957';
      window.open('https://wa.me/' + numeroWhatsMarrada + '?text=' + textoPronto, '_blank');

      // Abre a conversa diretamente no WhatsApp
      window.open(urlWhatsapp, '_blank');
    });
  }

  // 5. Efeito sutil no Header ao rolar a página
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('shadow-sm');
    } else {
      header.classList.remove('shadow-sm');
    }
  });
});